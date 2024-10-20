import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoicely",
  description:
    "Streamline your billing, track payment status, and manage your finances with ease using invoicely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} antialiased min-h-screen grid grid-rows-[auto_1fr_auto]`}
        >
          <Header />

          {children}

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
