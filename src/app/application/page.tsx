"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

export default function ApplicationPage() {
  const { language } = useLanguage();
  const t = translations[language as "en" | "mn"];
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  const rightIllustrationRef = useRef<HTMLDivElement>(null);
  const leftIllustrationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Right illustration animation
      if (rightIllustrationRef.current) {
        const rect = rightIllustrationRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;

        // Calculate progress (0 to 1)
        const scrollProgress =
          (windowHeight - rect.top) / (windowHeight + sectionHeight);

        // Fade in from 30% to 50%, fade out from 80% to 100%
        let opacity = 0;
        if (scrollProgress >= 0.3 && scrollProgress <= 0.5) {
          opacity = (scrollProgress - 0.3) / 0.2; // 0 to 1
        } else if (scrollProgress > 0.5 && scrollProgress < 0.8) {
          opacity = 1;
        } else if (scrollProgress >= 0.8 && scrollProgress <= 1) {
          opacity = 1 - (scrollProgress - 0.8) / 0.2; // 1 to 0
        }

        const img = rightIllustrationRef.current.querySelector("img");
        if (img) {
          (img as HTMLElement).style.opacity = opacity.toString();
        }
      }

      // Left illustration animation
      if (leftIllustrationRef.current) {
        const rect = leftIllustrationRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;

        const scrollProgress =
          (windowHeight - rect.top) / (windowHeight + sectionHeight);

        let opacity = 0;
        if (scrollProgress >= 0.3 && scrollProgress <= 0.5) {
          opacity = (scrollProgress - 0.3) / 0.2;
        } else if (scrollProgress > 0.5 && scrollProgress < 0.8) {
          opacity = 1;
        } else if (scrollProgress >= 0.8 && scrollProgress <= 1) {
          opacity = 1 - (scrollProgress - 0.8) / 0.2;
        }

        const img = leftIllustrationRef.current.querySelector("img");
        if (img) {
          (img as HTMLElement).style.opacity = opacity.toString();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Calculate adjacent slide indices with wrapping
  const prevSlideIndex = (currentSlide - 1 + totalSlides) % totalSlides;
  const nextSlideIndex = (currentSlide + 1) % totalSlides;

  return (
    <div>
      <Header />

      {/* Hero Section with App Slider */}
      <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="relative z-10 pt-32 pb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t.application.heroTitle}
          </h1>
          <p className="text-xl text-gray-600">{t.application.heroSubtitle}</p>
        </div>

        {/* App Slider Container */}
        <div className="relative z-10 flex items-center justify-center h-[calc(100%-250px)] overflow-hidden">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-8 md:left-24 z-20 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 bg-white/90 hover:bg-white hover:scale-110 group"
          >
            <svg
              className="w-6 h-6 transition-colors text-gray-800 group-hover:text-[#0E7453]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Multiple Screens Container */}
          <div className="flex items-center justify-center gap-4 md:gap-6">
            {/* Left Adjacent Screen (Smaller) */}
            <div className="relative w-[200px] h-[400px] opacity-50 transition-all duration-500">
              <div className="relative w-full h-full overflow-hidden rounded-[2rem]">
                <img
                  src={`/assets/images/screen${prevSlideIndex + 1}.jpg`}
                  alt={`App Screen ${prevSlideIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Center Main Screen (Larger) */}
            <div className="relative w-[320px] h-[650px] flex-shrink-0">
              <div className="absolute inset-0 overflow-hidden rounded-[3rem]">
                <img
                  src={`/assets/images/screen${currentSlide + 1}.jpg`}
                  alt={`App Screen ${currentSlide + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* iPhone Border Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <img
                  src="/assets/images/iphoneborderrr.png"
                  alt="iPhone Frame"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Right Adjacent Screen (Smaller) */}
            <div className="relative w-[200px] h-[400px] opacity-50 transition-all duration-500">
              <div className="relative w-full h-full overflow-hidden rounded-[2rem]">
                <img
                  src={`/assets/images/screen${nextSlideIndex + 1}.jpg`}
                  alt={`App Screen ${nextSlideIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-8 md:right-24 z-20 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 bg-white/90 hover:bg-white hover:scale-110 group"
          >
            <svg
              className="w-6 h-6 transition-colors text-gray-800 group-hover:text-[#0E7453]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="relative z-10 flex justify-center gap-3 pb-12">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-[#2DADB1]"
                  : "w-2 bg-gray-400 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Digital Solutions Section - Right Layout */}
      <section
        ref={rightIllustrationRef}
        className="py-24 bg-gray-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                {t.application.digitalSolutionsTitle}
              </h2>

              <div className="space-y-6">
                {/* Feature 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-teal-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t.application.feature1Title}
                    </h3>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t.application.feature2Title}
                    </h3>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t.application.feature3Title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:order-last">
              <img
                src="/assets/images/right.png"
                alt="Digital Solutions"
                className="w-full h-auto transition-opacity duration-700 ease-out"
                style={{ opacity: 0 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting Services Section - Left Layout */}
      <section
        ref={leftIllustrationRef}
        className="py-24 bg-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="relative">
              <img
                src="/assets/images/left.png"
                alt="Troubleshooting Services"
                className="w-full h-auto transition-opacity duration-700 ease-out"
                style={{ opacity: 0 }}
              />
            </div>

            {/* Right Content */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                {t.application.rewardsTitle}
              </h2>

              <div className="space-y-6">
                {/* Feature 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t.application.reward1Title}
                    </h3>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t.application.reward2Title}
                    </h3>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-teal-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t.application.reward3Title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-24 bg-[#2DADB1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.application.downloadTitle}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t.application.downloadSubtitle}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
            {/* QR Code */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="bg-white p-4 rounded-2xl mb-6">
                <img
                  src="/assets/images/worksqr.png"
                  alt="Download QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
              <p className="text-center text-gray-700 font-medium">
                {t.application.qrCodeText}
              </p>
              <p className="text-center text-sm text-gray-500 mt-2 whitespace-pre-line">
                {t.application.qrCodeSubtext}
              </p>
            </div>

            {/* Store Buttons */}
            <div className="flex flex-col gap-6">
              <div className="text-center lg:text-left mb-4">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t.application.storeTitle}
                </h3>
                <p className="text-white/80">{t.application.storeSubtitle}</p>
              </div>

              {/* App Store Button */}
              <a
                href="https://apps.apple.com/mn/app/nano-capital/id1565896414"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-900 text-white rounded-2xl px-8 py-4 flex items-center gap-4 transition-all duration-300 hover:scale-105 shadow-xl group"
              >
                <svg
                  className="w-12 h-12 group-hover:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <p className="text-xs opacity-80">
                    {t.application.appStoreDownload}
                  </p>
                  <p className="text-xl font-semibold">
                    {t.application.appStoreName}
                  </p>
                </div>
              </a>

              {/* Play Store Button */}
              <a
                href="https://play.google.com/store/apps/details?id=mn.everestsolution.nanocapital&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-900 text-white rounded-2xl px-8 py-4 flex items-center gap-4 transition-all duration-300 hover:scale-105 shadow-xl group"
              >
                <svg
                  className="w-12 h-12 group-hover:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <p className="text-xs opacity-80">
                    {t.application.playStoreDownload}
                  </p>
                  <p className="text-xl font-semibold">
                    {t.application.playStoreName}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer primaryColor="teal" />
    </div>
  );
}
