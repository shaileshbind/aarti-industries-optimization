"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Typography from "@/app/components/typography";
import Image from "next/image";
import AnimateTextOnHover from "./ui/AnimateTextOnHover";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Products", href: "/products" },
    { name: "Business", href: "/" },
    { name: "Sustainability", href: "/" },
    { name: "Investors", href: "/" },
    { name: "Careers", href: "/" },
    { name: "Resources", href: "/" },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };
  return (
    <>
      {/* Fixed Header Container */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        {/* Main Header */}
        <header className="bg-background border-b border-grey-100 flex justify-between">
          <div className="container w-full h-auto ">
            <div className="flex items-center justify-between lg:justify-between h-16 lg:h-20 pr-[24px] ">
              {/* Logo desktop*/}
              <Link
                href="/"
                className="hidden lg:flex items-center space-x-2 z-50 "
              >
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={112}
                  height={46}
                  className="w-[112px] "
                  objectPosition="center"
                />
              </Link>

              {/* Desktop Navigation - Hidden on tablets and below */}
              <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 ml-auto ">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`transition-colors hover:text-violet-80 ${
                      isActive(item.href)
                        ? "text-violet-80 font-medium"
                        : "text-foreground"
                    }`}
                  >
                    <AnimateTextOnHover
                      staggered
                      activeHover={isActive(item.href)}
                      className="nav text-nav-item" // Pass the typography classes here
                    >
                      {item.name}
                    </AnimateTextOnHover>
                  </Link>
                ))}
              </nav>

              {/* Desktop Search and Login - Hidden on tablets and below */}
              <div className="hidden lg:flex items-center space-x-4">
                {/* Login Button - Desktop only */}
                {/* <a href="/" className="w-fit">
                  <div className="cursor-pointer bg-gradient-orange-1">
                    Get in touch
                  </div>
                </a> */}
              </div>

              {/* Mobile/Tablet Menu Button - Visible on tablets and below */}
              <button
                className="lg:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none z-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <div className="w-6 h-3.5 relative flex flex-col justify-between">
                  {/* Animated Hamburger Lines */}
                  <span
                    className={`block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
                      isMenuOpen
                        ? "rotate-43 translate-y-2 bg-violet-80"
                        : "translate-y-0"
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-current transition-all duration-200 ease-in-out ${
                      isMenuOpen ? "opacity-0 bg-violet-80" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
                      isMenuOpen
                        ? "-rotate-43 -translate-y-1 bg-violet-80"
                        : "translate-y-0"
                    }`}
                  />
                </div>
              </button>

              {/* Logo desktop*/}
              <Link
                href="/"
                className="block lg:hidden items-center space-x-2 z-50 "
              >
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={112}
                  height={46}
                  className="w-[112px] "
                  objectPosition="center"
                />
              </Link>
              {/* extra div only for mobile */}
              <div className="block lg:hidden w-[50px]" />
            </div>
          </div>
          {/* get in touch btn */}
          {/* <div className="right-0 w-[calc(100vw-200px)] ml-0 bg-gradient-orange-1 grid place-items-center rounded-tl-[10px]">
            <a href="/" className="w-fit">
              <div className="cursor-pointer text-[16px] text-white font-normal font-alte-hans">
                Get in touch
              </div>
            </a>
          </div> */}
          <div className="absolute top-0 right-0 w-[88px] lg:w-[212px] bg-gradient-orange-1 grid place-items-center rounded-tl-[10px] h-16 lg:h-20">
            <Link href="/" className="w-fit">
              <div className="cursor-pointer text-[16px] text-white font-normal font-alte-hans">
                Contact
              </div>
            </Link>
          </div>
        </header>
      </div>

      {/* Mobile/Tablet Navigation Menu - Fixed positioning */}
      <div
        className={`lg:hidden fixed inset-x-0 bg-white border-t border-grey-10 h-full shadow-lg transition-all duration-300 ease-in-out z-40 ${
          isMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
        style={{ paddingTop: "var(--header-height, 104px)" }} // Adjust based on your header + marquee height
      >
        {/* Mobile/Tablet Navigation Links */}
        <nav className="py-2 ">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-6 py-3 hover:bg-grey-5 transition-all duration-200 transform ${
                isActive(item.href)
                  ? "text-[#102533] font-medium "
                  : "text-foreground hover:translate-x-1"
              }`}
              onClick={() => setIsMenuOpen(false)}
              style={{
                animationDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              <Typography variant="body-l">{item.name}</Typography>
            </Link>
          ))}
        </nav>

        {/* Mobile/Tablet Footer Actions */}
        <div className="p-4 border-t border-grey-10 space-y-3 hidden">
          {/* Login Link for Mobile/Tablet */}
          <Link
            href="/login"
            className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-violet-80 text-white rounded-lg hover:bg-violet-100 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5.9812 18.6909C6.54549 17.5795 7.40654 16.6459 8.4689 15.9939C9.53126 15.3418 10.7534 14.9966 12 14.9966C13.2465 14.9966 14.4686 15.3418 15.531 15.9939C16.5934 16.6459 17.4544 17.5795 18.0187 18.6909"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 15C14.0711 15 15.75 13.3211 15.75 11.25C15.75 9.17893 14.0711 7.5 12 7.5C9.92893 7.5 8.25 9.17893 8.25 11.25C8.25 13.3211 9.92893 15 12 15Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Typography variant="button-m" className="text-white">
              Login / Register
            </Typography>
          </Link>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
          style={{ top: "var(--header-height, 104px)" }}
        />
      )}

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className=""></div>

      {/* Add CSS for menu item animations and header height variable */}
      <style jsx>{`
        :root {
          --header-height: 136px; /* Adjust this based on your actual header height */
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        nav a {
          animation: ${isMenuOpen ? "slideIn 0.3s ease-out forwards" : "none"};
        }
      `}</style>
    </>
  );
};

export default Header;
