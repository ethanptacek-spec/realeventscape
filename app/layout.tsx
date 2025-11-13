import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BillBuddy",
  description: "AI-guided bill drafting assistant for Youth in Government students"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">
        {children}
      </body>
    </html>
  );
}
