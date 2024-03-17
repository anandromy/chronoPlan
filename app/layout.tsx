import type { Metadata } from "next";
import "./globals.css";

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
      <body className="dark bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
