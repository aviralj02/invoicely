"use client";

import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

type Props = {};

const SubmitButton = (props: Props) => {
  const { pending } = useFormStatus();
  console.log(pending);

  return (
    <Button className="w-full font-semibold">
      {pending ? (
        <span className="flex items-center justify-center w-full h-full text-gray-400">
          <LoaderCircle className="animate-spin" />
        </span>
      ) : (
        <span>Submit</span>
      )}
    </Button>
  );
};

export default SubmitButton;
