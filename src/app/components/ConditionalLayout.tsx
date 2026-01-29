"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopButton from "./ScrollToTopButton";
import { GlobalCursor } from "../GlobalCursor";
import Image from "next/image";
import Link from "next/link";

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
      {!isLoginPage && <ScrollToTop />}
      {!isLoginPage && <GlobalCursor />}
      {!isLoginPage && <Header data={headerData} />}
      {children}
      {!isLoginPage && <Footer data={footerData} />}
    </>
  );
}
