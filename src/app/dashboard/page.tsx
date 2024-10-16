"use client";

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

type Props = {};

const Dashboard = (props: Props) => {
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
          <TableRow>
            <TableCell className="font-medium p-4 text-left">
              <span className="font-semibold">10/31/2024</span>
            </TableCell>
            <TableCell className="text-left p-4">
              <span className="font-semibold">Aviral Jain</span>
            </TableCell>
            <TableCell className="text-left p-4">
              <span className="">xyz@gmail.com</span>
            </TableCell>
            <TableCell className="text-center p-4">
              <Badge className="rounded-full">Paid</Badge>
            </TableCell>
            <TableCell className="text-right p-4">
              <span className="font-semibold">500</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
