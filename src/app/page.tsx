import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full flex flex-col justify-center text-center">
      <PageWrapper>
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Simplify Your Invoicing Process
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg leading-tight">
            Streamline your billing, track payment status, and manage your
            finances with ease using invoicely.
          </p>
          <p>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </p>
        </div>
      </PageWrapper>
    </main>
  );
}
