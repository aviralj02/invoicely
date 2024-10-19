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
  userId: text("userId").notNull(),
  createTs: timestamp("createTs").notNull().defaultNow(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
  status: statusEnum("status").notNull(),
});
