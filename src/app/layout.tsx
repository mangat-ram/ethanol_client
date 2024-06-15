import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Poppins({ subsets: ["latin"],weight:"500" });
//Caveat font can be used for infos 

export const metadata: Metadata = {
  title: "Ethonol - Benzene Labs",
  description: "A Modern Project Management and Productivity tool.",
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
