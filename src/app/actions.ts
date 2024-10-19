"use server";
// Every function here acts as server api endpoints

import { db } from "@/db";
import { Invoices, Status } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createInvoice = async (formData: FormData) => {
  const { userId } = auth();

  const value = Math.floor(parseFloat(formData.get("value") as string) * 100); // converting float to integer
  const description = formData.get("description") as string;

  if (!userId) {
    return;
  }

  const results = await db
    .insert(Invoices)
    .values({
      userId,
      value,
      description,
      status: "open",
    })
    .returning({
      id: Invoices.id,
    });

  redirect(`/invoices/${results[0].id}`);
};

export const updateStatusAction = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const id = formData.get("id") as string;
  const status = formData.get("status") as Status;

  const results = await db
    .update(Invoices)
    .set({ status })
    .where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));

  revalidatePath(`/invoices/${id}`, "page");
};
