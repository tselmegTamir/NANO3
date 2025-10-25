"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

export default function InvestPage() {
  const { language } = useLanguage();
  const t = translations[language as "en" | "mn"];

  return (
    <div>
      <Header />

      {/* Hero Section with Product Info */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t.invest.title}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t.invest.description}
              </p>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-96 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
                  <img
                    src={"/assets/images/itgeltsel.png"}
                    alt={t.invest.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Title Section */}
            <div className="bg-[#0E7453] text-white text-center py-4 rounded-lg mb-8">
              <h2 className="text-2xl font-bold">{t.invest.productTitle}</h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Minimum Amount */}
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {t.invest.minAmount}
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {t.invest.investmentData.minAmount}
                </p>
              </div>

              {/* Maximum Amount */}
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {t.invest.maxAmount}
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {t.invest.investmentData.maxAmount}
                </p>
              </div>

              {/* Terms */}
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {t.invest.terms}
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {t.invest.investmentData.terms}
                </p>
              </div>

              {/* Duration */}
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {t.invest.duration}
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {t.invest.investmentData.duration}
                </p>
              </div>

              {/* Availability */}
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {t.invest.availability}
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {t.invest.investmentData.availability}
                </p>
              </div>

              {/* Advantages */}
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {t.invest.advantages}
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {t.invest.investmentData.advantages}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
