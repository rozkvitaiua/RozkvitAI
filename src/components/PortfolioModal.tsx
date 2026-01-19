"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, User, Calendar, Award } from "lucide-react";

type PortfolioItem = {
  image: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  fullDescription?: string;
  client?: string;
  duration?: string;
  results?: string[];
};

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PortfolioItem | null;
}

export function PortfolioModal({ isOpen, onClose, item }: PortfolioModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // ✅ Lock body scroll while modal open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // ✅ Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const modalNode = useMemo(() => {
    if (!isOpen || !item) return null;

    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.button
            aria-label="Close modal"
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="
              relative w-full max-w-6xl h-[90vh] max-h-[90vh]
              rounded-3xl overflow-hidden
              border border-white/10
              bg-[#0A0A0F]/88 backdrop-blur-2xl
              shadow-2xl
              flex flex-col min-h-0
            "
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="
                absolute top-5 right-5 z-20
                w-11 h-11 rounded-full
                bg-white/10 hover:bg-white/20
                border border-white/10
                backdrop-blur-md
                flex items-center justify-center
                transition-colors
              "
              aria-label="Close"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Top hero image */}
            <div className="relative h-[260px] md:h-[320px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-black/30 to-black/10" />

              <div className="absolute bottom-6 left-6 right-16 space-y-3">
                <div className="inline-flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white text-xs backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
                    {item.title}
                  </span>
                </h2>

                <p className="text-sm md:text-base text-white/80 max-w-3xl">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
              <div className="p-6 md:p-8 space-y-8">
                {/* Meta blocks (Figma Make style: 3 cards in row) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-300" />
                      </div>
                      <div>
                        <div className="text-sm text-white/60">Клієнт</div>
                        <div className="font-semibold text-white">
                          {item.client ?? "—"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-cyan-300" />
                      </div>
                      <div>
                        <div className="text-sm text-white/60">Тривалість</div>
                        <div className="font-semibold text-white">
                          {item.duration ?? "—"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-yellow-500/15 border border-yellow-500/20 flex items-center justify-center">
                        <Award className="w-5 h-5 text-yellow-300" />
                      </div>
                      <div>
                        <div className="text-sm text-white/60">Статус</div>
                        <div className="font-semibold text-white">
                          Завершено
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Про проєкт
                  </h3>
                  <p className="text-white/75 leading-relaxed">
                    {item.fullDescription ?? item.description}
                  </p>
                </div>

                {/* Results */}
                {item.results?.length ? (
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      Результати
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      {item.results.map((r, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5"
                        >
                          <div className="text-white font-semibold">{r}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Tags */}
                {item.tags?.length ? (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-[#1E1E2E] text-white/70 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                {/* bottom padding */}
                <div className="h-2" />
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }, [isOpen, item, onClose]);

  if (!mounted) return null;
  if (!modalNode) return null;

  // ✅ Portal to body — fixes "modal behind page" bug
  return createPortal(modalNode, document.body);
}
