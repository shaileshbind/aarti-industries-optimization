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
import { BodyText3, SubH1 } from "./Typography2";
import SearchBar from "./SearchBar";
import { HeaderProps } from "../types/header-footer.type";

const Header = ({ data }: HeaderProps) => {
  const { Logo, menu  } = data || {};
  // ctaButton
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedSubMenuId, setExpandedSubMenuId] = useState<number | null>(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<number | null>(null);
  const [mobileExpandedSubMenu, setMobileExpandedSubMenu] = useState<number | null>(null);
  const [searchedValue, setsearchedValue] = useState<string>("");

  const router = useRouter();
  const pathname = usePathname();
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const subMenuRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const desktopDropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const desktopSubMenuRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const searchBackdropRef = useRef<HTMLDivElement>(null);
  const prevPathnameRef = useRef<string>(pathname);

  const mobileMenuToggle = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setIsSearchOpen(false);
      // Reset expanded menus when closing
      setMobileExpandedMenu(null);
      setMobileExpandedSubMenu(null);
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
      setIsSearchOpen(false);
      // Find menu item with active page and expand it
      if (menu && menu.length > 0) {
        let activeMenuIndex: number | null = null;
        let activeSubMenuId: number | null = null;

        // Find which menu item contains the active page
        menu.forEach((item, index) => {
          if (item.subMenu && item.subMenu.length > 0) {
            const allInnerLinks = item.subMenu.flatMap((sub) =>
              sub.item?.map((i) => i.cta_link?.link || i.externalLink || "") || []
            );
            const isMenuActive = allInnerLinks.some((link) => link && isActive(link));

            if (isMenuActive && activeMenuIndex === null) {
              activeMenuIndex = index;
              
              // Find which submenu contains the active page
              item.subMenu.forEach((subMenuItem) => {
                if (subMenuItem.item) {
                  const subMenuLinks = subMenuItem.item.map(
                    (i) => i.cta_link?.link || i.externalLink || ""
                  );
                  const isSubMenuActive = subMenuLinks.some(
                    (link) => link && isActive(link)
                  );
                  
                  if (isSubMenuActive && activeSubMenuId === null) {
                    activeSubMenuId = subMenuItem.id ?? null;
                  }
                }
              });
            }
          }
        });

        // Expand the active menu and submenu if found
        if (activeMenuIndex !== null) {
          setMobileExpandedMenu(activeMenuIndex);
          if (activeSubMenuId !== null) {
            setMobileExpandedSubMenu(activeSubMenuId);
          }
        }
      }
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
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  // const handleDropdownToggle = (index: number) => {
  //   setOpenDropdown(openDropdown === index ? null : index);
  // };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
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
  }
   
  };

  const toggleSubMenu = (subMenuId: number) => {
    setExpandedSubMenuId((prev) => {
      // If clicking the same submenu, close it; otherwise, open the new one (accordion behavior)
      return prev === subMenuId ? null : subMenuId;
    });
  };

  const toggleMobileMenu = (menuIndex: number) => {
    const isCurrentlyExpanded = mobileExpandedMenu === menuIndex;

    if (isCurrentlyExpanded) {
      // Closing the menu - reset submenu
      setMobileExpandedMenu(null);
      setMobileExpandedSubMenu(null);
    } else {
      // Opening the menu - expand it
      setMobileExpandedMenu(menuIndex);

      // Only auto-expand the first submenu for the first dropdown (index 0)
      if (menuIndex === 0 && menu && menu[menuIndex]?.subMenu && menu[menuIndex].subMenu.length > 0) {
        const firstSubMenu = menu[menuIndex].subMenu[0];
        if (firstSubMenu?.id !== undefined) {
          setMobileExpandedSubMenu(firstSubMenu.id);
        }
      } else {
        // For other dropdowns, don't use accordion
        setMobileExpandedSubMenu(null);
      }
    }
  };

  const toggleMobileSubMenu = (subMenuId: number) => {
    setMobileExpandedSubMenu((prev) => {
      return prev === subMenuId ? null : subMenuId;
    });
  };
  // Close mobile menu when route changes
  useEffect(() => {
    // Check if pathname actually changed (skip initial render)
    if (prevPathnameRef.current !== pathname && mobileNavRef.current) {
      // Always close menu when route changes, regardless of state
      // This handles cases where onClick set state but didn't trigger animation
      setIsMenuOpen(false);
      // Reset expanded menus when closing
      setMobileExpandedMenu(null);
      setMobileExpandedSubMenu(null);
      
      // Animate menu close
      gsap.to(mobileNavRef.current, {
        top: "-100%",
        duration: 0.6,
        ease: "power3.inOut",
      });
    }
    // Update the ref for next comparison
    prevPathnameRef.current = pathname;
  }, [pathname]);

  // When a dropdown opens, expand the first submenu by default (only for first dropdown)
  useEffect(() => {
    if (openDropdown !== null && menu) {
      // Only auto-expand for the first dropdown (index 0)
      if (openDropdown === 0) {
        const currentMenu = menu[openDropdown];
        if (currentMenu?.subMenu && currentMenu.subMenu.length > 0) {
          const firstSubMenuId = currentMenu.subMenu[0].id ?? 0;
          setExpandedSubMenuId(firstSubMenuId);
        }
      } else {
        // For other dropdowns, don't use accordion
        setExpandedSubMenuId(null);
      }
    } else {
      // When dropdown closes, reset expanded submenu
      setExpandedSubMenuId(null);
    }
  }, [openDropdown, menu]);

  // Initialize dropdown heights on mount
  useEffect(() => {
    dropdownRefs.current.forEach((element) => {
      if (element) {
        gsap.set(element, { height: 0, opacity: 0 });
      }
    });
    subMenuRefs.current.forEach((element) => {
      if (element) {
        gsap.set(element, { height: 0, opacity: 0 });
      }
    });
    desktopDropdownRefs.current.forEach((element) => {
      if (element) {
        gsap.set(element, { opacity: 0, y: -8, visibility: "hidden" });
      }
    });
    desktopSubMenuRefs.current.forEach((element) => {
      if (element) {
        gsap.set(element, { height: 0, opacity: 0 });
      }
    });
  }, []);

  // GSAP animation for mobile dropdown menus
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      dropdownRefs.current.forEach((element, menuIndex) => {
        if (element) {
          const isExpanded = mobileExpandedMenu === menuIndex;
          
          if (isExpanded) {
            // Animate to auto height
            // gsap.to(element, {
            //   height: "auto",
            //   opacity: 1,
            //   duration: 0.5,
            //   ease: "power3.out",
            // });
            gsap.fromTo(
              element,
              { 
                opacity: 0, 
                 
                height: 0
              },
              {
                opacity: 1,
                 
                height: 'auto',
                duration: 0.4,
                 
                ease: 'sine.inOut'
              }
            );
          } else {
            // Animate to closed
            gsap.to(element, {
              height: 0,
              opacity: 0,
              duration: 0.4,
              ease: 'sine.inOut'
            });
          }
        }
      });
    });
  }, [mobileExpandedMenu]);

  // GSAP animation for mobile submenu items
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      subMenuRefs.current.forEach((element, subMenuId) => {
        if (element) {
          const isExpanded = mobileExpandedSubMenu === subMenuId;
          
          if (isExpanded) {
            // Animate to auto height
            // gsap.to(element, {
            //   height: "auto",
            //   opacity: 1,
            //   duration: 0.4,
            //   ease: "power3.out",
            // });
            gsap.fromTo(
              element,
              { 
                opacity: 0, 
                 
                height: 0
              },
              {
                opacity: 1,
                 
                height: 'auto',
                duration: 0.4,
                 
                ease: 'sine.inOut'
              }
            );
            
          } else {
            // Animate to closed
            gsap.to(element, {
              height: 0,
              opacity: 0,
              duration: 0.3,
              ease: 'sine.inOut'
            });
          }
        }
      });
    });
  }, [mobileExpandedSubMenu]);

  // GSAP animation for desktop dropdown menus
  useEffect(() => {
    requestAnimationFrame(() => {
      desktopDropdownRefs.current.forEach((element, dropdownIndex) => {
        if (element) {
          const isOpen = openDropdown === dropdownIndex;
          
          if (isOpen) {
            gsap.fromTo(
              element,
              { 
                opacity: 0, 
                y: -8,
                visibility: "hidden"
              },
              {
                opacity: 1,
                y: 0,
                visibility: "visible",
                duration: 0.4,
                ease: 'sine.inOut'
              }
            );
          } else {
            gsap.to(element, {
              opacity: 0,
              y: -8,
              visibility: "hidden",
              duration: 0.3,
              ease: 'sine.inOut'
            });
          }
        }
      });
    });
  }, [openDropdown]);

  // GSAP animation for desktop submenu accordion items
  useEffect(() => {
    requestAnimationFrame(() => {
      desktopSubMenuRefs.current.forEach((element, subMenuId) => {
        if (element) {
          const isExpanded = expandedSubMenuId === subMenuId;
          
          if (isExpanded) {
            gsap.fromTo(
              element,
              { 
                opacity: 0, 
                height: 0
              },
              {
                opacity: 1,
                height: 'auto',
                duration: 0.4,
                ease: 'sine.inOut'
              }
            );
          } else {
            gsap.to(element, {
              height: 0,
              opacity: 0,
              duration: 0.3,
              ease: 'sine.inOut'
            });
          }
        }
      });
    });
  }, [expandedSubMenuId]);

  // GSAP animation for search backdrop fade in/out
  useEffect(() => {
    if (searchBackdropRef.current) {
      if (isSearchOpen) {
        gsap.fromTo(
          searchBackdropRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.3,
            ease: 'sine.inOut',
          }
        );
      } else {
        gsap.to(searchBackdropRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'sine.inOut',
        });
      }
    }
  }, [isSearchOpen]);

  const handleSearch = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (searchedValue.trim()) {
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
          `fixed left-0 right-0 z-50`,
          pathname === "/" ? `top-9 lg:top-11` : `top-0`
        )}
      >
        {/* Main Header */}
        <header className="bg-[rgba(255,255,255,0.8)] border-b border-grey-100 flex justify-between backdrop-blur-md">
          <div className="ml-[0px] lg:ml-[60px] w-full h-auto relative z-10">
            <div className="flex items-center justify-start lg:justify-between h-16 lg:h-18 pr-[24px] relative">
              {/* Logo desktop */}
              {Logo?.Logo?.url && (
                <Link
                  href={Logo?.link || "/"}
                  className="hidden lg:flex items-center space-x-2 z-50"
                >
                  <Image
                    src={Logo?.Logo?.url}
                    alt={Logo?.Logo?.alternativeText || "logo"}
                    width={112}
                    height={46}
                    className="w-[112px] object-center"
                  />
                </Link>
              )}
              {/* Desktop Navigation - Hidden on tablets and below */}
              <nav
                className="hidden lg:flex gap-5 xl:gap-8 absolute right-[212px] pr-[24px] h-[100%] items-center   "
                onMouseLeave={closeAllDropdowns}
              >
                {menu?.map((item, index) => {
                  const hasDropdown = item.subMenu && item.subMenu.length > 0;
                  // Collect ALL inner submenu links
                  const allInnerLinks =
                  item.subMenu?.flatMap((sub) =>
                    sub.item?.map((i) => i.cta_link?.link || i.externalLink || "")
                  ) || [];
                  // Check if ANY link is active
                  const isMenuActive = allInnerLinks.some((link) => link && isActive(link)) || false;
                  return (
                    <div
                      key={item.id}
                      className="relative group h-[100%] grid "
                      onMouseEnter={() => hasDropdown && setOpenDropdown(index)}
                      onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
                    >
                      <button
                        className={`flex items-center transition-colors hover:text-orange-500 ${isMenuActive
                          ? "text-orange-500 font-medium"
                          : "text-gray-700"
                          }`}
                      >
                        <AnimateTextOnHover
                          staggered
                          activeHover={isActive(item.subMenu?.[0]?.item?.[0]?.cta_link?.link || item.subMenu?.[0]?.item?.[0]?.externalLink || "")}
                          className="text-sm font-medium"
                        >
                          {/* {item.subMenu?.[0]?.item?.map((item) => item.cta_link?.link || item.externalLink || "").join(", ")} */}
                          {item.menuTitle}
                        </AnimateTextOnHover>
                        {item.subMenu && item.subMenu.length > 0 && (
                          <svg
                            className={`ml-1 h-4 w-4 transition-transform duration-200 ${openDropdown === index ? "rotate-180" : ""
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
                      </button>

                      {item.subMenu && hasDropdown && openDropdown === index && (
                        <div
                          ref={(el) => {
                            if (el) {
                              desktopDropdownRefs.current.set(index, el);
                            } else {
                              desktopDropdownRefs.current.delete(index);
                            }
                          }}
                          className="absolute top-full left-0 translate-x-[-30%] mt-2 w-[630px] p-7 bg-white rounded-[14px] shadow-lg border border-gray-100 z-[60] after:content-[''] after:absolute after:bottom-[100%] after:left-0 after:w-full after:h-[10px] after:z-[-1] opacity-0 visibility-hidden"
                        >
                          {/* {openDropdown} */}
                          <div className="grid grid-cols-2   gap-2">
                            <div className="max-h-[500px] overflow-y-auto col-span-1">
                              {item.subMenu.map((subMenuItem, subMenuIndex) => {
                                const subMenuId = subMenuItem.id ?? subMenuIndex;
                                const isExpanded = expandedSubMenuId === subMenuId;
                                const isFirstDropdown = index === 0;
                                
                                // For first dropdown: use accordion, for others: show items directly
                                if (isFirstDropdown) {
                                  return (
                                    <div key={subMenuId}>
                                      <button
                                        onClick={() => toggleSubMenu(subMenuId)}
                                        className="w-full flex items-center justify-between text-sm font-medium py-2 text-orange-200 hover:text-orange-300 transition-colors cursor-pointer"
                                      >
                                        <BodyText3 className="text-orange-200">{subMenuItem.title}</BodyText3>
                                        {subMenuItem.item && subMenuItem.item.length > 0 && (
                                          <i className={clsx(" h-[14px] w-[14px] relative after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-full after:h-[2px] after:bg-orange-200 after:rounded-[2px] after:transition-all after:duration-200  before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:h-full before:w-[2px] before:bg-orange-200 before:rounded-[2px] before:transition-all before:duration-600 ", isExpanded ? "before:rotate-90" : "before:rotate-0")}></i>
                                        )}
                                      </button>
                                      {subMenuItem.item && subMenuItem.item.length > 0 && (
                                        <div
                                          ref={(el) => {
                                            if (el) {
                                              desktopSubMenuRefs.current.set(subMenuId, el);
                                            } else {
                                              desktopSubMenuRefs.current.delete(subMenuId);
                                            }
                                          }}
                                          className="mb-2 last:mb-0 overflow-hidden"
                                        >
                                          <div className="pt-1">
                                            {subMenuItem.item.map((item) => {
                                              // Get href from cta_link.link first, then fall back to externalLink
                                              const href = item.cta_link?.link || item.externalLink;
                                              
                                              // Handle items without a valid link - show as disabled
                                              if (!href || href === "#") {
                                                return (
                                                  <div
                                                    key={item.id}
                                                    className="block px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
                                                  >
                                                    {item.title}
                                                  </div>
                                                );
                                              }

                                              const isExternal = href.startsWith("http://") || href.startsWith("https://");

                                              // For external links, use regular <a> tag, for internal use Next.js Link
                                              if (isExternal) {
                                                return (
                                                  <a
                                                    key={item.id}
                                                    href={href}
                                                    target="_self"
                                                    rel="noopener noreferrer"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                                                    onClick={() => setOpenDropdown(null)}
                                                  >
                                                    {item.title}
                                                  </a>
                                                );
                                              }

                                              return (
                                                <Link
                                                  key={item.id}
                                                  href={href}
                                                  className={clsx("block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors", isActive(href) ? "text-orange-500 bg-orange-50 font-medium" : "text-gray-700")}
                                                  onClick={() => {
                                                    setsearchedValue("");
                                                    setIsSearchOpen(false);
                                                    setOpenDropdown(null);
                                                  }}
                                                >
                                                  {item.title}
                                                </Link>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                } else {
                                  // For other dropdowns: show items directly without accordion
                                  return (
                                    <div key={subMenuId} className="mb-2 last:mb-0">
                                      <div className="py-2">
                                        <BodyText3 className="text-orange-200">{subMenuItem.title}</BodyText3>
                                      </div>
                                      {subMenuItem.item && subMenuItem.item.length > 0 && (
                                        <div className="pt-1">
                                          {subMenuItem.item.map((item) => {
                                            // Get href from cta_link.link first, then fall back to externalLink
                                            const href = item.cta_link?.link || item.externalLink;
                                            
                                            // Handle items without a valid link - show as disabled
                                            if (!href || href === "#") {
                                              return (
                                                <div
                                                  key={item.id}
                                                  className="block px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
                                                >
                                                  {item.title}
                                                </div>
                                              );
                                            }

                                            const isExternal = href.startsWith("http://") || href.startsWith("https://");

                                            // For external links, use regular <a> tag, for internal use Next.js Link
                                            if (isExternal) {
                                              return (
                                                <a
                                                  key={item.id}
                                                  href={href}
                                                  target="_self"
                                                  rel="noopener noreferrer"
                                                  className={clsx("block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors", isActive(href) ? "text-orange-500 bg-orange-50 font-medium" : "text-gray-700")}
                                                  onClick={() => setOpenDropdown(null)}
                                                >
                                                  {item.title}
                                                </a>
                                              );
                                            }

                                            return (
                                              <Link
                                                key={item.id}
                                                href={href}
                                                className={clsx("block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors", isActive(href) ? "text-orange-500 bg-orange-50 font-medium" : "text-gray-700")}
                                                onClick={() => {
                                                  setsearchedValue("");
                                                  setIsSearchOpen(false);
                                                  setOpenDropdown(null);
                                                }}
                                              >
                                                {item.title}
                                              </Link>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  );
                                }
                              })}
                            </div>
                            {item.image && item.image.url && (
                              <div className="overflow-y-auto col-span-1 p-7 overflow-hidden">
                                <div className="w-[250px] h-[240px] relative">
                                  <div className="absolute inset-0 overflow-hidden w-full h-full rounded-[10px]">
                                    <Image
                                      src={item.image.url}
                                      alt={item.image.alternativeText || "active-img"}
                                      fill
                                      className="object-cover scale-110 w-full h-full "
                                    />
                                    <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md !rounded-[10px] overflow-hidden"></i>
                                    <span className="absolute rounded-full rounded-br-[28px] overflow-hidden w-full h-full">
                                      <Image
                                        src={item.image.url}
                                        alt={item.image.alternativeText || "active-img"}
                                        fill
                                        className="object-cover scale-110 w-full h-full"
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
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
                className="lg:hidden relative w-14 h-10 flex items-center justify-center focus:outline-none z-50"
                onClick={mobileMenuToggle}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 relative">
                  {/* Animated Hamburger Lines */}
                  <span
                    className={`absolute left-0 top-1 h-0.5 w-full bg-blue-900 transform transition-all duration-300 ease-in-out rounded-[2px] ${isMenuOpen ? "rotate-45 top-1/2 -translate-y-1/2" : ""
                      }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-[80%] bg-blue-900 transition-all duration-200 ease-in-out rounded-[2px] ${isMenuOpen ? "opacity-0" : "opacity-100"
                      }`}
                  />
                  <span
                    className={`absolute left-0 bottom-1 h-0.5 w-[60%] bg-blue-900 transform transition-all duration-300 ease-in-out rounded-[2px] ${isMenuOpen
                      ? "-rotate-45 bottom-1/2 translate-y-1/2 w-full"
                      : ""
                      }`}
                  />
                </div>
              </button>

              {/* Logo mobile center */}
              {Logo?.Logo?.url && (
                <Link
                  href={Logo?.link || "/"}
                  className="block lg:hidden items-center space-x-2 z-50"
                >
                  <Image
                    src={Logo?.Logo?.url}
                    alt={Logo?.Logo?.alternativeText || "logo"}
                    width={112}
                    height={46}
                    className="w-[112px] object-center"
                  />
                </Link>
              )}
              {/* Mobile Search */}
              {pathname !== "/search-results" && (
                 <div className="h-[100%] lg:hidden  absolute  right-[100px] md:right-[120px] flex items-center justify-center "
                 onClick={handleSearchToggle}
                 >
                  <div
                    className="w-[20px] mx-3 h-[20px] relative"
                    
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
              {/* Extra div only for mobile */}
              <div className="block lg:hidden w-[50px]" />
            </div>
          </div>
          

          {/* Contact Button - Fixed on right */}
          <Link href="/contact"
            className="absolute top-0 right-0 z-[11] w-[88px] lg:w-[212px] cursor-pointer text-[14px] lg:text-[16px] text-white font-medium  bg-gradient-orange-1 grid place-items-center rounded-tl-[10px] h-16 lg:h-18">
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
        className={`lg:hidden fixed inset-x-0 bg-[#F4F5F6] border-t border-gray-100 h-full shadow-lg z-40 overflow-hidden top-[-100%] `}
        style={{ paddingTop: `${pathname === "/" ? `99px` : `63px`}` }}
      >
        {/* Mobile/Tablet Navigation Links */}
        <nav className="px-6 overflow-y-auto "
          style={{ maxHeight: `calc(100vh - ${pathname === "/" ? `99px` : `63px`})` }}
          data-lenis-prevent>
          {menu?.map((item, index) => {
            const hasDropdown = item.subMenu && item.subMenu.length > 0;
            const allInnerLinks =
            item.subMenu?.flatMap((sub) =>
              sub.item?.map((i) => i.cta_link?.link || i.externalLink || "")
            ) || [];
            // Check if ANY link is active
            const isMenuActive = allInnerLinks.some((link) => link && isActive(link)) || false;
            const isMenuExpanded = mobileExpandedMenu === index;

            return (
              <div
                key={item.id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  {hasDropdown ? (
                    <button
                      onClick={() => toggleMobileMenu(index)}
                      className={`flex-1 text-left transition-all duration-200 py-3 ${  isMenuActive
                          ? "text-orange-500 font-medium"
                          : "text-gray-700"
                        }`}
                    >
                      <Typography variant="body-l">{item.menuTitle}</Typography>
                    </button>
                  ) : (
                    <Link
                      href={item.subMenu?.[0]?.item?.[0]?.cta_link?.link || item.subMenu?.[0]?.item?.[0]?.externalLink || "#"}
                      className={`flex-1 transition-all duration-200 py-3 ${isMenuActive
                          ? "text-orange-500 font-medium"
                          : "text-gray-700"
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Typography variant="body-l">{item.menuTitle}</Typography>
                    </Link>
                  )}
                  {hasDropdown && (
                    <button
                      onClick={() => toggleMobileMenu(index)}
                      className=" flex ml-2 hover:bg-gray-100 rounded-full transition-colors w-[40px] h-full p-3 relative"
                    >
                      <i className={clsx(" h-[14px] w-[14px] relative after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-full after:h-[2px] after:bg-orange-200 after:rounded-[2px] after:transition-all after:duration-200  before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:h-full before:w-[2px] before:bg-orange-200 before:rounded-[2px] before:transition-all before:duration-600 ", isMenuExpanded ? "before:rotate-90" : "before:rotate-0")}></i>
                    </button>
                  )}
                </div>

                {/* Mobile Dropdown - SubMenu Sections */}
                {hasDropdown && (
                  <div
                    ref={(el) => {
                      if (el) {
                        dropdownRefs.current.set(index, el);
                      } else {
                        dropdownRefs.current.delete(index);
                      }
                    }}
                    className="border-t border-gray-100 overflow-hidden pl-3"
                  >
                    {item.subMenu?.map((subMenuItem, subMenuIndex) => {
                      const subMenuId = subMenuItem.id ?? subMenuIndex;
                      const isSubMenuExpanded = mobileExpandedSubMenu === subMenuId;
                      const hasItems = subMenuItem.item && subMenuItem.item.length > 0;
                      const isFirstDropdown = index === 0;

                      // For first dropdown: use accordion, for others: show items directly
                      if (isFirstDropdown) {
                        return (
                          <div key={subMenuId} className="border-b border-gray-200 last:border-b-0">
                            {/* SubMenu Section Header */}
                            <button
                              onClick={() => toggleMobileSubMenu(subMenuId)}
                              className="w-full flex items-center justify-between pl-2 py-3 text-left hover:bg-gray-100 transition-colors"
                            >
                              <Typography variant="body-l" className="text-orange-200 font-medium">
                                {subMenuItem.title}
                              </Typography>
                              {hasItems && (
                                <i className={clsx(" h-[14px] w-[14px] relative after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-full after:h-[2px] after:bg-orange-200 after:rounded-[2px] after:transition-all after:duration-200  before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:h-full before:w-[2px] before:bg-orange-200 before:rounded-[2px] before:transition-all before:duration-600 ", isSubMenuExpanded ? "before:rotate-90" : "before:rotate-0")}></i>
                              )}
                            </button>

                            {/* SubMenu Items */}
                            {hasItems && (
                              <div
                                ref={(el) => {
                                  if (el) {
                                    subMenuRefs.current.set(subMenuId, el);
                                  } else {
                                    subMenuRefs.current.delete(subMenuId);
                                  }
                                }}
                                className="overflow-hidden pl-7"
                              >
                                {subMenuItem.item?.map((item) => {
                                  // Get href from cta_link.link first, then fall back to externalLink
                                  const href = item.cta_link?.link || item.externalLink;
                                  
                                  // Handle items without a valid link - show as disabled
                                  if (!href || href === "#") {
                                    return (
                                      <div
                                        key={item.id}
                                        className="block   py-2 text-sm text-gray-400 cursor-not-allowed"
                                      >
                                        {item.title}
                                      </div>
                                    );
                                  }

                                  const isExternal = href.startsWith("http://") || href.startsWith("https://");

                                  // For external links, use regular <a> tag, for internal use Next.js Link
                                  if (isExternal) {
                                    return (
                                      <a
                                        key={item.id}
                                        href={href}
                                        target="_self"
                                        rel="noopener noreferrer"
                                        className="block py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                      >
                                        {item.title}
                                      </a>
                                    );
                                  }

                                  return (
                                    <Link
                                      key={item.id}
                                      href={href}
                                      className={clsx("block   py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors", isActive(href) ? "text-orange-500 bg-orange-50 font-medium" : "text-gray-700")}
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      {item.title}
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      } else {
                        // For other dropdowns: show items directly without accordion
                        return (
                          <div key={subMenuId} className="border-b border-gray-200 last:border-b-0">
                            {/* SubMenu Section Header - Non-clickable */}
                            <div className="w-full flex items-center justify-between pl-2 py-3">
                              <Typography variant="body-l" className="text-orange-200 font-medium">
                                {subMenuItem.title}
                              </Typography>
                            </div>

                            {/* SubMenu Items - Always visible */}
                            {hasItems && (
                              <div className="pl-7">
                                {subMenuItem.item?.map((item) => {
                                  // Get href from cta_link.link first, then fall back to externalLink
                                  const href = item.cta_link?.link || item.externalLink;
                                  
                                  // Handle items without a valid link - show as disabled
                                  if (!href || href === "#") {
                                    return (
                                      <div
                                        key={item.id}
                                        className="block   py-2 text-sm text-gray-400 cursor-not-allowed"
                                      >
                                        {item.title}
                                      </div>
                                    );
                                  }

                                  const isExternal = href.startsWith("http://") || href.startsWith("https://");

                                  // For external links, use regular <a> tag, for internal use Next.js Link
                                  if (isExternal) {
                                    return (
                                      <a
                                        key={item.id}
                                        href={href}
                                        target="_self"
                                        rel="noopener noreferrer"
                                        className={clsx("block py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors", isActive(href) ? "text-orange-500 bg-orange-50 font-medium" : "text-gray-700")}
                                        onClick={() => setIsMenuOpen(false)}
                                      >
                                        {item.title}
                                      </a>
                                    );
                                  }

                                  return (
                                    <Link
                                      key={item.id}
                                      href={href}
                                      className={clsx("block   py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors", isActive(href) ? "text-orange-500 bg-orange-50 font-medium" : "text-gray-700")}
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      {item.title}
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div
        ref={searchBackdropRef}
        className="bg-black/50 fixed w-full h-full top-0 left-0 z-[10] opacity-0 pointer-events-none"
        style={{ pointerEvents: isSearchOpen ? 'auto' : 'none' }}
        onClick={() => {
          setIsSearchOpen(false);
          setsearchedValue("");
        }}
      />

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16 lg:h-18 block lg:hidden"></div>

      {/* Add CSS for menu item animations and header height variable */}
      <style jsx>{`
        :root {
          --header-height: ${pathname === "/" ? `90px` : `60px`};
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
