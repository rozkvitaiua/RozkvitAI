"use client";

import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  color: string;
  delay?: number;
}

export function ServiceCard({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  color,
  delay = 0 
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="glass glass-hover p-8 h-full group relative overflow-hidden">
        {/* Background gradient on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          style={{ 
            background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)` 
          }}
        />
        
        <div className="relative z-10 space-y-6">
          {/* Icon */}
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            style={{ 
              background: `linear-gradient(135deg, ${color}20, ${color}10)`,
              boxShadow: `0 0 30px ${color}20`
            }}
          >
            <Icon 
              className="w-8 h-8 transition-all duration-300" 
              style={{ color }}
            />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold">{title}</h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Features */}
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span 
                  className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Learn more link */}
          <button 
            className="text-sm font-medium group/btn inline-flex items-center gap-2 transition-all"
            style={{ color }}
          >
            Дізнатися більше
            <svg 
              className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
