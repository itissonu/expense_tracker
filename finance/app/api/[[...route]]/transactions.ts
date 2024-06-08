


import { db } from "@/db/drizzle";
import { insertTransactionSchema, transactions, categories, accounts } from "@/db/schema";
import { HTTPException } from "hono/http-exception";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator"
import { and, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2"
import { z } from "zod";
import { parse, subDays } from "date-fns"


const app = new Hono().get("/", zValidator("query", z.object({
    from: z.string().optional(),
    to: z.string().optional(),
    accountId: z.string().optional(),
})), clerkMiddleware(), async (c) => {
    const auth = getAuth(c)
    if (!auth?.userId) {
        return c.json({
            error: "unauth...."
        }, 401)

    }

    const { from, to, accountId } = c.req.valid("query")
    //we will show last 30 days transactions
    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30)

    const startDate = from ?
        parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;
    const endtDate = to ?
        parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

    const data = await db.select({
        id: transactions.id,
        category: categories.name,
        date: transactions.date,
        categoryId: transactions.categoryId,
        payee: transactions.payee,
        amount: transactions.amount,
        notes: transactions.notes,
        account: accounts.name,
        accountid: transactions.accountId
    })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .leftJoin(categories, eq(transactions.categoryId, categories.id))
        .where(
            and(
                accountId ? eq(transactions.id, accountId) : undefined,
                eq(accounts.userId, auth.userId),
                gte(transactions.date, startDate),
                lte(transactions.date, endtDate)
            )
        )
        .orderBy(desc(transactions.date))


    return c.json({ data: data })

}).get("/:id",
    zValidator("param",
        z.object({
            id: z.string().optional(),
        })
    ), clerkMiddleware(), async (c) => {
        const auth = getAuth(c)
        const { id } = c.req.valid("param")
        if (!id) {
            return c.json({
                error: "bad request"
            }, 400)
        }
        if (!auth?.userId) {
            return c.json({
                error: "unauth...."
            }, 401)
        }
        console.log((id))
        const [data] = await db.select({
            id: transactions.id,
            date: transactions.date,
            category: categories.name,
            categoryId: transactions.categoryId,
            payee: transactions.payee,
            amount: transactions.amount,
            notes: transactions.notes,
            account: accounts.name,
            accountid: transactions.accountId
        }).from(transactions)
            .innerJoin(accounts, eq(transactions.accountId, accounts.id))
            .where(
                and(
                    eq(accounts.userId, auth.userId),
                    eq(transactions.id, id)
                ),
            );
        if (!data) {
            return c.json({
                error: "Not found@@"
            }, 404)
        }
        return c.json({ data });

    })
    .post("/",
        clerkMiddleware(),
        zValidator("json", insertTransactionSchema.omit({ id: true })),
        async (c) => {


            const auth = getAuth(c)
            const values = c.req.valid("json")

            if (!auth?.userId) {
                return c.json({
                    error: "unauth...."
                }, 401)
            }

            const [data] = await db.insert(transactions).values({
                id: createId(),

                ...values,
            }).returning();
            console.log(data)

            return c.json({ data })

        })
    .post(
        "/bulk-delete", clerkMiddleware(),
        zValidator("json", z.object({
            ids: z.array(z.string())

        })), async (c) => {
            const auth = getAuth(c)
            const values = c.req.valid("json")

            if (!auth?.userId) {
                return c.json({
                    error: "unauth...."
                }, 401)
            }
            const transactionTodelete = db.$with("transactions_to_delete").as(
                db.select({ id: transactions.id }).from(transactions)
                    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                    .where(and(
                        inArray(transactions.id, values.ids),
                        eq(accounts.userId, auth.userId)
                    ))
            )

            const data = await db.with(transactionTodelete).delete(transactions)
                .where(
                    inArray(transactions.id, sql`(select id from ${transactionTodelete})`)
                ).returning({
                    id: transactions.id
                })
            return c.json({ data })
        }
    ).patch("/:id",
        clerkMiddleware(),
        zValidator("param", z.object({
            id: z.string().optional(),
        })),
        zValidator("json", insertTransactionSchema.omit({
            id: true
        })),
        async (c) => {
            const auth = getAuth(c)
            const { id } = c.req.valid("param")
            const values = c.req.valid("json")
            if (!id) {
                return c.json({
                    error: "bad request"
                }, 400)
            }
            if (!auth?.userId) {
                return c.json({
                    error: "unauth...."
                }, 401)
            }
            const transactionToUpdate = db.$with("transactions_to_update").as(
                db.select({ id: transactions.id }).from(transactions)
                    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                    .where(and(
                        eq(transactions.id, id),
                        eq(accounts.userId, auth.userId)
                    ))
            )

            const [data] = await db.with(transactionToUpdate).update(transactions)
                .set(values)
                .where(
                    inArray(transactions.id, sql`(select id from ${transactionToUpdate})`)
                ).returning()


            if (!data) {
                return c.json({
                    error: "Not found@@"
                }, 404)
            }

            return c.json({ data });

        }).delete("/:id",
            clerkMiddleware(),
            zValidator("param", z.object({
                id: z.string().optional(),
            })),

            async (c) => {
                const auth = getAuth(c)
                const { id } = c.req.valid("param")

                if (!id) {
                    return c.json({
                        error: "bad request"
                    }, 400)
                }
                if (!auth?.userId) {
                    return c.json({
                        error: "unauth...."
                    }, 401)
                }
                const transactionToDelete = db.$with("transactions_to_delete").as(
                    db.select({ id: transactions.id }).from(transactions)
                        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                        .where(and(
                            eq(transactions.id, id),
                            eq(accounts.userId, auth.userId)
                        ))
                )
                const [data] = await db
                .with(transactionToDelete)
                .delete(transactions)
                .where(
                    inArray(transactions.id, sql`(select id from ${transactionToDelete})`)
                ).returning({
                    id:transactions.id
                })



                if (!data) {
                    return c.json({
                        error: "Not found@@"
                    }, 404)
                }

                return c.json({ data });

            })



export default app;