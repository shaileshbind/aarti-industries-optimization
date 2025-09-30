"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Typography from "@/app/components/typography";
import Image from "next/image";
import AnimateTextOnHover from "./ui/AnimateTextOnHover";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const pathname = usePathname();

  const navigation = [
    {
      name: "Products",
      href: "/products",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Para Dichloro Benzene",
          href: "/products/para-dichloro-benzene",
        },
      ],
    },
    {
      name: "Business",
      href: "/business",
      hasDropdown: true,
      dropdownItems: [
        { name: "Pharmaceuticals", href: "/business/pharmaceuticals" },
        { name: "Agrochemicals", href: "/business/agrochemicals" },
        { name: "Specialty Chemicals", href: "/business/specialty-chemicals" },
        {
          name: "Performance Materials",
          href: "/business/performance-materials",
        },
      ],
    },
    {
      name: "Sustainability",
      href: "/sustainability",
      hasDropdown: true,
      dropdownItems: [
        { name: "ESG Initiatives", href: "/sustainability/esg" },
        { name: "Environmental", href: "/sustainability/environmental" },
        { name: "Social", href: "/sustainability/social" },
        { name: "Governance", href: "/sustainability/governance" },
      ],
    },
    {
      name: "Investors",
      href: "/investors",
      hasDropdown: true,
      dropdownItems: [
        { name: "Financial Reports", href: "/investors/reports" },
        { name: "Stock Information", href: "/investors/stock" },
        { name: "Investor Presentations", href: "/investors/presentations" },
        { name: "Corporate Announcements", href: "/investors/announcements" },
      ],
    },
    {
      name: "Careers",
      href: "/careers",
      hasDropdown: true,
      dropdownItems: [
        { name: "Job Openings", href: "/careers/jobs" },
        { name: "Campus Recruitment", href: "/careers/campus" },
        { name: "Life at Aarti", href: "/careers/life" },
        { name: "Benefits", href: "/careers/benefits" },
      ],
    },
    {
      name: "Resources",
      href: "/resources",
      hasDropdown: true,
      dropdownItems: [
        { name: "Downloads", href: "/resources/downloads" },
        { name: "Media Center", href: "/resources/media" },
        { name: "Events", href: "/resources/events" },
        { name: "Contact", href: "/resources/contact" },
      ],
    },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleDropdownToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  return (
    <>
      {/* Fixed Header Container */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        {/* Main Header */}
        <header className="bg-white border-b border-grey-100 flex justify-between">
          <div className="ml-[20px] lg:ml-[60px] w-full h-auto">
            <div className="flex items-center justify-between lg:justify-between h-16 lg:h-18 pr-[24px] relative">
              {/* Logo desktop */}
              <Link
                href="/"
                className="hidden lg:flex items-center space-x-2 z-50"
              >
                <Image
                  src="/images/logo.png"
                  alt="Aarti Industries Logo"
                  width={112}
                  height={46}
                  className="w-[112px]"
                  objectPosition="center"
                />
              </Link>
              {/* Desktop Navigation - Hidden on tablets and below */}
              <nav
                className="hidden lg:flex space-x-8 xl:space-x-10 absolute right-[212px] pr-[24px]"
                onMouseLeave={closeAllDropdowns}
              >
                {navigation.map((item, index) => (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() =>
                      item.hasDropdown && setOpenDropdown(index)
                    }
                    onMouseLeave={() =>
                      item.hasDropdown && setOpenDropdown(null)
                    }
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center transition-colors hover:text-orange-500 ${
                        isActive(item.href)
                          ? "text-orange-500 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      <AnimateTextOnHover
                        staggered
                        activeHover={isActive(item.href)}
                        className="text-sm font-medium"
                      >
                        {item.name}
                      </AnimateTextOnHover>
                      {item.hasDropdown && (
                        <svg
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            openDropdown === index ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </Link>

                    {item.hasDropdown && (
                      <div
                        className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-100 transition-all duration-200 z-[60] ${
                          openDropdown === index
                            ? "opacity-100 visible transform translate-y-0"
                            : "opacity-0 invisible transform -translate-y-2"
                        }`}
                      >
                        <div className="py-2">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {/* Desktop Search Icon */}
                <div className="flex items-start">
                  <div className="w-[20px] h-[20px] relative">
                    <Image src="/images/search.svg" alt="icon" fill className="cursor-pointer" />
                  </div>
                </div>
              </nav>
              {/* Mobile/Tablet Menu Button - Visible on tablets and below */}
              <button
                className="lg:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none z-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <div className="w-6 h-6 relative">
                  {/* Animated Hamburger Lines */}
                  <span
                    className={`absolute left-0 top-1 h-0.5 w-full bg-blue-900 transform transition-all duration-300 ease-in-out ${
                      isMenuOpen ? "rotate-45 top-1/2 -translate-y-1/2" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-blue-900 transition-all duration-200 ease-in-out ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 bottom-1 h-0.5 w-full bg-blue-900 transform transition-all duration-300 ease-in-out ${
                      isMenuOpen ? "-rotate-45 bottom-1/2 translate-y-1/2" : ""
                    }`}
                  />
                </div>
              </button>
              {/* Logo mobile center */}
              <Link
                href="/"
                className="block lg:hidden items-center space-x-2 z-50"
              >
                <Image
                  src="/images/logo.png"
                  alt="Aarti Industries Logo"
                  width={112}
                  height={46}
                  className="w-[112px]"
                  objectPosition="center"
                />
              </Link>
              {/* Extra div only for mobile */}
              <div className="block lg:hidden w-[50px]" />
            </div>
          </div>
          {/* Contact Button - Fixed on right */}
          <Link href="/contact" className="w-fit">
            <div className="absolute top-0 right-0 w-[88px] lg:w-[212px] bg-gradient-orange-1 grid place-items-center rounded-tl-[10px] h-16 lg:h-18">
              <div className="cursor-pointer text-[14px] lg:text-[16px] text-white font-medium">
                Get in touch
              </div>
            </div>
          </Link>
        </header>
      </div>

      {/* Mobile/Tablet Navigation Menu - Fixed positioning */}
      <div
        className={`lg:hidden fixed inset-x-0 bg-white border-t border-gray-100 h-full shadow-lg transition-all duration-300 ease-in-out z-40 ${
          isMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
        style={{ paddingTop: "var(--header-height, 80px)" }}
      >
        {/* Mobile/Tablet Navigation Links */}
        <nav className="py-2">
          {navigation.map((item, index) => (
            <div
              key={item.name}
              className="border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center justify-between px-6 py-3">
                <Link
                  href={item.href}
                  className={`flex-1 transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-orange-500 font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => !item.hasDropdown && setIsMenuOpen(false)}
                >
                  <Typography variant="body-l">{item.name}</Typography>
                </Link>
                {item.hasDropdown && (
                  <button
                    onClick={() => handleDropdownToggle(index)}
                    className="p-2 ml-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg
                      className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Mobile Dropdown Items */}
              {item.hasDropdown && openDropdown === index && (
                <div className="bg-gray-50 border-t border-gray-100">
                  {item.dropdownItems?.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      href={dropdownItem.href}
                      className="block px-10 py-3 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {dropdownItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
          style={{ top: "var(--header-height, 80px)" }}
        />
      )}

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16 lg:h-18 block lg:hidden"></div>

      {/* Add CSS for menu item animations and header height variable */}
      <style jsx>{`
        :root {
          --header-height: 80px;
        }

        @media (min-width: 1024px) {
          :root {
            --header-height: 80px;
          }
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
