import React from "react";
import PageWrapper from "./PageWrapper";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="mt-12 mb-8">
      <PageWrapper className="flex justify-between items-center">
        <p className="text-sm">Invoicely &copy;{new Date().getFullYear()}</p>
        <p className="text-sm">Seamless Payments, Smart Invoices.</p>
      </PageWrapper>
    </footer>
  );
};

export default Footer;
