"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

export default function CompanyPage() {
  const { language } = useLanguage();
  const t = translations[language as "en" | "mn"];
  const [isStructureModalOpen, setIsStructureModalOpen] = useState(false);

  // Staff profiles data
  const staffMembers = [
    {
      id: 1,
      name: "Гүнэнжавын Цэвэлмаа",
      position: "Гүйцэтгэх захирал",
      image: "/assets/images/profile.png",
    },
    {
      id: 2,
      name: "Ганзоригийн Эрдэнийбаяр",
      position:
        "Гүйцэтгэх захирлах Түргэн зээлийн бизнесийн хэлтэс удирдсан захирал",
      image: "/assets/images/profile.png",
    },
    {
      id: 3,
      name: "Энхбишийн Уланбаяр",
      position:
        "Гүйцэтгэх захирлах зээлийн төлбөрийн банк харилцах хэлтэс захирал",
      image: "/assets/images/profile.png",
    },
    {
      id: 4,
      name: "Баламын Ерхэм",
      position:
        "Гүйцэтгэх захирлах сахам хөрөнгө судлал байгаль байгаа захирал",
      image: "/assets/images/profile.png",
    },
    {
      id: 5,
      name: "Сэржпийн Даүрэнбэк",
      position:
        "Гүйцэтгэх захирлах эрилган билгээн эх нөөц сургалт хөгжил захирал",
      image: "/assets/images/profile.png",
    },
    {
      id: 6,
      name: "Дөржкүүзээгийн Мөнхзул",
      position: "Лизинг хөрөнгөөр даалган захирал",
      image: "/assets/images/profile.png",
    },
    {
      id: 7,
      name: "Илин Абрамов",
      position: "Эрсдэл бүгдүүлдэн захирал",
      image: "/assets/images/profile.png",
    },
    {
      id: 8,
      name: "Энхбаярын Ундрван",
      position: "Захиалгат цөөрийн хэрэгцээ захирал",
      image: "/assets/images/profile.png",
    },
    {
      id: 9,
      name: "Ганзоригийн Зул",
      position: "Үйл ажиллагын хөрөөгч захирал",
      image: "/assets/images/profile.png",
    },
    {
      id: 10,
      name: "Хуралбаатарын Өнөрбат",
      position: "Нядалалын тэргэндэй шалгийн удирдсан захирал",
      image: "/assets/images/profile.png",
    },
    {
      id: 11,
      name: "Иннсүүжигчин Мөнхцэцэлэг",
      position: "Санхүүгийн аюулт дахь анн намлүүлт бүртгэмт захирал",
      image: "/assets/images/profile.png",
    },
    {
      id: 12,
      name: "Батчулуунн Биндрвяа",
      position: "Эрөнцөн Захирал",
      image: "/assets/images/profile.png",
    },
  ];

  return (
    <div>
      <Header />

      {/* Hero Section with Image Background */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/assets/images/companybg.png"
            alt="Company Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content Overlay - Left Side */}
        <div className="relative z-10 h-full flex items-center justify-start px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl ml-12 space-y-12">
            {/* Mission */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                {t.company.hero.mission.title}
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                {t.company.hero.mission.description}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                {t.company.hero.vision.title}
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                {t.company.hero.vision.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#0E7453] mb-8">
              {t.company.aboutTitle}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-5xl mx-auto">
              {t.company.aboutDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Company Values - Interactive Cards */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-[#0E7453] text-center mb-16">
            {t.company.valuesTitle}
          </h2>

          <div className="flex gap-4 h-[500px] items-end">
            {/* Card 1 - Харилцааны ур чадвар */}
            <div className="group relative flex-1 rounded-3xl overflow-hidden transition-all duration-500 ease-in-out hover:flex-[3] cursor-pointer h-full">
              <img
                src="/assets/images/hariltsaa.png"
                alt="Харилцааны ур чадвар"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-col">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {t.company.values[0].title}
                  </h3>
                  <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {t.company.values[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 - Аюулгүй байдал */}
            <div className="group relative flex-1 rounded-3xl overflow-hidden transition-all duration-500 ease-in-out hover:flex-[3] cursor-pointer h-full">
              <img
                src="/assets/images/sec.png"
                alt="Аюулгүй байдал"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-col">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {t.company.values[1].title}
                  </h3>
                  <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {t.company.values[1].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 - Хариуцлага */}
            <div className="group relative flex-1 rounded-3xl overflow-hidden transition-all duration-500 ease-in-out hover:flex-[3] cursor-pointer h-full">
              <img
                src="/assets/images/haruitslaga.png"
                alt="Хариуцлага"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-col">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {t.company.values[2].title}
                  </h3>
                  <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {t.company.values[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 - Бүтээлч байдал */}
            <div className="group relative flex-1 rounded-3xl overflow-hidden transition-all duration-500 ease-in-out hover:flex-[3] cursor-pointer h-full">
              <img
                src="/assets/images/creative.png"
                alt="Бүтээлч байдал"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-col">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {t.company.values[3].title}
                  </h3>
                  <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {t.company.values[3].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5 - Хамт олон */}
            <div className="group relative flex-1 rounded-3xl overflow-hidden transition-all duration-500 ease-in-out hover:flex-[3] cursor-pointer h-full">
              <img
                src="/assets/images/hamtolon.png"
                alt="Хамт олон"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-col">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {t.company.values[4].title}
                  </h3>
                  <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {t.company.values[4].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Security Policy Section */}
      <section id="infosec" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            {t.company.securityPolicyTitle}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Text Content */}
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t.company.securityPolicyIntro1}
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t.company.securityPolicyIntro2}
                </p>
              </div>

              <div className="space-y-4">
                {t.company.securityObjectives.map(
                  (
                    objective: { number: string; text: string },
                    index: number
                  ) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-[#0E7453] text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {objective.number}
                      </span>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        {objective.text}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl overflow-hidden shadow-2xl h-full">
                <img
                  src="/assets/images/secrule.png"
                  alt="Мэдээллийн аюулгүй байдал"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Profiles Section - Хамт олон */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              {t.company.teamTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t.company.teamDescription}
            </p>

            {/* Company Structure Button */}
            <button
              onClick={() => setIsStructureModalOpen(true)}
              className="inline-flex items-center px-8 py-4 bg-[#0E7453] text-white text-lg font-semibold rounded-xl hover:bg-[#0E7453]/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              {t.company.structureButton}
            </button>
          </div>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {staffMembers.map((member) => (
              <div
                key={member.id}
                className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden bg-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Structure Modal */}
      {isStructureModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsStructureModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full h-full max-w-[95vw] max-h-[95vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsStructureModalOpen(false)}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-[#0E7453] text-white rounded-full flex items-center justify-center hover:bg-[#0E7453]/90 transition-colors shadow-lg hover:scale-110 transform duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-8 h-full overflow-y-auto">
              {/* Modal Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#0E7453] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {t.company.structureModalTitle}
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0E7453]">
                      {t.company.structureModalSubtitle}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Organization Chart SVG - Full Screen */}
              <div className="flex items-center justify-center w-full h-[calc(100%-120px)]">
                <img
                  src="/assets/images/ORG-CHART.svg"
                  alt="Байгууллагын бүтэц"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Section - PDF Links */}
      <section id="documents" className="py-[100px] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.company.documentsTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.company.documentsDescription}
            </p>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Document 1 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-12 h-12 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.company.documents[0].title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t.company.documents[0].description}
                  </p>
                  <a
                    href="/PDF/Ёс-зүйн-дүрэм.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#0E7453] text-white text-sm font-medium rounded-lg hover:bg-[#0E7453]/90 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {t.company.downloadButton}
                  </a>
                </div>
              </div>
            </div>

            {/* Document 2 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-12 h-12 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.company.documents[1].title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t.company.documents[1].description}
                  </p>
                  <a
                    href="/PDF/МУТСТ-Дотоод-хяналтын-болон-эрсдэлийн-удирдлагын-хөтөлбөр.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#0E7453] text-white text-sm font-medium rounded-lg hover:bg-[#0E7453]/90 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {t.company.downloadButton}
                  </a>
                </div>
              </div>
            </div>

            {/* Document 3 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-12 h-12 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.company.documents[2].title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t.company.documents[2].description}
                  </p>
                  <a
                    href="/PDF/Мэдээллийн-ил-тод-байдал-тайлагналын-журам.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#0E7453] text-white text-sm font-medium rounded-lg hover:bg-[#0E7453]/90 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {t.company.downloadButton}
                  </a>
                </div>
              </div>
            </div>

            {/* Document 4 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-12 h-12 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.company.documents[3].title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t.company.documents[3].description}
                  </p>
                  <a
                    href="/PDF/ТУЗ-ийн-аудитын-хорооны-журам.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#0E7453] text-white text-sm font-medium rounded-lg hover:bg-[#0E7453]/90 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {t.company.downloadButton}
                  </a>
                </div>
              </div>
            </div>

            {/* Document 5 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-12 h-12 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.company.documents[4].title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t.company.documents[4].description}
                  </p>
                  <a
                    href="/PDF/ТУЗ-ийн-нэр-дэвшүүлэх-хорооны-журам.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#0E7453] text-white text-sm font-medium rounded-lg hover:bg-[#0E7453]/90 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {t.company.downloadButton}
                  </a>
                </div>
              </div>
            </div>

            {/* Document 6 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-12 h-12 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.company.documents[5].title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t.company.documents[5].description}
                  </p>
                  <a
                    href="/PDF/ТУЗ-ийн-цалин-урамшууллын-хорооны-журам.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#0E7453] text-white text-sm font-medium rounded-lg hover:bg-[#0E7453]/90 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {t.company.downloadButton}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="bg-[#0E7453]/10 rounded-xl p-6 border border-[#0E7453]/20">
              <div className="flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-[#0E7453]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {t.company.documentsWarningTitle}
              </h4>
              <p className="text-sm text-gray-600">
                {t.company.documentsWarningText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
