import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Chrono Plan",
  description: "Plan your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark bg-[var(--background)] text-[var(--foreground)] font-mono">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
