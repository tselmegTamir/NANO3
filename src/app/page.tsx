"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

export default function HomePage() {
  const { language } = useLanguage();
  const t = translations[language as "en" | "mn"];

  // Add refs for sections
  const heroSectionRef = useRef<HTMLElement>(null);
  const productsSectionRef = useRef<HTMLElement>(null);
  const companySectionRef = useRef<HTMLElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [productsInView, setProductsInView] = useState(false);
  const [partnersApproaching, setPartnersApproaching] = useState(false);
  const [animationTriggers, setAnimationTriggers] = useState({
    bgStart: 2600,
    contentStart: 3600,
  });
  const [cardDimensions, setCardDimensions] = useState({
    cardSize: 480, // 1.5 * x (where x = 320)
    gap: 320, // x value
  });
  const [scaleFactor, setScaleFactor] = useState(1); // Track display scale

  const slides = t.home.slides;

  // Calculate dynamic animation triggers and card dimensions based on section heights
  useEffect(() => {
    const calculateTriggers = () => {
      // Get actual rendered heights of sections
      const heroHeight = heroSectionRef.current?.offsetHeight || 0;
      const productsHeight = productsSectionRef.current?.offsetHeight || 0;

      // Calculate scale factor based on viewport height
      // Base hero height at 100% scale is ~1000px
      const baseViewportHeight = 500;
      const currentScaleFactor = heroHeight / baseViewportHeight;
      setScaleFactor(currentScaleFactor);

      console.log("Hero Section Height:", heroHeight);
      console.log("Products Section Height:", productsHeight);
      console.log("Scale Factor:", currentScaleFactor);

      // Calculate card dimensions based on products section height
      // 2.5 * cardSize = 40% of products section height
      // cardSize = (0.4 * productsHeight) / 2.5
      const cardSize = (0.4 * productsHeight) / 2.5;
      const gap = cardSize / 1.5; // Since cardSize = 1.5 * gap

      setCardDimensions({
        cardSize: Math.round(cardSize),
        gap: Math.round(gap),
      });

      console.log("Card Size:", Math.round(cardSize));
      console.log("Gap:", Math.round(gap));

      // Calculate trigger points based on actual section heights
      const bgStart = heroHeight + productsHeight - 1000;
      const contentStart = heroHeight + productsHeight - 300;

      setAnimationTriggers({
        bgStart,
        contentStart,
      });
    };

    // Calculate after DOM is ready
    calculateTriggers();
    window.addEventListener("resize", calculateTriggers);

    return () => window.removeEventListener("resize", calculateTriggers);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  // Track scroll position for products section animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);

      // Check if products section is in view
      const productsSection = document.getElementById("products");
      if (productsSection) {
        const rect = productsSection.getBoundingClientRect();
        // Show text when products section starts appearing and hide when it's completely passed
        const isInView =
          rect.top <= window.innerHeight * 0.5 &&
          rect.bottom > window.innerHeight * 0.6;
        setProductsInView(isInView);
      }

      // Check if partners section is approaching
      const partnersSection = document.getElementById("partners");
      if (partnersSection) {
        const rect = partnersSection.getBoundingClientRect();
        // Hide animated background when partners section is about to appear
        const approaching = rect.top <= window.innerHeight;
        setPartnersApproaching(approaching);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  return (
    <div>
      <Header />

      {/* Hero Section with Image Slider */}
      <section
        ref={heroSectionRef}
        id="intro"
        className="relative h-screen overflow-hidden"
      >
        {/* Background Images */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.bgImage}
                alt={`Hero Background ${slide.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`${
                  index === currentSlide
                    ? "opacity-100"
                    : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
              >
                <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
                  {slide.subtitle}
                </p>
                <button>
                  <Link
                    href={slide.buttonLink}
                    className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-300 text-lg"
                  >
                    {slide.buttonText}
                  </Link>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentSlide
                    ? "bg-white/80"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Desktop */}
        <button
          onClick={prevSlide}
          className="hidden md:block absolute left-8 top-1/2 transform -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors duration-300"
        >
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:block absolute right-8 top-1/2 transform -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors duration-300"
        >
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Navigation Arrows - Mobile (Adjacent to dots) */}
        <div className="md:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-6">
          <button
            onClick={prevSlide}
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentSlide
                    ? "bg-white/80"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              ></button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Products Section with Scroll-Based Text Animation */}
      <section
        ref={productsSectionRef}
        id="products"
        className="relative min-h-[300vh] lg:min-h-[300vh] bg-gradient-to-b from-[#0C6247] via-[#33B87C] to-[#0E7453]"
      >
        {/* Fixed Background Text - Only show when products section is in view - Desktop only */}
        <div
          className="hidden lg:flex fixed inset-0 items-center justify-center pointer-events-none"
          style={{
            opacity: productsInView ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            zIndex: 0,
          }}
        >
          <div
            className="max-w-[1600px] text-center transition-all duration-500 ease-out"
            style={{
              // opacity: Math.max(0.1, Math.min(1, 1 - (scrollY - 800) / 800)),
              transform: `translateY(${Math.min(
                0,
                (scrollY - 800) * 0.3
              )}px) scale(${Math.max(0.8, 1 - (scrollY - 800) / 2000)})`,
            }}
          >
            <h3 className="text-3xl lg:text-6xl font-bold text-white mb-6">
              {t.home.productText}
            </h3>
          </div>
        </div>

        {/* Mobile & Tablet: Column Layout */}
        <div className="lg:hidden relative py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile & Tablet Title */}
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              {t.home.productText}
            </h3>

            {/* Product Cards Column */}
            <div className="flex flex-col space-y-6">
              <ProductCard
                image={t.home.productCards[0].image}
                title={t.home.productCards[0].title}
                description={t.home.productCards[0].description}
                url={t.home.productCards[0].url}
              />
              <ProductCard
                image={t.home.productCards[1].image}
                title={t.home.productCards[1].title}
                description={t.home.productCards[1].description}
                url={t.home.productCards[1].url}
              />
              <ProductCard
                image={t.home.productCards[2].image}
                title={t.home.productCards[2].title}
                description={t.home.productCards[2].description}
                url={t.home.productCards[2].url}
              />
              <ProductCard
                image={t.home.productCards[3].image}
                title={t.home.productCards[3].title}
                description={t.home.productCards[3].description}
                url={t.home.productCards[3].url}
              />
            </div>
          </div>
        </div>

        {/* Desktop: Scrollable Product Cards Container */}
        <div
          className="hidden lg:block relative pt-[100vh]"
          style={{ zIndex: 10 }}
        >
          <div className="relative min-h-[200vh] max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Product Card 1 - Top Left */}
            <ProductCard
              image={t.home.productCards[0].image}
              title={t.home.productCards[0].title}
              description={t.home.productCards[0].description}
              url={t.home.productCards[0].url}
              cardSize={cardDimensions.cardSize}
              style={{
                position: "absolute",
                top: 0,
                left: `${cardDimensions.gap}px`,
                width: `${cardDimensions.cardSize}px`,
                height: `${cardDimensions.cardSize}px`,
              }}
            />

            {/* Product Card 2 - Top Right (offset down by 1/10 of card size) */}
            <ProductCard
              image={t.home.productCards[1].image}
              title={t.home.productCards[1].title}
              description={t.home.productCards[1].description}
              url={t.home.productCards[1].url}
              cardSize={cardDimensions.cardSize}
              style={{
                position: "absolute",
                top: `${cardDimensions.cardSize * 0.1}px`,
                right: `${cardDimensions.gap}px`,
                width: `${cardDimensions.cardSize}px`,
                height: `${cardDimensions.cardSize}px`,
              }}
            />

            {/* Product Card 3 - Bottom Left (1.3 * gap from left) */}
            <ProductCard
              image={t.home.productCards[2].image}
              title={t.home.productCards[2].title}
              description={t.home.productCards[2].description}
              url={t.home.productCards[2].url}
              cardSize={cardDimensions.cardSize}
              style={{
                position: "absolute",
                top: `${cardDimensions.cardSize * 1.5}px`,
                left: `${cardDimensions.gap * 1.1}px`,
                width: `${cardDimensions.cardSize}px`,
                height: `${cardDimensions.cardSize}px`,
              }}
            />

            {/* Product Card 4 - Bottom Right (1.3 * gap from right, offset down by 2/10 of card size) */}
            <ProductCard
              image={t.home.productCards[3].image}
              title={t.home.productCards[3].title}
              description={t.home.productCards[3].description}
              url={t.home.productCards[3].url}
              cardSize={cardDimensions.cardSize}
              style={{
                position: "absolute",
                top: `${
                  cardDimensions.cardSize * 1.5 + cardDimensions.cardSize * 0.2
                }px`,
                right: `${cardDimensions.gap * 1.1}px`,
                width: `${cardDimensions.cardSize}px`,
                height: `${cardDimensions.cardSize}px`,
              }}
            />

            <div className="h-[50vh]"></div>
          </div>
        </div>
      </section>

      {/* Animated Background Section - Only render when scrollY > bgStart */}
      {scrollY > animationTriggers.bgStart ? (
        <section
          ref={companySectionRef}
          id="companysection"
          className="relative min-h-[200vh] lg:min-h-[200vh] overflow-hidden"
        >
          {/* Animated Background Image - Desktop */}
          <div
            className="hidden lg:block fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-cover bg-center bg-no-repeat transition-all duration-500 ease-out pointer-events-none"
            style={{
              backgroundImage: "url(/assets/images/companybggg.png)",
              width: `${Math.min(
                100,
                Math.max(20, (scrollY - animationTriggers.bgStart) / 10)
              )}vw`,
              height: `${Math.min(
                100,
                Math.max(30, (scrollY - animationTriggers.bgStart) / 8)
              )}vh`,
              opacity: partnersApproaching
                ? 0
                : Math.min(1, (scrollY - animationTriggers.bgStart) / 400),
            }}
          />

          {/* Animated Background Image - Mobile & Tablet */}
          <div
            className="lg:hidden fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-cover bg-center bg-no-repeat transition-all duration-500 ease-out pointer-events-none"
            style={{
              backgroundImage: "url(/assets/images/mobilebg2.png)",
              width: `${Math.min(
                100,
                Math.max(20, (scrollY - animationTriggers.bgStart) / 10)
              )}vw`,
              height: `${Math.min(
                100,
                Math.max(30, (scrollY - animationTriggers.bgStart) / 8)
              )}vh`,
              opacity: partnersApproaching
                ? 0
                : Math.min(1, (scrollY - animationTriggers.bgStart) / 400),
            }}
          />

          {/* Dark overlay for text contrast */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity duration-500 ease-out pointer-events-none"
            style={{
              opacity: partnersApproaching
                ? 0
                : scrollY > animationTriggers.contentStart
                ? Math.min(
                    0.6,
                    (scrollY - animationTriggers.contentStart) / 800
                  )
                : 0,
            }}
          />

          {/* Content Overlay - Desktop */}
          <div
            className="hidden lg:flex fixed inset-0 items-center z-10 pointer-events-none"
            style={{
              opacity: partnersApproaching
                ? 0
                : Math.max(
                    0,
                    Math.min(
                      1,
                      (scrollY - animationTriggers.contentStart) / 800
                    )
                  ),
              justifyContent: "flex-end",
              paddingRight: "5vw", // 5% from the right edge
            }}
          >
            <div
              className="text-left text-white px-8 max-w-2xl"
              style={{
                pointerEvents: partnersApproaching ? "none" : "auto",
                marginRight: "3vw", // Additional margin to ensure past middle
              }}
            >
              <h2
                className="font-bold mb-8 tracking-wide"
                style={{
                  fontSize: `${Math.max(2, 3.5 / scaleFactor)}rem`,
                }}
              >
                {t.home.companyTitle}
              </h2>
              <p
                className="mb-8 leading-relaxed"
                style={{
                  fontSize: `${Math.max(1, 1.25 / scaleFactor)}rem`,
                }}
              >
                {t.home.companyText}
              </p>

              <Link
                href="/company"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105"
                style={{
                  fontSize: `${Math.max(0.9, 1.125 / scaleFactor)}rem`,
                  padding: `${Math.max(0.75, 1 / scaleFactor)}rem ${Math.max(
                    1.5,
                    2 / scaleFactor
                  )}rem`,
                }}
              >
                {t.home.learnMore} →{" "}
              </Link>
            </div>
          </div>

          {/* Content Overlay - Mobile & Tablet */}
          <div
            className="lg:hidden fixed inset-0 flex items-center justify-center px-6 z-10 pointer-events-none"
            style={{
              opacity: partnersApproaching
                ? 0
                : Math.max(
                    0,
                    Math.min(
                      1,
                      (scrollY - animationTriggers.contentStart) / 800
                    )
                  ),
            }}
          >
            <div
              className="text-center text-white max-w-lg"
              style={{
                pointerEvents: partnersApproaching ? "none" : "auto",
              }}
            >
              <h2
                className="font-bold mb-4 tracking-wide"
                style={{
                  fontSize: `${Math.max(1.25, 1.5 / scaleFactor)}rem`,
                }}
              >
                {t.home.companyTitle}
              </h2>
              <p
                className="mb-6 leading-relaxed"
                style={{
                  fontSize: `${Math.max(0.875, 0.875 / scaleFactor)}rem`,
                }}
              >
                {t.home.companyText}
              </p>

              <Link
                href="/company"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105"
                style={{
                  fontSize: `${Math.max(0.75, 0.875 / scaleFactor)}rem`,
                  padding: `${Math.max(0.5, 0.75 / scaleFactor)}rem ${Math.max(
                    1,
                    1.5 / scaleFactor
                  )}rem`,
                }}
              >
                {t.home.learnMore} →{" "}
              </Link>
            </div>
          </div>

          {/* Scroll indicator to show section height */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none" />
        </section>
      ) : null}

      {/* Partner Companies Section */}
      <section id="partners" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            {t.home.partnersTitle}
          </h2>

          {/* Animated Logo Marquee */}
          <div className="overflow-hidden relative">
            <div className="flex animate-scroll whitespace-nowrap">
              {/* First set of logos */}
              <div className="flex items-center justify-center min-w-0 shrink-0">
                <img
                  src="/assets/images/mobi.png"
                  alt="Mobi"
                  className="h-16 w-auto mx-12 object-contain   hover:grayscale-0 transition-all duration-300"
                />
                <img
                  src="/assets/images/bodi.png"
                  alt="Bodi"
                  className="h-16 w-auto mx-12 object-contain grayscale-0 hover:grayscale-0 transition-all duration-300"
                />
                <img
                  src="/assets/images/callpro.png"
                  alt="CallPro"
                  className="h-16 w-auto mx-12 object-contain grayscale-0 hover:grayscale-0 transition-all duration-300"
                />
                <img
                  src="/assets/images/interworks.png"
                  alt="Interworks"
                  className="h-16 w-auto mx-12 object-contain grayscale-0 hover:grayscale-0 transition-all duration-300"
                />
                <img
                  src="/assets/images/frc.png"
                  alt="FRC"
                  className="h-16 w-auto mx-12 object-contain grayscale-0 hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex items-center justify-center min-w-0 shrink-0">
                <img
                  src="/assets/images/mobi.png"
                  alt="Mobi"
                  className="h-16 w-auto mx-12 object-contain grayscale-0 hover:grayscale-0 transition-all duration-300"
                />
                <img
                  src="/assets/images/bodi.png"
                  alt="Bodi"
                  className="h-16 w-auto mx-12 object-contain grayscale-0 hover:grayscale-0 transition-all duration-300"
                />
                <img
                  src="/assets/images/callpro.png"
                  alt="CallPro"
                  className="h-16 w-auto mx-12 object-contain grayscale-0 hover:grayscale-0 transition-all duration-300"
                />
                <img
                  src="/assets/images/interworks.png"
                  alt="Interworks"
                  className="h-16 w-auto mx-12 object-contain grayscale-0 hover:grayscale-0 transition-all duration-300"
                />
                <img
                  src="/assets/images/frc.png"
                  alt="FRC"
                  className="h-16 w-auto mx-12 object-contain grayscale-0 hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
