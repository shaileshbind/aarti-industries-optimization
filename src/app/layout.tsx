import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "./components/Footer";
import { GSAPProvider } from "@/app/contexts/GSAPContext";
import { GlobalCursor } from "./GlobalCursor";
import { fetchHeaderFooterData } from "@/_lib/fetchHeaderFooterData";

export const revalidate = 1;

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await fetchHeaderFooterData();
  console.log("🔍 FINAL HEADER DATA:", data?.Header);
  console.log("🔍 FINAL FOOTER DATA:", data?.Footer);
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <GSAPProvider>
          <GlobalCursor />
          <Header />
          <main>{children}</main>
          <Footer data={data?.Footer}/>
        </GSAPProvider>
      </body>
    </html>
  );
}
