import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import PageWrapper from "@/components/PageWrapper";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";

type Props = {};

const Dashboard = async (props: Props) => {
  const { userId, orgId } = auth();

  if (!userId) return;

  let results;
  if (orgId) {
    results = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(eq(Invoices.organizationId, orgId));
  } else {
    results = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(and(eq(Invoices.userId, userId), isNull(Invoices.organizationId))); // condition: userId matches and null orgId
  }

  const invoices = results?.map(({ invoices, customers }) => {
    return {
      ...invoices,
      customer: customers,
    };
  });

  return (
    <div className="h-full">
      <PageWrapper>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Invoices</h1>

          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/invoices/new">
              <CirclePlus className="w-4 h-4" /> Create Invoice
            </Link>
          </Button>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] p-4">Dates</TableHead>
              <TableHead className="p-4">Customer</TableHead>
              <TableHead className="p-4">Email</TableHead>
              <TableHead className="text-center p-4">Status</TableHead>
              <TableHead className="text-right p-4">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium p-0 text-left">
                  <Link
                    href={`/invoices/${row.id}`}
                    className="block font-semibold p-4"
                  >
                    {new Date(row.createTs).toLocaleDateString()}
                  </Link>
                </TableCell>

                <TableCell className="text-left p-0">
                  <Link
                    href={`/invoices/${row.id}`}
                    className="block font-semibold p-4"
                  >
                    {row.customer.name}
                  </Link>
                </TableCell>

                <TableCell className="text-left p-0">
                  <Link href={`/invoices/${row.id}`} className="block p-4">
                    {row.customer.email}
                  </Link>
                </TableCell>

                <TableCell className="text-center p-0">
                  <Link href={`/invoices/${row.id}`} className="block p-4">
                    <Badge
                      className={cn(
                        "rounded-full select-none capitalize",
                        row.status === "open" && "bg-blue-500",
                        row.status === "paid" && "bg-green-600",
                        row.status === "void" && "bg-zinc-700",
                        row.status === "uncollectible" && "bg-red-600"
                      )}
                    >
                      {row.status}
                    </Badge>
                  </Link>
                </TableCell>

                <TableCell className="text-right p-0">
                  <Link
                    href={`/invoices/${row.id}`}
                    className="block font-semibold p-4"
                  >
                    ₹{(row.value / 100).toFixed(2)}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageWrapper>
    </div>
  );
};

export default Dashboard;
