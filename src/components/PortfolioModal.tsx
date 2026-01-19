"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, User, Award } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

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
  // ✅ блокуємо скрол body коли модалка відкрита
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // ✅ ESC для закриття
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // щоб не падало на SSR
  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* ✅ Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* ✅ Scroll container (саме тут має бути overflow) */}
          <div className="relative z-[100000] w-full max-w-5xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0B0B12]/90 shadow-2xl"
            >
              {/* ✅ Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-[100001] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition"
                aria-label="Close modal"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              {/* ✅ Hero image */}
              <div className="relative h-72 md:h-80 w-full overflow-hidden rounded-t-3xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-black/40 to-transparent" />

                <div className="absolute left-6 bottom-6 space-y-3">
                  <Badge className="bg-purple-500/25 text-purple-200 border-purple-500/30">
                    {item.category}
                  </Badge>

                  <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                      {item.title}
                    </span>
                  </h2>

                  <p className="text-white/80 max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* ✅ Content */}
              <div className="p-6 md:p-10 space-y-8">
                {/* Info cards */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="glass p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/15 flex items-center justify-center">
                      <User className="w-6 h-6 text-purple-300" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Клієнт</div>
                      <div className="font-semibold text-white">
                        {item.client || "—"}
                      </div>
                    </div>
                  </Card>

                  <Card className="glass p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-cyan-300" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Тривалість</div>
                      <div className="font-semibold text-white">
                        {item.duration || "—"}
                      </div>
                    </div>
                  </Card>

                  <Card className="glass p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-500/15 flex items-center justify-center">
                      <Award className="w-6 h-6 text-yellow-300" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Статус</div>
                      <div className="font-semibold text-white">
                        Завершено
                      </div>
                    </div>
                  </Card>
                </div>

                {/* About */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">Про проєкт</h3>
                  <p className="text-white/70 leading-relaxed">
                    {item.fullDescription || item.description}
                  </p>
                </div>

                {/* Results */}
                {item.results?.length ? (
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white">Результати</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {item.results.map((r, i) => (
                        <div
                          key={i}
                          className="glass p-4 rounded-2xl border border-white/10 text-white/80"
                        >
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
                    onClick={onClose}
                  >
                    Закрити
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
