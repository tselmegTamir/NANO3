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
  cardSize?: number; // Dynamic card size in pixels
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  url,
  alignment = "left",
  style,
  cardSize = 480, // Default size
}) => {
  const { language } = useLanguage();
  const t = translations[language as "en" | "mn"];

  // Calculate responsive sizes based on cardSize
  const padding = Math.round(cardSize * 0.05); // 5% of card size
  const imageHeight = Math.round(cardSize * 0.45); // 45% of card size
  const borderRadius = Math.round(cardSize * 0.04); // 4% of card size
  const titleSize = Math.round(cardSize * 0.05); // 5% of card size
  const tagPadding = Math.round(cardSize * 0.02); // 2% of card size
  const iconSize = Math.round(cardSize * 0.04); // 4% of card size

  return (
    <div
      className="bg-white/10 backdrop-blur-lg rounded-3xl w-full border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105 flex flex-col"
      style={{
        ...style,
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
      }}
    >
      <div className="flex-1 flex flex-col">
        {/* Image Container */}
        <div
          className="w-full bg-white/20 rounded-2xl mb-4 overflow-hidden"
          style={{
            height: `${imageHeight}px`,
            borderRadius: `${borderRadius * 0.7}px`,
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Tag */}
        <span
          className="inline-block bg-green-500 text-white font-medium rounded-full mb-4 self-start"
          style={{
            padding: `${tagPadding}px ${tagPadding * 2}px`,
            fontSize: `${Math.round(cardSize * 0.028)}px`,
          }}
        >
          {description}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-bold text-white mb-4"
        style={{
          fontSize: `${titleSize}px`,
          lineHeight: "1.2",
        }}
      >
        {title}
      </h3>

      {/* Learn More Link */}
      <Link
        href={url}
        className="text-white/80 hover:text-white flex items-center space-x-2 group"
        style={{
          fontSize: `${Math.round(cardSize * 0.035)}px`,
        }}
      >
        <span>{t.home.learnMore}</span>
        <svg
          className="group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
          }}
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
