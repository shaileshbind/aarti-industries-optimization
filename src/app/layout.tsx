import "./globals.css";
import { Inter, Roboto } from "next/font/google";
import localFont from "next/font/local";
import { GSAPProvider } from "@/app/contexts/GSAPContext";
import { LenisProvider } from "@/app/contexts/LenisContext";
import { fetchHeaderFooterData } from "@/_lib/fetchHeaderFooterData";
import SEO from "./components/SEO";
import AuthProvider from "./components/AuthProvider";
import ConditionalLayout from "./components/ConditionalLayout";
import SearchHighlighter from "./components/SearchHighlighter";
import type { Metadata } from "next";
import clsx from "clsx";
import Script from "next/script";

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

// `preload: false` because next/font/google preloads by default, which was
// emitting a highest-priority <link rel="preload" as="font"> for Inter 400 on
// EVERY route. Inter is referenced in exactly one component
// (components/our-story/TimeLine.tsx) and only at font-bold, so the 400 weight
// was never painted anywhere and the 48KB fetch competed with each page's LCP
// image for bandwidth. The face still loads on demand via font-family, and
// display: "swap" keeps text visible while it does.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await fetchHeaderFooterData();

  const apiOrigin = new URL(process.env.NEXT_PUBLIC_BASE_URL!).origin;
  const checkEnvironment = process.env.NEXT_PUBLIC_IS_PRODUCTION;
  const cdnUrl = checkEnvironment === "true" ? "https://d9bnjb3uan3b2.cloudfront.net" : "https://d2sslj1veyp2s3.cloudfront.net";

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href={apiOrigin} />
        <link rel="dns-prefetch" href={apiOrigin} />
        <link rel="preconnect" href={cdnUrl} />
        <link rel="dns-prefetch" href={cdnUrl} />
      </head>
      <SEO />
      <body className={clsx(alteHansGrotesk.variable, roboto.variable, inter.variable)}>
        <AuthProvider>
          <LenisProvider>
            <GSAPProvider>
              <ConditionalLayout headerData={data?.Header} footerData={data?.Footer}>
                <main>
                  <SearchHighlighter />
                  {children}
                </main>
              </ConditionalLayout>
            </GSAPProvider>
          </LenisProvider>
        </AuthProvider>
        <Script src="/js/investor-notice.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
