"use client";

import React, { SyntheticEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createInvoice } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";
import PageWrapper from "@/components/PageWrapper";

type Props = {};

const NewInvoicePage = (props: Props) => {
  const [state, setState] = useState<string>("ready");

  const handleOnSubmit = async (e: SyntheticEvent) => {
    if (state == "pending") {
      e.preventDefault();
      return;
    }

    setState("pending");
  };

  return (
    <div className="h-full">
      <PageWrapper className="flex flex-col gap-6">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Create Invoice</h1>
        </div>

        <form
          action={createInvoice}
          onSubmit={handleOnSubmit}
          className="grid grid-cols-1 gap-4 max-w-xs"
        >
          <div>
            <Label htmlFor="name" className="block font-semibold text-sm mb-2">
              Billing Name
            </Label>
            <Input id="name" name="name" type="text" />
          </div>
          <div>
            <Label htmlFor="email" className="block font-semibold text-sm mb-2">
              Billing Email
            </Label>
            <Input id="email" name="email" type="text" />
          </div>
          <div>
            <Label htmlFor="value" className="block font-semibold text-sm mb-2">
              Value
            </Label>
            <Input id="value" name="value" type="text" />
          </div>
          <div>
            <Label
              htmlFor="description"
              className="block font-semibold text-sm mb-2"
            >
              Description
            </Label>
            <Textarea id="description" name="description" />
          </div>

          <div>
            <SubmitButton />
          </div>
        </form>
      </PageWrapper>
    </div>
  );
};

export default NewInvoicePage;
