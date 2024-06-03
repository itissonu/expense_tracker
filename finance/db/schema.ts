import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod"

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    plaiId: text("iplaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull()
})
//to export to other files where this schema will reuire
export const insertAccountSchema = createInsertSchema(accounts)