import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PageWrapper from "./PageWrapper";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="mt-8 mb-12">
      <PageWrapper className="flex justify-between items-center gap-4">
        <p className="font-bold ">
          <Link href="/dashboard">Invoicely</Link>
        </p>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </PageWrapper>
    </header>
  );
};

export default Header;
