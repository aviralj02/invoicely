"use client";

import PageWrapper from "@/components/PageWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Customers, Invoices } from "@/db/schema";
import { cn, convertDate } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { FC, useOptimistic } from "react";
import { AVAILABLE_STATUSES } from "@/lib/constants";
import { deleteInvoiceAction, updateStatusAction } from "@/app/actions";
import { ChevronDown, Ellipsis, Trash2 } from "lucide-react";

type Props = {
  invoice: typeof Invoices.$inferInsert & {
    customer: typeof Customers.$inferInsert;
  };
};

const Invoice: FC<Props> = ({ invoice }: Props) => {
  const [currentStatus, setCurrentStatus] = useOptimistic(
    invoice.status,
    (state, newStatus) => {
      return newStatus as string;
    }
  );

  const handleOnUpdateStatus = async (formData: FormData) => {
    const originalStatus = currentStatus;
    setCurrentStatus(formData.get("status"));

    try {
      await updateStatusAction(formData);
    } catch (error) {
      setCurrentStatus(originalStatus);
    }
  };

  return (
    <div className="w-full h-full">
      <PageWrapper className="flex sm:flex-row flex-col justify-between items-start gap-16">
        <div className="flex flex-col">
          <h1 className="flex items-center gap-4 sm:text-3xl text-2xl font-bold mb-8">
            Invoices {invoice.id}{" "}
            <Badge
              className={cn(
                "rounded-full select-none capitalize",
                currentStatus === "open" && "bg-blue-500",
                currentStatus === "paid" && "bg-green-600",
                currentStatus === "void" && "bg-zinc-700",
                currentStatus === "uncollectible" && "bg-red-600"
              )}
            >
              {currentStatus}
            </Badge>
          </h1>

          <p className="sm:text-3xl text-2xl mb-3">
            ₹{(invoice.value / 100).toFixed(2)}
          </p>
          <p className="sm:text-lg text-base mb-8">{invoice.description}</p>

          <h2 className="font-bold text-lg mb-4">Billing Details</h2>

          <ul className="grid gap-2">
            <li className="flex gap-4">
              <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                Invoice ID
              </strong>
              <span>{invoice.id}</span>
            </li>
            <li className="flex gap-4">
              <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                Invoice Date
              </strong>
              <span>{convertDate(new Date(invoice.createTs as Date))}</span>
            </li>
            <li className="flex gap-4">
              <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                Billing Name
              </strong>
              <span>{invoice.customer.name}</span>
            </li>
            <li className="flex gap-4">
              <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                Billing Email
              </strong>
              <span>{invoice.customer.email}</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Change Status <ChevronDown className="w-4 h-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {AVAILABLE_STATUSES.map((status) => (
                <DropdownMenuItem key={status.id}>
                  <form action={handleOnUpdateStatus}>
                    <input type="hidden" name="id" value={invoice.id} />
                    <input type="hidden" name="status" value={status.id} />
                    <button>{status.label}</button>
                  </form>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <span className="sr-only">More Options</span>{" "}
                  <Ellipsis className="w-4 h-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-2">
                      <Trash2 className="w-4 h-auto" /> Delete Invoice
                    </button>
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
              <DialogHeader className="gap-4">
                <DialogTitle className="text-2xl">Delete Invoice?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your invoice and remove your data from our servers.
                </DialogDescription>
                <DialogFooter>
                  <form action={deleteInvoiceAction}>
                    <input type="hidden" name="id" value={invoice.id} />
                    <Button
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-auto" /> Delete Invoice
                    </Button>
                  </form>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </PageWrapper>
    </div>
  );
};

export default Invoice;
