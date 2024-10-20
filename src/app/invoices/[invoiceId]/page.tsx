import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React from "react";
import Invoice from "./Invoice";

type Props = {
  params: {
    invoiceId: string;
  };
};

const InvoicePage = async ({ params }: Props) => {
  const { userId } = auth();

  if (!userId) return;

  const invoiceId = parseInt(params.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  const [result] = await db
    .select()
    .from(Invoices)
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
    .limit(1);

  if (!result) notFound();

  return <Invoice invoice={result} />;
};

export default InvoicePage;
