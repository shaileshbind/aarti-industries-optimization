import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "./components/Footer";
import { GSAPProvider } from "@/app/contexts/GSAPContext";
import { GlobalCursor } from "./GlobalCursor";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aarti Industries",
  description: "Aarti Industries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <GSAPProvider>
           <GlobalCursor />
          <Header />
          <main>{children}</main>
          <Footer />
        </GSAPProvider>
      </body>
    </html>
  );
}
