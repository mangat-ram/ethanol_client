import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/store/store";

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
      <body className={inter.className}>
        <Provider store={store}>
          <Toaster position="bottom-right" />
          {children}
        </Provider>
      </body>
    </html>
  );
}
