import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type React from "react"; // Added import for React

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
