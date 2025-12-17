import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | NoteGrid",
    default: "NoteGrid",
  },
  description:
    "Boost your workflow with NoteGrid — organize your dev notes, code snippets, and technical insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            className: "rounded-lg shadow-lg font-sans",
            style: {
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
