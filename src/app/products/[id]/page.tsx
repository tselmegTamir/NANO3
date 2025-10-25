"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { productsData } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

// Loan Calculator Component
function LoanCalculator() {
  const { language } = useLanguage();
  const t = translations[language as "en" | "mn"];

  const [loanAmount, setLoanAmount] = useState(2000000000);
  const [duration, setDuration] = useState(360);
  const [interestRate, setInterestRate] = useState(24.0);
  const [calculationType, setCalculationType] = useState<
    "equal" | "decreasing"
  >("equal");

  // Calculate monthly payment
  const calculatePayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = duration;

    if (calculationType === "equal") {
      // Equal monthly payment (annuity)
      const monthlyPayment =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      const totalPayment = monthlyPayment * numberOfPayments;
      const totalInterest = totalPayment - principal;

      return {
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
      };
    } else {
      // Decreasing payment
      const principalPayment = principal / numberOfPayments;
      const firstMonthInterest = principal * monthlyRate;
      const firstMonthPayment = principalPayment + firstMonthInterest;

      let totalPayment = 0;
      let remainingPrincipal = principal;

      for (let i = 0; i < numberOfPayments; i++) {
        const interest = remainingPrincipal * monthlyRate;
        totalPayment += principalPayment + interest;
        remainingPrincipal -= principalPayment;
      }

      const totalInterest = totalPayment - principal;

      return {
        monthlyPayment: firstMonthPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
      };
    }
  };

  const payment = calculatePayment();

  const formatNumber = (num: number | string) => {
    return Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Side - Input Controls */}
      <div className="bg-gray-50 rounded-2xl p-8">
        {/* Loan Amount */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-medium text-gray-600">
              {t.products.calculator.loanAmount}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={formatNumber(loanAmount)}
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, "");
                  if (!isNaN(Number(value))) {
                    setLoanAmount(Number(value));
                  }
                }}
                className="text-2xl font-bold text-gray-900 bg-transparent border-none outline-none text-right w-48"
              />
              <span className="text-2xl font-bold text-gray-900">₮</span>
              <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <input
            type="range"
            min="1000000"
            max="5000000000"
            step="1000000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
            style={
              {
                "--value": `${
                  ((loanAmount - 1000000) / (5000000000 - 1000000)) * 100
                }%`,
              } as React.CSSProperties
            }
          />
        </div>

        {/* Duration */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-medium text-gray-600">
              {t.products.calculator.loanDuration}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="text-2xl font-bold text-gray-900 bg-transparent border-none outline-none text-right w-24"
              />
              <span className="text-2xl font-bold text-gray-600">
                {t.products.calculator.monthUnit}
              </span>
              <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="600"
            step="1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
            style={
              {
                "--value": `${((duration - 1) / (600 - 1)) * 100}%`,
              } as React.CSSProperties
            }
          />
        </div>

        {/* Interest Rate */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-medium text-gray-600">
              {t.products.calculator.interestRate}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="text-2xl font-bold text-gray-900 bg-transparent border-none outline-none text-right w-24"
              />
              <span className="text-2xl font-bold text-gray-600">%</span>
              <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
            style={
              {
                "--value": `${((interestRate - 0) / (50 - 0)) * 100}%`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      {/* Right Side - Results */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        {/* Payment Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setCalculationType("equal")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                calculationType === "equal"
                  ? "bg-[#0E7453] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.products.calculator.equalPayment}
            </button>
            <button
              onClick={() => setCalculationType("decreasing")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                calculationType === "decreasing"
                  ? "bg-[#0E7453] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.products.calculator.decreasingPayment}
            </button>
          </div>
        </div>

        {/* Monthly Payment */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-600 mb-2">
            {t.products.calculator.monthlyPayment}
          </p>
          <p className="text-4xl font-bold text-gray-900">
            {formatNumber(payment.monthlyPayment)} ₮
          </p>
        </div>

        {/* Total Breakdown */}
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {formatNumber(payment.totalInterest)} ₮
            </p>
            <p className="text-sm text-gray-600">
              {t.products.calculator.totalInterest}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {formatNumber(payment.totalPayment)} ₮
            </p>
            <p className="text-sm text-gray-600">
              {t.products.calculator.totalPayment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductData {
  id: string;
  title: string;
  description: string;
  image: string;
  conditions: {
    amount: string;
    interestRate: string;
    duration: string;
    downPayment: string;
    collateral: string;
  };
  tabs: {
    conditions: boolean;
    purpose: boolean;
    requirements: boolean;
    documents: boolean;
  };
  purpose?: string[];
  requirements?: string[];
  documents: {
    citizens: string[];
    legalEntities?: string[];
  };
}

export default function ProductDetailPage() {
  const { language } = useLanguage();
  const t = translations[language as "en" | "mn"];
  const params = useParams();
  const productId = params.id as string;
  const [activeTab, setActiveTab] = useState(0);

  // Get product data based on language
  const product = productsData[language as "en" | "mn"][
    productId as keyof typeof productsData.en
  ] as ProductData;

  if (!product) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.products.notFound}
            </h1>
            <p className="text-gray-600">{t.products.notFoundDesc}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Build tabs array based on available data
  const availableTabs: { key: string; label: string }[] = [];
  if (product.tabs.conditions) {
    availableTabs.push({
      key: "conditions",
      label: t.products.tabs.conditions,
    });
  }
  if (product.tabs.purpose) {
    availableTabs.push({ key: "purpose", label: t.products.tabs.purpose });
  }
  if (product.tabs.requirements) {
    availableTabs.push({
      key: "requirements",
      label: t.products.tabs.requirements,
    });
  }
  if (product.tabs.documents) {
    availableTabs.push({ key: "documents", label: t.products.tabs.documents });
  }

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Hero Section with Product Info */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {product.title.toUpperCase()}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-96 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Conditions Section with Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            {t.products.sectionTitle}
          </h2>

          {/* Tabs Navigation */}
          <div className="flex justify-center mb-12 overflow-x-auto">
            <div className="inline-flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
              {availableTabs.map((tab, index) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === index
                      ? "bg-[#0E7453] text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Conditions Tab */}
            {availableTabs[activeTab]?.key === "conditions" && (
              <div>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {/* Amount */}
                  <div className="bg-gray-50 rounded-2xl p-6 text-center">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      {t.products.conditions.amount}
                    </h3>
                    <p
                      className={`font-bold text-gray-900 ${
                        product.conditions.amount.split(/\s+/).length < 5
                          ? "text-3xl"
                          : "text-2xl"
                      }`}
                    >
                      {product.conditions.amount}
                    </p>
                  </div>

                  {/* Interest Rate */}
                  <div className="bg-gray-50 rounded-2xl p-6 text-center">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      {t.products.conditions.interestRate}
                    </h3>
                    <p
                      className={`font-bold text-gray-900 ${
                        product.conditions.interestRate.split(/\s+/).length < 5
                          ? "text-3xl"
                          : "text-2xl"
                      }`}
                    >
                      {product.conditions.interestRate}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="bg-gray-50 rounded-2xl p-6 text-center">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      {t.products.conditions.duration}
                    </h3>
                    <p
                      className={`font-bold text-gray-900 ${
                        product.conditions.duration.split(/\s+/).length < 5
                          ? "text-3xl"
                          : "text-2xl"
                      }`}
                    >
                      {product.conditions.duration}
                    </p>
                  </div>

                  {/* Down Payment */}
                  {product.conditions.downPayment && (
                    <div className="bg-gray-50 rounded-2xl p-6 text-center">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        {t.products.conditions.downPayment}
                      </h3>
                      <p
                        className={`font-bold text-gray-900 ${
                          product.conditions.downPayment.split(/\s+/).length < 5
                            ? "text-3xl"
                            : "text-2xl"
                        }`}
                      >
                        {product.conditions.downPayment}
                      </p>
                    </div>
                  )}

                  {/* Collateral */}
                  <div className="bg-gray-50 rounded-2xl p-6 text-center md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      {t.products.conditions.collateral}
                    </h3>
                    <p
                      className={`font-bold text-gray-900 ${
                        product.conditions.collateral.split(/\s+/).length < 5
                          ? "text-3xl"
                          : "text-2xl"
                      }`}
                    >
                      {product.conditions.collateral}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Purpose Tab */}
            {availableTabs[activeTab]?.key === "purpose" && product.purpose && (
              <div className="prose max-w-none">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t.products.purposeTitle}
                </h3>
                <ul className="space-y-4 text-gray-700">
                  {product.purpose.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#0E7453] mr-3 mt-1">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements Tab */}
            {availableTabs[activeTab]?.key === "requirements" &&
              product.requirements && (
                <div className="prose max-w-none">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t.products.requirementsTitle}
                  </h3>
                  <ul className="space-y-4 text-gray-700">
                    {product.requirements.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#0E7453] mr-3 mt-1">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Documents Tab */}
            {availableTabs[activeTab]?.key === "documents" && (
              <div className="prose max-w-none">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t.products.citizensTitle}
                </h3>
                <ul className="space-y-4 text-gray-700 mb-12">
                  {product.documents.citizens.map(
                    (item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#0E7453] mr-3 mt-1">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    )
                  )}
                </ul>

                {product.documents.legalEntities && (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      {t.products.legalEntitiesTitle}
                    </h3>
                    <ul className="space-y-4 text-gray-700">
                      {product.documents.legalEntities.map(
                        (item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-[#0E7453] mr-3 mt-1">•</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Loan Calculator Section */}
      <section className="py-16 bg-white mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            {t.products.calculatorTitle}
          </h2>

          <LoanCalculator />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
