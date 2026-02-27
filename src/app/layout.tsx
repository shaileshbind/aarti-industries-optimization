import "./globals.css";
import { Inter, Roboto } from "next/font/google";
import localFont from "next/font/local";
import { GSAPProvider } from "@/app/contexts/GSAPContext";
import { fetchHeaderFooterData } from "@/_lib/fetchHeaderFooterData";
import SEO from "./components/SEO";
import AuthProvider from "./components/AuthProvider";
import ConditionalLayout from "./components/ConditionalLayout";
import type { Metadata } from "next";
import clsx from "clsx";

export const revalidate = 300;

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

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
        <AuthProvider>
          <GSAPProvider>
            <ConditionalLayout headerData={data?.Header} footerData={data?.Footer}>
              <main>{children}</main>
            </ConditionalLayout>
          </GSAPProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
