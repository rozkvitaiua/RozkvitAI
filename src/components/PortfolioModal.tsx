"use client";

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
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* ✅ Важливо: НЕ центруємо по вертикалі, а ставимо зверху */}
            <div className="min-h-full flex items-start justify-center p-4 py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-5xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* ✅ Close button тепер не “вилазить” за межі */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors group neon-glow"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* ✅ Обмежуємо висоту, робимо layout нормальним */}
                <div className="glass rounded-3xl overflow-hidden border border-white/10 max-h-[90vh] flex flex-col">
                  {/* Hero Image */}
                  <div className="relative h-[360px] overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/60 to-transparent" />

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-500/50 backdrop-blur-md mb-4">
                        {item.category}
                      </Badge>

                      <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
                        {item.title}
                      </h2>

                      <p className="text-base md:text-lg text-gray-300 max-w-3xl">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* ✅ Контент тепер скролиться всередині модалки */}
                  <div className="p-6 md:p-8 space-y-8 overflow-y-auto">
                    {/* Meta */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="glass rounded-xl p-4 border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Users className="w-5 h-5 text-purple-400" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Клієнт
                          </span>
                        </div>
                        <p className="font-semibold text-white">
                          {item.client || "Конфіденційно"}
                        </p>
                      </div>

                      <div className="glass rounded-xl p-4 border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-cyan-400" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Тривалість
                          </span>
                        </div>
                        <p className="font-semibold text-white">
                          {item.duration || "2-4 тижні"}
                        </p>
                      </div>

                      <div className="glass rounded-xl p-4 border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <Award className="w-5 h-5 text-yellow-400" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Статус
                          </span>
                        </div>
                        <p className="font-semibold text-white">Завершено</p>
                      </div>
                    </div>

                    {/* Full Description */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">Про проєкт</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.fullDescription ||
                          `${item.description} Проєкт був успішно реалізований з використанням найсучасніших AI-технологій. 
                          Ми застосували індивідуальний підхід та створили рішення, яке повністю відповідає потребам клієнта.`}
                      </p>
                    </div>

                    {/* Results */}
                    {item.results && item.results.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Результати</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {item.results.map((result, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.08 }}
                              className="flex items-start gap-3 glass rounded-lg p-4 border border-white/5"
                            >
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 mt-2 flex-shrink-0" />
                              <p className="text-sm">{result}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">Технології</h3>
                      <div className="flex flex-wrap gap-3">
                        {item.tags.map((tag, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Badge className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30 px-4 py-2 text-sm">
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Images */}
                    {item.additionalImages && item.additionalImages.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">
                          Додаткові матеріали
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {item.additionalImages.map((img, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.08 }}
                              className="relative h-48 rounded-xl overflow-hidden group cursor-pointer"
                            >
                              <ImageWithFallback
                                src={img}
                                alt={`${item.title} - додаткове зображення ${
                                  index + 1
                                }`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col md:flex-row gap-4 pt-2">
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
                      >
                        Закрити
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
