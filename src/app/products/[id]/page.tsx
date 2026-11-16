"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { productsData } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

// ---------------- Loan Calculator ----------------

// Practical upper loan amount per product (MNT). The auto loan is capped by a
// share of the car price rather than a fixed sum, so it gets a sensible cap.
const MAX_LOAN_AMOUNT: Record<string, number> = {
  "consumer-loan": 10_000_000,
  "salary-loan": 10_000_000,
  "auto-loan": 200_000_000,
  "business-loan": 300_000_000,
};

const extractNumbers = (s: string) =>
  (s.match(/\d+(?:\.\d+)?/g) || []).map(Number);

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

const formatMoney = (n: number) =>
  Math.round(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

// Derive slider limits from the product's own terms so the calculator always
// matches what is shown in the conditions tab.
function getCalcLimits(
  productId: string,
  conditions: { interestRate: string; duration: string }
) {
  const maxAmount = MAX_LOAN_AMOUNT[productId] ?? 10_000_000;
  const amountStep = maxAmount > 20_000_000 ? 1_000_000 : 100_000;
  const minAmount = amountStep === 100_000 ? 500_000 : 1_000_000;
  const defaultAmount = clamp(
    Math.round((maxAmount * 0.3) / amountStep) * amountStep,
    minAmount,
    maxAmount
  );

  const maxMonths = extractNumbers(conditions.duration)[0] || 60;
  const minMonths = 3;
  const defaultMonths = Math.min(12, maxMonths);

  const rates = extractNumbers(conditions.interestRate).filter((r) => r <= 10);
  const minRate = rates[0] ?? 2;
  let maxRate = rates[1] ?? minRate;
  if (maxRate <= minRate) maxRate = minRate + 1;

  return {
    minAmount,
    maxAmount,
    amountStep,
    defaultAmount,
    minMonths,
    maxMonths,
    defaultMonths,
    minRate,
    maxRate,
    defaultRate: minRate,
  };
}

// Editable number box: shows the formatted value, lets the user type freely,
// updates live while the typed value is in range and clamps on blur/Enter.
function NumberField({
  value,
  onChange,
  min,
  max,
  decimals = 0,
  suffix,
  label,
  widthClass,
}: {
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  decimals?: number;
  suffix: string;
  label: string;
  widthClass: string;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const display =
    draft ??
    value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const commit = () => {
    if (draft !== null) {
      const n = Number(draft);
      if (draft.trim() !== "" && !isNaN(n)) onChange(clamp(n, min, max));
    }
    setDraft(null);
  };

  return (
    <label className="flex items-baseline gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 cursor-text transition focus-within:border-[#0E7453] focus-within:ring-2 focus-within:ring-[#0E7453]/20">
      <input
        type="text"
        inputMode={decimals ? "decimal" : "numeric"}
        aria-label={label}
        value={display}
        onFocus={(e) => {
          const el = e.currentTarget;
          setDraft(String(value));
          requestAnimationFrame(() => el.select());
        }}
        onChange={(e) => {
          const raw = e.target.value.replace(
            decimals ? /[^\d.]/g : /[^\d]/g,
            ""
          );
          setDraft(raw);
          const n = Number(raw);
          if (raw !== "" && !isNaN(n) && n >= min && n <= max) onChange(n);
        }}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        className={`${widthClass} bg-transparent text-right text-lg font-semibold text-gray-900 tabular-nums outline-none`}
      />
      <span className="text-sm font-medium text-gray-500">{suffix}</span>
    </label>
  );
}

function CalcField({
  label,
  value,
  min,
  max,
  step,
  decimals = 0,
  suffix,
  widthClass,
  onChange,
  formatBound,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  decimals?: number;
  suffix: string;
  widthClass: string;
  onChange: (n: number) => void;
  formatBound: (n: number) => string;
}) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <span className="text-sm sm:text-base font-medium text-gray-700">
          {label}
        </span>
        <NumberField
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          decimals={decimals}
          suffix={suffix}
          label={label}
          widthClass={widthClass}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
        style={{ "--value": `${pct}%` } as React.CSSProperties}
      />
      <div className="mt-2 flex justify-between text-xs text-gray-400 tabular-nums">
        <span>{formatBound(min)}</span>
        <span>{formatBound(max)}</span>
      </div>
    </div>
  );
}

