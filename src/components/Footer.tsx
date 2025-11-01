"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

interface FooterProps {
  primaryColor?: string;
}

const Footer: React.FC<FooterProps> = ({ primaryColor = "emerald" }) => {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Handle company page navigation
  const handleCompanyLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    // Check if we're already on the company page
    if (pathname === "/company") {
      e.preventDefault();

      // Extract hash from URL
      const hash = url.split("#")[1];

      // Direct element scrolling for all sections
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    // If not on company page, let the normal Link navigation happen
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            language === "en"
              ? "Message sent successfully!"
              : "Мессеж амжилттай илгээгдлээ!",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            language === "en"
              ? "Failed to send message. Please try again."
              : "Мессеж илгээхэд алдаа гарлаа. Дахин оролдоно уу.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          language === "en"
            ? "An error occurred. Please try again."
            : "Алдаа гарлаа. Дахин оролдоно уу.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const t = translations[language as "en" | "mn"];

  const footerSections = {
    services: {
      title: t.footer.home.title,
      links: [
        { name: t.footer.home.section1, url: "/#intro" },
        { name: t.footer.home.section2, url: "/#products" },
        { name: t.footer.home.section3, url: "/#companysection" },
        { name: t.footer.home.section4, url: "/#partners" },
      ],
    },
    products: {
      title: t.footer.product.title,
      links: [
        { name: t.footer.product.section1, url: "/products/consumer-loan" },
        { name: t.footer.product.section2, url: "/products/auto-loan" },
        { name: t.footer.product.section3, url: "/products/salary-loan" },
        { name: t.footer.product.section4, url: "/products/business-loan" },
      ],
    },
    company: {
      title: t.footer.company.title,
      links: [
        { name: t.footer.company.section1, url: "/company#hero" },
        { name: t.footer.company.section2, url: "/company#mission" },
        { name: t.footer.company.section3, url: "/company#corevalues" },
        { name: t.footer.company.section4, url: "/company#infosec" },
        { name: t.footer.company.section5, url: "/company#team" },
        {
          name: t.footer.company.section6,
          url: "/company#documents",
        },
      ],
    },
    app: {
      title: t.footer.app.title,
      links: [
        { name: t.footer.app.section1, url: "/application#screens" },
        {
          name: t.footer.app.section2,
          url: "/application#easier-loan-services",
        },
        {
          name: t.footer.app.section3,
          url: "/application#rewards-for-customers",
        },
        { name: t.footer.app.section4, url: "/application#download" },
      ],
    },
  };

  return (
    <footer className="bg-[#ffffff] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left Section - Company Info and Contact Form */}
          <div className="lg:col-span-4">
            {/* Company Logo and Description */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-gray-800 font-bold text-xl">
                  {translations[language as "en" | "mn"]?.footer?.title ||
                    "НАНО КАПИТАЛ"}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                {translations[language as "en" | "mn"]?.footer?.description ||
                  "Санхүүгийн сахилга батыг түгээнэ."}
              </p>
            </div>

            {/* Contact Form */}
            <div
              className={`${
                primaryColor === "teal" ? "bg-[#2DADB1]" : "bg-emerald-600"
              } p-8 rounded-lg backdrop-blur-sm`}
            >
              <h4 className="text-2xl text-white font-semibold mb-6">
                {t.footer.form.title}
              </h4>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t.footer.form.name}
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.footer.form.email}
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t.footer.form.message}
                  rows={4}
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
                ></textarea>

                {submitStatus.type && (
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      submitStatus.type === "success"
                        ? "bg-green-500/20 text-white border border-green-500/30"
                        : "bg-red-500/20 text-white border border-red-500/30"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${
                    primaryColor === "teal"
                      ? "bg-white hover:bg-[#86f5fc] text-gray-800 hover:text-white"
                      : "bg-[#D7FFE3] hover:bg-[#72D287]/80"
                  } p-4 rounded-lg font-semibold transition-colors ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting
                    ? language === "en"
                      ? "Sending..."
                      : "Илгээж байна..."
                    : t.footer.form.btn}
                </button>
              </form>
            </div>
          </div>

          {/* Right Section - Navigation Links */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Services Column */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">
                  {footerSections.services.title}
                </h3>
                <ul className="space-y-2">
                  {footerSections.services.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.url}
                        className={`text-gray-600 ${
                          primaryColor === "teal"
                            ? "hover:text-[#2DADB1]"
                            : "hover:text-emerald-600"
                        } transition-colors duration-200 text-sm`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Products Column */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">
                  {footerSections.products.title}
                </h3>
                <ul className="space-y-2">
                  {footerSections.products.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.url}
                        className={`text-gray-600 ${
                          primaryColor === "teal"
                            ? "hover:text-[#2DADB1]"
                            : "hover:text-emerald-600"
                        } transition-colors duration-200 text-sm`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">
                  {footerSections.company.title}
                </h3>
                <ul className="space-y-2">
                  {footerSections.company.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.url}
                        onClick={(e) => handleCompanyLinkClick(e, link.url)}
                        className={`text-gray-600 ${
                          primaryColor === "teal"
                            ? "hover:text-[#2DADB1]"
                            : "hover:text-emerald-600"
                        } transition-colors duration-200 text-sm`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* App Column */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">
                  {footerSections.app.title}
                </h3>
                <ul className="space-y-2">
                  {footerSections.app.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.url}
                        className={`text-gray-600 ${
                          primaryColor === "teal"
                            ? "hover:text-[#2DADB1]"
                            : "hover:text-emerald-600"
                        } transition-colors duration-200 text-sm`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Information and Social Media Section */}
            <div
              className={`mt-12 pt-8 border-t border-gray-200 ${
                primaryColor === "teal" ? "bg-[#2DADB1]" : "bg-emerald-600"
              } text-white px-6 py-4 rounded-lg`}
            >
              <div className="flex flex-col items-center justify-between space-y-4 md:space-y-8">
                {/* Contact Information */}
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
                  {/* Phone */}
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0 mt-[2px]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    <span className="text-sm font-medium">7722-4004</span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0 mt-[2px]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span className="text-sm font-medium">
                      info@nanocapital.mn
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex justify-center items-start space-x-2 mt-2">
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0 mt-[2px]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>

                    <div className="text-center">
                      <span className="text-[10px] sm:text-xs md:text-sm font-medium leading-snug block">
                        {t.footer.location[0]} <br />
                        {t.footer.location[1]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex flex-row items-center justify-between space-x-10">
                  {/* Facebook */}
                  <Link
                    href="https://www.facebook.com/NanoCptl"
                    target="_blank"
                    className={`w-8 h-8 text-white ${
                      primaryColor === "teal"
                        ? "hover:text-cyan-200"
                        : "hover:text-emerald-200"
                    } transition-colors duration-200`}
                  >
                    <svg
                      className="w-full h-full"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </Link>

                  {/* Instagram */}
                  <Link
                    href="https://www.instagram.com/accounts/login/?next=%2Fnan.ocapital%2F&source=omni_redirect"
                    target="_blank"
                    className={`w-8 h-8 text-white ${
                      primaryColor === "teal"
                        ? "hover:text-cyan-200"
                        : "hover:text-emerald-200"
                    } transition-colors duration-200`}
                  >
                    <svg
                      className="w-full h-full"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </Link>

                  {/* Twitter */}
                  <Link
                    href="https://x.com/elonmusk"
                    target="_blank"
                    className={`w-8 h-8 text-white ${
                      primaryColor === "teal"
                        ? "hover:text-cyan-200"
                        : "hover:text-emerald-200"
                    } transition-colors duration-200`}
                  >
                    <svg
                      className="w-full h-full"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </Link>

                  {/* YouTube */}
                  <Link
                    href="https://www.youtube.com/watch?v=-Lss1XNt03A&list=RD-Lss1XNt03A&start_radio=1"
                    target="_blank"
                    className={`w-8 h-8 text-white ${
                      primaryColor === "teal"
                        ? "hover:text-cyan-200"
                        : "hover:text-emerald-200"
                    } transition-colors duration-200`}
                  >
                    <svg
                      className="w-full h-full"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-500 text-sm">
            © Copyright 2025 powered by{" "}
            <Link
              href="https://yargaitech.com"
              target="_blank"
              className={`text-gray-700 ${
                primaryColor === "teal"
                  ? "hover:text-[#2DADB1]"
                  : "hover:text-emerald-600"
              } transition-colors`}
            >
              Yargai Tech
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
