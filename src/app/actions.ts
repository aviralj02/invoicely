"use server";

import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { redirect } from "next/navigation";

// Every function here acts as server endpoints

export const createInvoice = async (formData: FormData) => {
  const value = Math.floor(parseFloat(formData.get("value") as string) * 100); // converting float to integer
  const description = formData.get("description") as string;

  const results = await db
    .insert(Invoices)
    .values({
      value,
      description,
      status: "open",
    })
    .returning({
      id: Invoices.id,
    });

  redirect(`/invoices/${results[0].id}`);
};
