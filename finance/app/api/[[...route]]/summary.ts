import { db } from '@/db/drizzle';
import { accounts, categories, transactions } from '@/db/schema';
import { calculatepercentage, fillMissingdays } from '@/lib/utils';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { differenceInDays, parse, subDays } from 'date-fns';
import { and, desc, eq, gte, lt, lte, sql, sum } from 'drizzle-orm';
import { Hono } from "hono";
import { z } from 'zod';

const app = new Hono()
    .get("/", clerkMiddleware(), zValidator("query", z.object({
        from: z.string().optional(),
        to: z.string().optional(),
        accountId: z.string().optional(),
    })), async (c) => {
        const auth = getAuth(c)
        const { from, to, accountId } = c.req.valid("query")
        if (!auth?.userId) {
            return c.json({
                error: "unauth...."
            }, 401)

        }
        const defaultTo = new Date();
        const defaultFrom = subDays(defaultTo, 30)

        const startDate = from ?
            parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;
        const endtDate = to ?
            parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

        const periodLength = differenceInDays(endtDate, startDate) + 1;

        const lastperiodStart = subDays(startDate, periodLength);
        const lastPeriodEnd = subDays(endtDate, periodLength);

        async function fetchFinacialData
            (userId: string,
                startDate: Date,
                endDate: Date
            ) {
            return await db.select({
                income: sql`SUM(CASE WHEN ${transactions.amount}>=0 THEN ${transactions.amount}
                        ELSE 0 END)`.mapWith(Number),
                expenses: sql`SUM(CASE WHEN ${transactions.amount}< 0 THEN ${transactions.amount}
                        ELSE 0 END)`.mapWith(Number),
                remaining: sum(transactions.amount).mapWith(Number),
            }).from(transactions)
                .innerJoin(accounts,
                    eq(
                        transactions.accountId,
                        accounts.id
                    ),
                )
                .where(
                    and(
                        accountId ? eq(transactions.accountId, accountId) : undefined,
                        eq(accounts.userId, userId),
                        gte(transactions.date, startDate),
                        lte(transactions.date, endDate)
                    )
                )
        }

        const [currentPeriod] = await fetchFinacialData(
            auth.userId,
            startDate,
            endtDate
        )
        const [lastPeriod] = await fetchFinacialData(
            auth.userId,
            lastperiodStart,
            lastPeriodEnd
        )

        const incomeChange = calculatepercentage(currentPeriod.income, lastPeriod.income)
        const expenseChange = calculatepercentage(currentPeriod.expenses, lastPeriod.expenses)
        const remainingChange = calculatepercentage(currentPeriod.remaining, lastPeriod.remaining)

        const category = await db.select({
            name: categories.name,
            value: sql`SUM(ABS(${transactions.amount}))`.mapWith(Number)

        })
            .from(transactions)
            .innerJoin(
                accounts,
                eq(
                    transactions.accountId,
                    accounts.id
                )
            )
            .innerJoin(categories,
                eq(transactions.categoryId,
                    categories.id
                )
            )
            .where(
                and(
                    accountId ? eq(transactions.accountId, accountId) : undefined,
                    eq(accounts.userId, auth.userId),
                    lt(transactions.amount, 0),
                    gte(transactions.date, startDate),
                    lte(transactions.date, endtDate)
                )
            )
            .groupBy(categories.name)
            .orderBy(desc(
                sql`SUM(ABS(${transactions.amount}))`
            ));

        const topcategories = category.slice(0, 3);
        const othercategories = category.slice(3);
        const otherSum = othercategories.reduce((sum, current) =>
            sum + current.value, 0)

        const finalcategories = topcategories;
        if (othercategories.length > 0) {
            finalcategories.push({
                name: "other",
                value: otherSum,
            })
        }

        const activeDays = await db.select({
            date: transactions.date,
            income: sql`SUM(CASE WHEN ${transactions.amount}>=0 THEN ${transactions.amount}
                        ELSE 0 END)`.mapWith(Number),
            expense: sql`SUM(CASE WHEN ${transactions.amount}< 0 THEN ${transactions.amount}
                        ELSE 0 END)`.mapWith(Number)
        })
            .from(transactions)
            .innerJoin(
                accounts,
                eq(
                    transactions.accountId,
                    accounts.id
                )
            )
            .where(
                and(
                    accountId ?
                        eq(transactions.accountId, accountId) : undefined,
                    eq(accounts.userId, auth.userId),

                    gte(transactions.date, startDate),
                    lte(transactions.date, endtDate)
                )
            )
            .groupBy(transactions.date)
            .orderBy(transactions.date)

        const days = fillMissingdays(
            activeDays, startDate, endtDate
        );

        return c.json({
            data: {
                remainingAmount: currentPeriod.remaining,
                remainingChange,
                incomeAmount: currentPeriod.income,
                expensesAmount: currentPeriod.expenses,
                expenseChange,
                categories: finalcategories,
                days

            }
        });
    })

export default app;