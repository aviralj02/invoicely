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
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";

type Props = {};

const Dashboard = async (props: Props) => {
  const results = await db.select().from(Invoices);

  return (
    <div className="flex flex-col justify-center max-w-5xl h-full text-center gap-6 mx-auto my-12">
      <div className="flex justify-between">
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
          {results.map((row) => (
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
                  Aviral Jain
                </Link>
              </TableCell>

              <TableCell className="text-left p-0">
                <Link href={`/invoices/${row.id}`} className="block p-4">
                  email
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
    </div>
  );
};

export default Dashboard;
