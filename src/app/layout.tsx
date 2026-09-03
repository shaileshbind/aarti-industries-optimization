import "./globals.css";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import { GSAPProvider } from "@/app/contexts/GSAPContext";
import { LenisProvider } from "@/app/contexts/LenisContext";
import { fetchHeaderFooterData } from "@/_lib/fetchHeaderFooterData";
import SEO from "./components/SEO";
import ConditionalLayout from "./components/ConditionalLayout";
import { getPressTickerItems } from "@/_lib/pressTicker";
import SearchHighlighter from "./components/SearchHighlighter";
import type { Metadata } from "next";
import clsx from "clsx";
import Script from "next/script";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/grid";
import "swiper/css/free-mode";
import "swiper/css/navigation";

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

// Roboto stays preloaded: StockTicker renders it in the header, above the fold.
// preload:false was tried here and made mobile LCP worse across 3 runs -- the
// font is then discovered by CSS and refetched at VeryHigh priority mid-load.
// (Inter used to sit alongside this and is now loaded only by /our-story, the
// one route that uses it, saving 40KB of High-priority font on every page.)
// Declaring weight: ["400","700"] shipped two static woff2 files (~88KB) and
// preloaded both at High priority, ahead of the LCP banner -- while no class in
// the repo ever pairs font-roboto with font-bold/semibold, so the 700 file was
// never rendered. Dropping `weight` makes next/font use Roboto's variable
// font: one file, every weight still available, so nothing can regress
// visually if a bold Roboto is ever inherited.
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, pressItems] = await Promise.all([
    fetchHeaderFooterData(),
    getPressTickerItems(),
  ]);

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
      <body className={clsx(alteHansGrotesk.variable, roboto.variable)}>
        {/* SessionProvider (next-auth) now lives in login/layout.tsx -- the only
            route that uses useSession/signIn -- so other pages no longer ship
            it or call /api/auth/session on load. */}
        <LenisProvider>
          <GSAPProvider>
            <ConditionalLayout
              headerData={data?.Header}
              footerData={data?.Footer}
              pressItems={pressItems}
            >
              <main>
                <SearchHighlighter />
                {children}
              </main>
            </ConditionalLayout>
          </GSAPProvider>
        </LenisProvider>
        <Script src="/js/investor-notice.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
