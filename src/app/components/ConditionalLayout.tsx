"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
// import { LenisFixed } from "@/app/contexts/LenisContext";
import Image from "next/image";
import Link from "next/link";

const ScrollToTopButton = dynamic(() => import("./ScrollToTopButton"), {
  ssr: false,
});
const GlobalCursor = dynamic(
  () => import("../GlobalCursor").then((m) => ({ default: m.GlobalCursor })),
  { ssr: false },
);

interface ConditionalLayoutProps {
  headerData: any;
  footerData: any;
  children: React.ReactNode;
}

export default function ConditionalLayout({
  headerData,
  footerData,
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <>
      {/* Fixed-position elements rendered outside Lenis content wrapper via portal.
          This prevents Lenis's syncTouch transform from causing flicker/jitter. */}
      {/* <LenisFixed> */}
      {!isLoginPage && (
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
      )}
      {!isLoginPage && <ScrollToTopButton />}
      {!isLoginPage && <GlobalCursor />}
      {!isLoginPage && <Header data={headerData} />}
      {/* </LenisFixed> */}

      {/* Non-fixed elements stay inside the Lenis content wrapper */}
      {!isLoginPage && <ScrollToTop />}
      {children}
      {!isLoginPage && <Footer data={footerData} />}
    </>
  );
}
