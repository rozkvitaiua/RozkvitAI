"use client";

import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PortfolioCardProps {
  image: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  delay?: number;
  onClick?: () => void;
}

export function PortfolioCard({
  image,
  title,
  category,
  description,
  tags,
  delay = 0,
  onClick,
}: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
    >
      <Card
        className="glass overflow-hidden group cursor-pointer"
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`Відкрити кейс: ${title}`}
        onKeyDown={(e) => {
          if (!onClick) return;

          // ✅ Enter відкриває
          if (e.key === "Enter") {
            e.preventDefault();
            onClick();
          }

          // ✅ Space відкриває і НЕ скролить сторінку
          if (e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-[#8B5CF6] text-white border-0 backdrop-blur-sm">
              {category}
            </Badge>
          </div>

          {/* Overlay content on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold group-hover:text-[#8B5CF6] transition-colors">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 rounded-full bg-[#1E1E2E] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
