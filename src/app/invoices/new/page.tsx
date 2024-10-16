import React from "react";

type Props = {};

const NewInvoicePage = (props: Props) => {
  return (
    <div className="flex flex-col justify-center max-w-5xl h-full text-center gap-6 mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Create Invoice</h1>
      </div>
    </div>
  );
};

export default NewInvoicePage;
