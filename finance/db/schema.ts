
import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod"
import { z } from 'zod';

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    plaiId: text("iplaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull()
})
//to export to other files where this schema will reuire
export const insertAccountSchema = createInsertSchema(accounts)


//one accounts can have many transaction
export const accountRelations = relations(accounts, ({ many }) => ({
    transactions: many(transactions),
}));


export const categories = pgTable("categories", {
    id: text("id").primaryKey(),
    plaiId: text("iplaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull()
})
export const insertCategoriesSchema = createInsertSchema(categories)

export const categoryRelations = relations(categories, ({ many }) => ({
    transactions: many(transactions),
}));

export const transactions = pgTable("transactions", {
    id: text("id").primaryKey(),
    amount: integer("amount").notNull(),
    payee: text("payee").notNull(),
    notes: text("notes"),
    date: timestamp("date", { mode: "date" }).notNull(),
    accountId: text("account_id").references(() => accounts.id, {
        onDelete: "cascade"
    }).notNull(),
    categoryId: text("category_id").references(() => categories.id, {
        onDelete: "set null"
    })

})
export const transactionRelations = relations(transactions, ({ one }) => ({
    accounts: one(accounts, {
        fields: [transactions.accountId],
        references: [accounts.id],
    }),
    categories: one(categories, {
        fields: [transactions.categoryId],
        references: [categories.id],
    }),
}));


export const insertTransactionSchema=createInsertSchema(transactions,{
    date:z.coerce.date()
})