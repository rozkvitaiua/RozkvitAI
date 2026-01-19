"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Calendar, Users, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    image: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    fullDescription?: string;
    client?: string;
    duration?: string;
    results?: string[];
    additionalImages?: string[];
  } | null;
}

export function PortfolioModal({ isOpen, onClose, item }: PortfolioModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // ✅ блокуємо скрол сторінки коли модалка відкрита
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // ✅ ESC закриває
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;
  if (!item) return null;

  const modalUI = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
          />

          {/* Wrapper */}
          <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 9999 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              transition={{ type: "spring", duration: 0.55 }}
              onClick={(e) => e.stopPropagation()}
              // ✅ ВАЖЛИВО: ширина як у Figma Make
              className="relative w-[min(92vw,1100px)]"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors group neon-glow"
                aria-label="Close modal"
                type="button"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Modal container */}
              <div className="glass rounded-3xl overflow-hidden border border-white/10 max-h-[90vh] flex flex-col">
                {/* Hero Image */}
                <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/55 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <Badge className="bg-purple-500/30 text-purple-200 border-purple-500/40 backdrop-blur-md mb-3">
                      {item.category}
                    </Badge>
                    <h2 className="text-2xl md:text-4xl font-bold gradient-text mb-2">
                      {item.title}
                    </h2>
                    <p className="text-sm md:text-lg text-gray-200 max-w-3xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Scroll area */}
                <div className="p-6 md:p-8 space-y-8 overflow-y-auto">
                  {/* ✅ Meta — як у Figma Make: 3 в ряд */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="glass rounded-2xl p-5 border border-white/5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Users className="w-5 h-5 text-purple-300" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Клієнт
                        </span>
                      </div>
                      <p className="font-semibold text-white">
                        {item.client || "Конфіденційно"}
                      </p>
                    </div>

                    <div className="glass rounded-2xl p-5 border border-white/5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-cyan-300" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Тривалість
                        </span>
                      </div>
                      <p className="font-semibold text-white">
                        {item.duration || "2-4 тижні"}
                      </p>
                    </div>

                    <div className="glass rounded-2xl p-5 border border-white/5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <Award className="w-5 h-5 text-yellow-300" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Статус
                        </span>
                      </div>
                      <p className="font-semibold text-white">Завершено</p>
                    </div>
                  </div>

                  {/* Full Description */}
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold">Про проєкт</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.fullDescription ||
                        `${item.description} Проєкт був успішно реалізований з використанням найсучасніших AI-технологій.`}
                    </p>
                  </div>

                  {/* Results */}
                  {item.results && item.results.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold">
                        Результати
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {item.results.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -14 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.06 }}
                            className="flex items-start gap-3 glass rounded-2xl p-4 border border-white/5"
                          >
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 mt-2 flex-shrink-0" />
                            <p className="text-sm text-gray-200">{result}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold">
                      Технології
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {item.tags.map((tag, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <Badge className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30 px-4 py-2 text-sm">
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-1">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 neon-glow flex-1 group"
                    >
                      Замовити подібний проєкт
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      onClick={onClose}
                      className="glass-hover border-purple-500/30"
                      type="button"
                    >
                      Закрити
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalUI, document.body);
}
