import "./globals.css";
import { Inter, Roboto } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/app/components/Header";
import Footer from "./components/Footer";
import { GSAPProvider } from "@/app/contexts/GSAPContext";
import { GlobalCursor } from "./GlobalCursor";
import { fetchHeaderFooterData } from "@/_lib/fetchHeaderFooterData";
import SEO from "./components/SEO";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export const revalidate = 1;

export const metadata: Metadata = {
  icons: {
    icon: "/images/favicon.png",
  },
};

// Optimize custom font with Next.js font loader (auto-preloads and optimizes)
const alteHansGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/AlteHaasGroteskRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AlteHaasGroteskBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-alte-hans",
  display: "swap",
  preload: true,
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
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
      <SEO />
      <body className={clsx(alteHansGrotesk.variable, roboto.variable, inter.variable)}>
        <Link
          href="/contact"
          className="fixed bottom-4 md:bottom-10 right-4 md:right-10 z-[100] transition-all duration-500 hover:scale-105 hover:rotate-10 w-12 h-12 md:w-[54px] md:h-[54px]"
        >
          <Image
            src={"/images/contact_phone.svg"}
            alt="phone"
            width={54}
            height={54}
            className="w-full h-full"
          />
        </Link>
        <ScrollToTopButton />
        <GSAPProvider>
          <ScrollToTop />
          <GlobalCursor />
          <Header data={data?.Header} />
          <main>{children}</main>
          <Footer data={data?.Footer} />
        </GSAPProvider>
      </body>
    </html>
  );
}
