import { AVAILABLE_STATUSES } from "@/lib/constants";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type Status = (typeof AVAILABLE_STATUSES)[number]["id"];

const statuses = AVAILABLE_STATUSES.map((status) => status.id) as Array<Status>;

export const statusEnum = pgEnum(
  "status",
  statuses as [Status, ...Array<Status>]
);

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTs").notNull().defaultNow(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
  status: statusEnum("status").notNull(),
  customerId: integer("customerId").references(() => Customers.id),

  userId: text("userId").notNull(),
  organizationId: text("organizationId"),
});

export const Customers = pgTable("customers", {
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTs").notNull().defaultNow(),
  name: text("name").notNull(),
  email: text("email").notNull(),

  userId: text("userId").notNull(),
  organizationId: text("organizationId"),
});
