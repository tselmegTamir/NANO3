"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isMobileProductDropdownOpen, setIsMobileProductDropdownOpen] =
    useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const productDropdownRef = useRef<HTMLDivElement>(null);
  const hideDropdownTimer = useRef<NodeJS.Timeout | null>(null);

  // Convert context language to your format
  const currentLanguage = language === "en" ? "en" : "mn";
  const currentLangCode = language === "en" ? "ENG" : "MNG";

  // Icon components for navigation
  const NavigationIcons = {
    home: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    product: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
        />
      </svg>
    ),
    application: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        />
      </svg>
    ),
    invest: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
    company: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
        />
      </svg>
    ),
  };

  // Product dropdown icons
  const ProductIcons = {
    consumer: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        />
      </svg>
    ),
    auto: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
        />
      </svg>
    ),
    salary: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
        />
      </svg>
    ),
    business: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
        />
      </svg>
    ),
  };

  // Product dropdown items
  const productDropdownItems = [
    {
      name: "Хэрэглээний зээл",
      href: "/products/consumer-loan",
      icon: "consumer",
    },
    {
      name: "Авто машин худалдан авах зээл",
      href: "/products/auto-loan",
      icon: "auto",
    },
    {
      name: "Цалингийн зээл",
      href: "/products/salary-loan",
      icon: "salary",
    },
    {
      name: "Бизнесийн зээл",
      href: "/products/business-loan",
      icon: "business",
    },
  ];

  const navigationItems = [
    {
      name: translations[currentLanguage].header.home,
      href: "/",
      icon: "home",
    },
    {
      name: translations[currentLanguage].header.product,
      href: "#", // Changed to # to prevent navigation
      icon: "product",
      hasDropdown: true, // Mark this item as having a dropdown
    },
    {
      name: translations[currentLanguage].header.application,
      href: "/application",
      icon: "application",
    },
    {
      name: translations[currentLanguage].header.invest,
      href: "/invest",
      icon: "invest",
    },
    {
      name: translations[currentLanguage].header.company,
      href: "/company",
      icon: "company",
    },
  ];

  const languages = [
    { code: "ENG", name: "English", flag: "/assets/images/eng.jpg" },
    { code: "MNG", name: "Монгол", flag: "/assets/images/mn.png" },
  ];

  const handleLanguageToggle = () => {
    toggleLanguage();
  };

  const handleProductHover = () => {
    // Clear any existing timer when hovering
    if (hideDropdownTimer.current) {
      clearTimeout(hideDropdownTimer.current);
      hideDropdownTimer.current = null;
    }
    setIsProductDropdownOpen(true);
  };

  const handleProductLeave = () => {
    // Add a delay before hiding the dropdown
    hideDropdownTimer.current = setTimeout(() => {
      setIsProductDropdownOpen(false);
    }, 300); // 300ms delay
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        productDropdownRef.current &&
        !productDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Clean up timer on unmount
      if (hideDropdownTimer.current) {
        clearTimeout(hideDropdownTimer.current);
      }
    };
  }, []);

  // Check if current page is active
  const isActivePage = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/assets/images/logo.png"
                alt="Нано Капитал"
                width={135}
                height={39}
                className="mt-0"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Glass Background */}
          <nav className="hidden md:flex items-center space-x-[2px] lg:space-x-6 bg-white/10 backdrop-blur-md px-6 py-2 rounded-lg border border-white/20">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={
                  item.icon === "product" ? handleProductHover : undefined
                }
                onMouseLeave={
                  item.icon === "product" ? handleProductLeave : undefined
                }
              >
                {item.hasDropdown ? (
                  // Non-clickable button for items with dropdown
                  <button
                    type="button"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-[10px] lg:text-sm font-medium transition-colors duration-200 ${
                      isProductDropdownOpen
                        ? "text-[#0E7453] bg-[#0E7453]/10 font-semibold"
                        : "text-gray-700 hover:text-[#0E7453] hover:bg-white/10"
                    }`}
                  >
                    {NavigationIcons[item.icon as keyof typeof NavigationIcons]}
                    <span>{item.name}</span>
                  </button>
                ) : (
                  // Regular link for other items
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-[10px] lg:text-sm font-medium transition-colors duration-200 ${
                      isActivePage(item.href)
                        ? "text-[#0E7453] bg-[#0E7453]/10 font-semibold"
                        : "text-gray-700 hover:text-[#0E7453] hover:bg-white/10"
                    }`}
                  >
                    {NavigationIcons[item.icon as keyof typeof NavigationIcons]}
                    <span>{item.name}</span>
                  </Link>
                )}

                {/* Product Dropdown */}
                {item.icon === "product" && isProductDropdownOpen && (
                  <div
                    ref={productDropdownRef}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-4xl bg-white/95 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-50"
                    onMouseEnter={() => {
                      // Cancel hide timer when hovering over dropdown
                      if (hideDropdownTimer.current) {
                        clearTimeout(hideDropdownTimer.current);
                        hideDropdownTimer.current = null;
                      }
                    }}
                    onMouseLeave={() => {
                      // Hide dropdown when leaving the dropdown area
                      hideDropdownTimer.current = setTimeout(() => {
                        setIsProductDropdownOpen(false);
                      }, 300);
                    }}
                  >
                    <div className="grid grid-cols-4 gap-4 p-6">
                      {productDropdownItems.map((product) => (
                        <Link
                          key={product.name}
                          href={product.href}
                          className="flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-[#0E7453]/10 transition-colors duration-200 group"
                        >
                          <div className="text-gray-600 group-hover:text-[#0E7453] transition-colors duration-200">
                            {
                              ProductIcons[
                                product.icon as keyof typeof ProductIcons
                              ]
                            }
                          </div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-[#0E7453] text-center transition-colors duration-200">
                            {product.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Language Toggle - Desktop Only */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLanguageToggle}
              className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-200"
              title={`Switch to ${language === "en" ? "Монгол" : "English"}`}
            >
              <Image
                src={
                  language === "en"
                    ? "/assets/images/eng.jpg"
                    : "/assets/images/mn.png"
                }
                alt={language === "en" ? "English" : "Mongolian"}
                width={24}
                height={16}
                className="rounded-sm object-cover"
              />
              <span className="text-[10px] lg:text-sm font-medium text-gray-700">
                {currentLangCode}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-white/20 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/20 backdrop-blur-md rounded-lg mt-2 border border-white/30">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    // Products with dropdown
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setIsMobileProductDropdownOpen(
                            !isMobileProductDropdownOpen
                          )
                        }
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-white/30 ${
                          isMobileProductDropdownOpen
                            ? "text-[#0E7453] bg-[#0E7453]/10 font-semibold"
                            : "text-gray-700 hover:text-[#0E7453]"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {
                            NavigationIcons[
                              item.icon as keyof typeof NavigationIcons
                            ]
                          }
                          <span>{item.name}</span>
                        </div>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isMobileProductDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Mobile Product Dropdown */}
                      {isMobileProductDropdownOpen && (
                        <div className="mt-2 ml-4 space-y-1 bg-white/10 rounded-lg p-2">
                          {productDropdownItems.map((product) => (
                            <Link
                              key={product.name}
                              href={product.href}
                              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-600 hover:text-[#0E7453] hover:bg-white/20"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsMobileProductDropdownOpen(false);
                              }}
                            >
                              {
                                ProductIcons[
                                  product.icon as keyof typeof ProductIcons
                                ]
                              }
                              <span>{product.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    // Regular navigation items
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-white/30 ${
                        isActivePage(item.href)
                          ? "text-[#0E7453] bg-[#0E7453]/10 font-semibold"
                          : "text-gray-700 hover:text-[#0E7453]"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {
                        NavigationIcons[
                          item.icon as keyof typeof NavigationIcons
                        ]
                      }
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Language Toggle */}
              <div className="border-t border-white/20 mt-3 pt-3">
                <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Language
                </div>
                <button
                  onClick={() => {
                    handleLanguageToggle();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-gray-700 hover:text-[#0E7453] hover:bg-white/30"
                >
                  <Image
                    src={
                      language === "en"
                        ? "/assets/images/eng.jpg"
                        : "/assets/images/mn.png"
                    }
                    alt={language === "en" ? "English" : "Mongolian"}
                    width={24}
                    height={16}
                    className="rounded-sm object-cover"
                  />
                  <span>{language === "en" ? "English" : "Монгол"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
