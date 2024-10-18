import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const PageWrapper = ({ children, className }: Props) => {
  return (
    <div className={cn(className, "max-w-5xl mx-auto px-5")}>{children}</div>
  );
};

export default PageWrapper;
