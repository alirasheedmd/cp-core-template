import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const NunitoSans = Nunito_Sans({
  variable: "--font-NunitoSans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce Template",
  description: "Owned by Curious Packet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NunitoSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
