import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  url: string;
  alignment?: "left" | "right";
  style?: React.CSSProperties;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  url,
  alignment = "left",
  style,
}) => {
  const { language } = useLanguage();
  const t = translations[language as "en" | "mn"];

  return (
    <div
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 w-full border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105"
      style={style}
    >
      <div className="mb-9">
        <div className="w-full h-72 bg-white/20 rounded-2xl mb-6 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <span className="inline-block px-5 py-2 bg-green-500 text-white text-base font-medium rounded-full mb-6">
          {description}
        </span>
      </div>
      <h3 className="text-3xl font-bold text-white mb-6">{title}</h3>
      <Link
        href={url}
        className="text-white/80 hover:text-white flex items-center space-x-3 group text-lg"
      >
        <span>{t.home.learnMore}</span>
        <svg
          className="w-6 h-6 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </div>
  );
};

export default ProductCard;
