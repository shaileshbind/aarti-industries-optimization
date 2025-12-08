import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "./components/Footer";
import { GSAPProvider } from "@/app/contexts/GSAPContext";
import { GlobalCursor } from "./GlobalCursor";
import { fetchHeaderFooterData } from "@/_lib/fetchHeaderFooterData";
import SEO from "./components/SEO";
import type { Metadata } from "next";

export const revalidate = 1;

export const metadata: Metadata = {
  icons: {
    icon: "/images/favicon.png",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await fetchHeaderFooterData();

  return (
    <html lang="en">
      <SEO/>
      <body className={roboto.variable}>
        <GSAPProvider>
          <GlobalCursor />
          <Header data={data?.Header} />
          <main>{children}</main>
          <Footer data={data?.Footer}/>
        </GSAPProvider>
      </body>
    </html>
  );
}