function LoanCalculator({
  productId,
  conditions,
}: {
  productId: string;
  conditions: { interestRate: string; duration: string };
}) {
  const { language } = useLanguage();
  const t = translations[language as "en" | "mn"];
  const c = t.products.calculator;
  const limits = getCalcLimits(productId, conditions);

  const [loanAmount, setLoanAmount] = useState(limits.defaultAmount);
  const [duration, setDuration] = useState(limits.defaultMonths);
  const [interestRate, setInterestRate] = useState(limits.defaultRate);
  const [calculationType, setCalculationType] = useState<
    "equal" | "decreasing"
  >("equal");

  // Interest rate is monthly, as quoted on the product terms.
  const calculatePayment = () => {
    const principal = loanAmount;
    const r = interestRate / 100;
    const n = Math.max(1, duration);

    if (calculationType === "equal") {
      const monthlyPayment =
        r === 0
          ? principal / n
          : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = monthlyPayment * n;
      return {
        monthlyPayment,
        totalPayment,
        totalInterest: totalPayment - principal,
      };
    }

    // Equal principal: interest is charged on the remaining balance, so the
    // first month is the largest payment.
    const principalPayment = principal / n;
    const totalInterest = principal * r * ((n + 1) / 2);
    return {
      monthlyPayment: principalPayment + principal * r,
      totalPayment: principal + totalInterest,
      totalInterest,
    };
  };

  const payment = calculatePayment();

  const toggleClass = (active: boolean) =>
    `px-3 sm:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
      active
        ? "bg-[#0E7453] text-white shadow-sm"
        : "text-gray-600 hover:text-gray-900"
    }`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Inputs */}
      <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 space-y-10">
        <CalcField
          label={c.loanAmount}
          value={loanAmount}
          min={limits.minAmount}
          max={limits.maxAmount}
          step={limits.amountStep}
          suffix="₮"
          widthClass="w-28 sm:w-32"
          onChange={setLoanAmount}
          formatBound={(n) => `${formatMoney(n)} ₮`}
        />
        <CalcField
          label={c.loanDuration}
          value={duration}
          min={limits.minMonths}
          max={limits.maxMonths}
          step={1}
          suffix={c.monthUnit}
          widthClass="w-10"
          onChange={setDuration}
          formatBound={(n) => `${n} ${c.monthUnit}`}
        />
        <CalcField
          label={c.interestRate}
          value={interestRate}
          min={limits.minRate}
          max={limits.maxRate}
          step={0.1}
          decimals={1}
          suffix="%"
          widthClass="w-12"
          onChange={setInterestRate}
          formatBound={(n) => `${n}%`}
        />
      </div>

      {/* Results */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col">
        <div className="grid grid-cols-2 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setCalculationType("equal")}
            className={toggleClass(calculationType === "equal")}
          >
            {c.equalPayment}
          </button>
          <button
            onClick={() => setCalculationType("decreasing")}
            className={toggleClass(calculationType === "decreasing")}
          >
            {c.decreasingPayment}
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm font-medium text-gray-500">
            {calculationType === "equal"
              ? c.monthlyPayment
              : c.firstMonthPayment}
          </p>
          <p className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-[#0E7453] tabular-nums">
            {formatMoney(payment.monthlyPayment)}
            <span className="ml-1.5 text-2xl sm:text-3xl">₮</span>
          </p>
        </div>

        <dl className="mt-8 border-t border-gray-100 divide-y divide-gray-100">
          <div className="flex items-center justify-between gap-4 py-3.5">
            <dt className="text-sm sm:text-base text-gray-600">
              {c.principal}
            </dt>
            <dd className="text-base sm:text-lg font-semibold text-gray-900 tabular-nums">
              {formatMoney(loanAmount)} ₮
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-3.5">
            <dt className="text-sm sm:text-base text-gray-600">
              {c.totalInterest}
            </dt>
            <dd className="text-base sm:text-lg font-semibold text-gray-900 tabular-nums">
              {formatMoney(payment.totalInterest)} ₮
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-3.5">
            <dt className="text-sm sm:text-base font-semibold text-gray-900">
              {c.totalPayment}
            </dt>
            <dd className="text-lg sm:text-xl font-bold text-gray-900 tabular-nums">
              {formatMoney(payment.totalPayment)} ₮
            </dd>
          </div>
        </dl>

        <p className="mt-auto pt-6 text-xs text-gray-400 text-center">
          {c.disclaimer}
        </p>
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

          <LoanCalculator
            key={productId}
            productId={productId}
            conditions={product.conditions}
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
