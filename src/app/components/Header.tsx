"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Typography from "@/app/components/typography";
import Image from "next/image";
import AnimateTextOnHover from "./ui/AnimateTextOnHover";
import gsap from "gsap";
import clsx from "clsx";
import StockTicker from "./home/StockTicker";
import { SubH1 } from "./Typography2";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchedValue, setsearchedValue] = useState<string>("");

  const router = useRouter();
  const pathname = usePathname();
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const mobileMenuToggle = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      gsap.fromTo(
        mobileNavRef.current,
        {
          top: "0%",
        },
        {
          top: "-100%",
          duration: 0.6,
          ease: "power3.inOut",
        }
      );
    } else {
      setIsMenuOpen(true);
      gsap.fromTo(
        mobileNavRef.current,
        {
          top: "-100%",
        },
        {
          top: "0%",
          duration: 1.2,
          ease: "power3.inOut",
        }
      );
    }
  };

  const navigation = [
    {
      name: "Company",
      href: "/company",
      hasDropdown: true,
      dropdownItems: [
        { name: "About Us", href: "/company/about-us" },
        { name: "Our Customers", href: "/company/our-customer" },
        { name: "Awards", href: "/company/awards" },
        { name: "CSR", href: "/company/csr" },
        { name: "Journey", href: "/company/journey" },
        { name: "Events", href: "/company/events" },
      ],
    },
    {
      name: "Products & Services",
      href: "/products-and-services",
      hasDropdown: true,
      dropdownItems: [
        { name: "Products", href: "/products" },
        { name: "Testing Services", href: "/products/testing-services" },
        { name: "Strategic Partnership", href: "/partnership" },
        {
          name: "CDMO",
          href: "/cdmo-contract-development-and-manufacturing-operations",
        },
      ],
    },
    {
      name: "R&D",
      href: "/r-and-d",
      hasDropdown: false,
    },
    {
      name: "Sustainability",
      href: "/sustainability",
      hasDropdown: true,
      dropdownItems: [
        { name: "Overview", href: "/sustainability-overview" },
        { name: "Health & Safety", href: "/sustainability/Health-and-Safety" },
        { name: "Environment", href: "/environment" },
        {
          name: "Responsible Workforce",
          href: "/sustainability/responsible-workforce",
        },
        { name: "Ethics", href: "/ethics" },
        {
          name: "Social Commitment",
          href: "/sustainability/social-commitment",
        },
        {
          name: "Responsible Procurement",
          href: "/sustainability/responsible-procurement",
        },
        { name: "Compliance", href: "/sustainability/compliance" },
        {
          name: "Sustainability Reports",
          href: "/sustainability/sustainability-reports",
        },
        {
          name: "GPS Safety Summary",
          href: "/sustainability/health-and-safety/gps-safety-summary",
        },
      ],
    },
    {
      name: "Investors",
      href: "/investors",
      hasDropdown: true,
      dropdownItems: [
        { name: "Overview", href: "/investor-relations" },
        { name: "Disclosures", href: "/investors/disclosures" },
        {
          name: "Financial information",
          href: "/investors/financial-information",
        },
        {
          name: "Shareholders Information",
          href: "/shareholder-information",
        },
        {
          name: "Corporate Governance",
          href: "/investors/corporate-governance",
        },
        { name: "Code & Policy", href: "/code-and-policies" },
        { name: "Downloads", href: "/investors/download" },
        {
          name: "Annual reports",
          href: "/annual-reports",
        },
      ],
    },
    {
      name: "Careers",
      href: "/careers",
      hasDropdown: true,
      dropdownItems: [
        { name: "Why Aarti Industries", href: "/careers/why-aarti" },
        { name: "Values", href: "/careers/Values-and-Cultural-Attributes" },
        { name: "Rewards & Benefits", href: "/careers/rewards-and-benefits" },
        { name: "Nurturing Talent", href: "/careers/Nurturing-talent" },
        { name: "Join Our Team", href: "/careers/why-aarti" },
        { name: "Life @ Aarti", href: "/life-at-aarti" },
        { name: "Campus", href: "/campus-opportunities" },
        {
          name: "Job Fraud Alert",
          href: "/upload/pdf/Job-Fraud-Alert-AIL.pdf",
          target: "_blank",
        },
      ],
    },
    {
      name: "Contact us",
      href: "/contact",
      hasDropdown: true,
      dropdownItems: [
        { name: "Contact us", href: "/contact" },
        {
          name: "Supplier Portal",
          href: "https://docs.google.com/forms/d/e/1FAIpQLScdbjHXbe4v0DJWPhjvT3m_oOs8kirFMJ7Lir6JOzqlFZbPGg/viewform",
          target: "_blank",
        },
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

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  // Close mobile menu when route changes
  useEffect(() => {
    if (isMenuOpen && mobileNavRef.current) {
      setIsMenuOpen(false);
      gsap.fromTo(
        mobileNavRef.current,
        {
          top: "0%",
        },
        {
          top: "-100%",
          duration: 0.6,
          ease: "power3.inOut",
        }
      );
    }
  }, [pathname]);

  const handleSearch = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (searchedValue.trim()) {
      console.log(encodeURIComponent(searchedValue.trim()));
      router.push(
        `/search-results?search=${encodeURIComponent(searchedValue.trim())}`
      );
      setsearchedValue("");
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {pathname === "/" && <StockTicker />}

      {/* Fixed Header Container */}
      <div
        className={clsx(
          `fixed left-0 right-0 z-50 bg-white`,
          pathname === "/" ? `top-9 lg:top-11` : `top-0`
        )}
      >
        {/* Main Header */}
        <header className="bg-white border-b border-grey-100 flex justify-between">
          <div className="ml-[20px] lg:ml-[60px] w-full h-auto relative z-10">
            <div className="flex items-center justify-between lg:justify-between h-16 lg:h-18 pr-[24px] relative">
              {/* Logo desktop */}
              <Link
                href="/"
                className="hidden lg:flex items-center space-x-2 z-50"
                onClick={() => {
                  setsearchedValue("");
                  setIsSearchOpen(false);
                }}
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
                className="hidden lg:flex gap-5 xl:gap-8 absolute right-[212px] pr-[24px] h-[100%] items-center   "
                onMouseLeave={closeAllDropdowns}
              >
                {navigation.map((item, index) => (
                  <div
                    key={item.name}
                    className="relative group h-[100%] grid "
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
                              onClick={() => {
                                setsearchedValue("");
                                setIsSearchOpen(false);
                                setOpenDropdown(null);
                              }}
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

                {pathname !== "/search-results" && (
                  <div className="flex items-center cursor-pointer h-[100%]">
                    <div
                      className="w-[52px] h-[72px] relative flex items-center justify-center"
                      onClick={handleSearchToggle}
                    >
                      <Image
                        src="/images/search.svg"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <Image
                        src="/images/search-close.svg"
                        alt="icon"
                        width={20}
                        height={20}
                        className={clsx(
                          "absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[20px] h-[20px] opacity-0 transition-all duration-300",
                          isSearchOpen ? "opacity-100" : ""
                        )}
                      />
                    </div>
                  </div>
                )}
              </nav>
              {/* Mobile/Tablet Menu Button - Visible on tablets and below */}
              <button
                className="lg:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none z-50"
                onClick={mobileMenuToggle}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 relative">
                  {/* Animated Hamburger Lines */}
                  <span
                    className={`absolute left-0 top-1 h-0.5 w-full bg-blue-900 transform transition-all duration-300 ease-in-out rounded-[2px] ${
                      isMenuOpen ? "rotate-45 top-1/2 -translate-y-1/2" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-[80%] bg-blue-900 transition-all duration-200 ease-in-out rounded-[2px] ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 bottom-1 h-0.5 w-[60%] bg-blue-900 transform transition-all duration-300 ease-in-out rounded-[2px] ${
                      isMenuOpen
                        ? "-rotate-45 bottom-1/2 translate-y-1/2 w-full"
                        : ""
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

              {/* Mobile Search */}
              {pathname !== "/search-results" && (
                <div className="h-[100%] block lg:hidden">
                  <div
                    className="w-[20px] h-[20px] absolute  right-[100px]md:right-[120px] top-1/2 -translate-y-1/2"
                    onClick={handleSearchToggle}
                  >
                    <Image
                      src="/images/search.svg"
                      alt="icon"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              )}
              {/* Extra div only for mobile */}
              <div className="block lg:hidden w-[50px]" />
            </div>
          </div>

          {/* Contact Button - Fixed on right */}
          <Link
            href="/contact"
            className="absolute top-0 right-0 z-[11] w-[88px] lg:w-[212px] cursor-pointer text-[14px] lg:text-[16px] text-white font-medium  bg-gradient-orange-1 grid place-items-center rounded-tl-[10px] h-16 lg:h-18"
          >
            Get in touch
          </Link>

          <div
            className={clsx(
              "absolute top-0 left-0 w-full bg-[#DFE0E1] transition-all duration-1000 h-[318px] max-h-[00px] overflow-hidden z-[1] after:content-[''] after:absolute after:top-[70px] after:left-0 after:w-full after:h-[1px] after:bg-black/10",
              isSearchOpen ? "!max-h-[320]" : ""
            )}
          >
            <div className="container relative">
              <div
                className={clsx(
                  "absolute top-0 md:left-10 w-full pt-26 pb-16 flex flex-col justify-start transition-opactiy duration-600 delay-600",
                  isSearchOpen ? "opacity-100" : "opacity-0 "
                )}
              >
                <SubH1 className="text-blue-200 font-medium">Search</SubH1>
                <SearchBar
                  value={searchedValue}
                  onChange={(e) => setsearchedValue(e.target.value)}
                  handleSearch={handleSearch}
                  placeholder="Search..."
                  headerSearch={true}
                />
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile/Tablet Navigation Menu - Fixed positioning */}
      <div
        ref={mobileNavRef}
        className={`lg:hidden fixed inset-x-0 bg-white border-t border-gray-100 h-full shadow-lg z-40 overflow-hidden top-[-100%]`}
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
              <div
                className={`bg-gray-50 border-t border-gray-100 transition-all duration-400 overflow-hidden ${
                  item.hasDropdown && openDropdown === index
                    ? "max-h-[200px]"
                    : "max-h-0"
                }`}
              >
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
            </div>
          ))}
        </nav>
      </div>

      {isSearchOpen && (
        <div
          className="bg-black/50 fixed w-full h-full top-0 left-0 transition-all duration-300 z-[10]"
          onClick={() => {
            setIsSearchOpen(false);
            setsearchedValue("");
          }}
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
