import type { Metadata } from "next";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";
import "./globals.css";

const inter = Edu_VIC_WA_NT_Beginner({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Skyjo Score",
  description: "Digital scoreboard for Skyjo card game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
