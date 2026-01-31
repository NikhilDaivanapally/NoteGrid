import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ReduxProvider from "@/store/provider";
import { SITE_INFO } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url!),
  title: {
    template: `%s | ${SITE_INFO.name}`,
    default: SITE_INFO.name,
  },
  description: SITE_INFO.description,
  openGraph: {
    type: "website",
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    url: SITE_INFO.url,
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    creator: "@nikhildaivana", // Twitter username
    images: [SITE_INFO.ogImage],
  },
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
        <ReduxProvider>
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
        </ReduxProvider>
      </body>
    </html>
  );
}
