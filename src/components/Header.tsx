import React from "react";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import PageWrapper from "./PageWrapper";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="mt-8 mb-12">
      <PageWrapper className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <p className="font-bold ">
            <Link href="/dashboard">Invoicely</Link>
          </p>

          <span className="text-slate-300">/</span>

          <SignedIn>
            <span className="-ml-2">
              <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" />
            </span>
          </SignedIn>
        </div>
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
