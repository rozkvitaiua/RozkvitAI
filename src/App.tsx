"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { PortfolioCard } from "./components/PortfolioCard";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Badge } from "./components/ui/badge";
import {
  Video,
  Bot,
  Camera,
  Sparkles,
  Zap,
  Rocket,
  ArrowRight,
  Play,
  CheckCircle2,
  Instagram,
} from "lucide-react";

import Logo from "./Logo.svg";

type PortfolioItem = {
  image: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  delay: number;
};

type ServiceItem = {
  icon: any;
  title: string;
  description: string;
  features: string[];
  color: string;
  delay: number;
};

export default function App() {
  // ✅ FORMSPREE ENDPOINT
  const FORM_ENDPOINT = "https://formspree.io/f/xaqgeqeq";

  // ✅ FORM STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // ✅ MODAL STATE
  const [selectedCase, setSelectedCase] = useState<null | PortfolioItem>(null);

  // ✅ SERVICES DATA (без "Дізнатися більше")
  const services: ServiceItem[] = [
    {
      icon: Video,
      title: "Відео креативи",
      description:
        "Створюємо захоплюючі відео для соціальних мереж, реклами та брендингу з використанням AI-технологій",
      features: [
        "Рекламні ролики для Instagram та TikTok",
        "Промо-відео для продуктів",
        "Анімовані логотипи та заставки",
        "Відео для YouTube каналів",
      ],
      color: "#8B5CF6",
      delay: 0,
    },
    {
      icon: Bot,
      title: "AI чат-боти",
      description:
        "Розробляємо розумних чат-ботів, які автоматизують спілкування з клієнтами 24/7",
      features: [
        "Інтеграція з Telegram, Instagram, Facebook",
        "Обробка природної мови (NLP)",
        "Автоматизація продажів та підтримки",
        "Аналітика та звіти",
      ],
      color: "#06B6D4",
      delay: 0.1,
    },
    {
      icon: Camera,
      title: "AI фотографії",
      description:
        "Генеруємо унікальні фотореалістичні зображення для вашого бізнесу за допомогою штучного інтелекту",
      features: [
        "Продуктові фотографії",
        "Портрети та lifestyle знімки",
        "Концепт-арт та візуалізації",
        "Ретуш та покращення якості",
      ],
      color: "#F59E0B",
      delay: 0.2,
    },
  ];

  // ✅ PORTFOLIO DATA
  const portfolioItems: PortfolioItem[] = [
    {
      image:
        "https://images.unsplash.com/photo-1581343117330-0104b39ce4c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwQUklMjB2aWRlbyUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzYxNDcwNjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Рекламна кампанія для e-commerce",
      category: "Відео",
      description:
        "Серія вертикальних відео для Instagram Reels, які збільшили продажі на 340%",
      tags: ["Instagram", "Reels", "E-commerce"],
      delay: 0,
    },
    {
      image:
        "https://images.unsplash.com/photo-1601132359864-c974e79890ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHJvYm90JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjE0NTY0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "AI асистент для онлайн-школи",
      category: "Чат-бот",
      description:
        "Чат-бот, який автоматизував 80% запитів студентів та підвищив задоволеність",
      tags: ["Telegram", "AI", "Освіта"],
      delay: 0.1,
    },
    {
      image:
        "https://images.unsplash.com/photo-1648987905156-edcfc4beedfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYxNDcwMTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Продуктова фотозйомка для бренду",
      category: "Фото",
      description:
        "AI-генеровані продуктові фотографії для каталогу fashion-бренду",
      tags: ["AI Photography", "Fashion", "Product"],
      delay: 0.2,
    },
  ];

  // ✅ FORMSPREE SUBMIT (FormData — 100% працює на GitHub Pages)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(false);
    setIsSending(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData, // ✅ важливо: без JSON
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Formspree error: ${res.status}`);
      }

      setSent(true);

      // очистка форми
      setName("");
      setEmail("");
      setProjectType("");
      setMessage("");
    } catch (err) {
      alert(
        "Не вдалося відправити заявку 😥 Спробуйте ще раз або напишіть нам в Instagram."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5FF] relative overflow-hidden">
      <AnimatedBackground />

      {/* Gradient Orbs */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div
        className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12">
                <img
                  src={Logo}
                  alt="Rozkvit.AI logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold gradient-text">Rozkvit.AI</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#services"
                className="text-sm hover:text-purple-400 transition-colors"
              >
                Послуги
              </a>
              <a
                href="#portfolio"
                className="text-sm hover:text-purple-400 transition-colors"
              >
                Портфоліо
              </a>
              <a
                href="#process"
                className="text-sm hover:text-purple-400 transition-colors"
              >
                Процес
              </a>
              <a
                href="#contact"
                className="text-sm hover:text-purple-400 transition-colors"
              >
                Контакти
              </a>
            </nav>

            <Button
              asChild
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 neon-glow-hover"
            >
              <a href="#contact">Почати проєкт</a>
            </Button>
          </div>
        </motion.header>

        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Creative Studio
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Перетворюємо ідеї в
                <span className="gradient-text block">digital-шедеври</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Створюємо відео креативи, розумних чат-ботів та унікальні
                AI-фотографії, які захоплюють увагу та збільшують конверсії
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 neon-glow group"
                >
                  <a href="#contact" className="flex items-center gap-2">
                    Розпочати співпрацю
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="glass-hover border-purple-500/30 group"
                >
                  <a href="#portfolio" className="flex items-center">
                    <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Дивитись портфоліо
                  </a>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold gradient-text">500+</div>
                  <div className="text-sm text-muted-foreground">Проєктів</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">98%</div>
                  <div className="text-sm text-muted-foreground">
                    Задоволених клієнтів
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">24/7</div>
                  <div className="text-sm text-muted-foreground">Підтримка</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden neon-glow">
                <img
                  src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjEzMzQ4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="AI Technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -right-6 glass p-4 rounded-2xl neon-glow"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Zap className="w-8 h-8 text-yellow-400" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl neon-glow"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <Rocket className="w-8 h-8 text-purple-400" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                Наші послуги
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold">
                Що ми <span className="gradient-text">створюємо</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Використовуємо найновіші AI-технології для створення контенту
                світового рівня
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: service.delay }}
                  >
                    <Card className="glass p-8 h-full space-y-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${service.color}22` }}
                      >
                        <Icon
                          className="w-7 h-7"
                          style={{ color: service.color }}
                        />
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <ul className="space-y-3 text-sm text-muted-foreground">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-start gap-3">
                            <span
                              className="mt-2 w-2 h-2 rounded-full"
                              style={{ backgroundColor: service.color }}
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section
          id="portfolio"
          className="py-32 px-6 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                Портфоліо
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold">
                Наші <span className="gradient-text">роботи</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Проєкти, які ми реалізували для наших клієнтів
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item) => (
                <div
                  key={item.title}
                  className="cursor-pointer"
                  onClick={() => setSelectedCase(item)}
                >
                  <PortfolioCard
                    image={item.image}
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    tags={item.tags}
                    delay={item.delay}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                Як ми працюємо
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold">
                Простий <span className="gradient-text">процес</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Консультація", desc: "Обговорюємо ваші цілі та вимоги" },
                { step: "02", title: "Планування", desc: "Створюємо стратегію та концепцію" },
                { step: "03", title: "Створення", desc: "Реалізуємо проєкт з AI-технологіями" },
                { step: "04", title: "Доставка", desc: "Передаємо готовий результат" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass p-6 text-center space-y-4 h-full">
                    <div className="text-5xl font-bold gradient-text">{item.step}</div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="py-32 px-6 bg-gradient-to-b from-purple-500/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold">
                  Чому обирають <span className="gradient-text">нас</span>
                </h2>

                <div className="space-y-6">
                  {[
                    "Використання найсучасніших AI-технологій",
                    "Індивідуальний підхід до кожного проєкту",
                    "Швидка реалізація та гнучкість",
                    "Професійна команда експертів",
                    "Прозорі ціни без прихованих платежів",
                    "Підтримка після завершення проєкту",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-lg">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Card className="glass p-6 space-y-2">
                    <div className="text-4xl font-bold gradient-text">3x</div>
                    <div className="text-sm text-muted-foreground">
                      Швидше ніж традиційні методи
                    </div>
                  </Card>
                  <Card className="glass p-6 space-y-2">
                    <div className="text-4xl font-bold gradient-text">50+</div>
                    <div className="text-sm text-muted-foreground">AI інструментів</div>
                  </Card>
                  <Card className="glass p-6 space-y-2">
                    <div className="text-4xl font-bold gradient-text">100%</div>
                    <div className="text-sm text-muted-foreground">
                      Задоволення якістю
                    </div>
                  </Card>
                  <Card className="glass p-6 space-y-2">
                    <div className="text-4xl font-bold gradient-text">24/7</div>
                    <div className="text-sm text-muted-foreground">Доступність</div>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                Зв'яжіться з нами
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold">
                Готові розпочати <span className="gradient-text">проєкт?</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Заповніть форму, і ми зв'яжемося з вами протягом 24 годин
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass p-8">
                {/* ✅ ВАЖЛИВО: method + action + FormData */}
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit}
                  method="POST"
                  action={FORM_ENDPOINT}
                >
                  {/* ✅ hidden, щоб точно пішов тип проєкту */}
                  <input type="hidden" name="projectType" value={projectType} />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ім'я</label>
                      <Input
                        required
                        name="name"
                        placeholder="Ваше ім'я"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="glass border-purple-500/20 focus:border-purple-500/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        required
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="glass border-purple-500/20 focus:border-purple-500/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Тип проєкту</label>
                    <div className="grid grid-cols-3 gap-4">
                      {["Відео", "Чат-бот", "Фото"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setProjectType(type)}
                          className={`glass-hover p-4 rounded-lg text-center border transition-colors ${
                            projectType === type
                              ? "border-cyan-500/70 bg-cyan-500/10"
                              : "border-purple-500/20 hover:border-purple-500/50"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Опис проєкту</label>
                    <Textarea
                      required
                      name="message"
                      placeholder="Розкажіть про ваш проєкт..."
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="glass border-purple-500/20 focus:border-purple-500/50"
                    />
                  </div>

                  {sent && (
                    <div className="glass p-4 rounded-xl border border-cyan-500/20 text-center">
                      ✅ Дякуємо! Ми звʼяжемося з вами протягом 24 годин.
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSending}
                    className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 neon-glow disabled:opacity-60"
                  >
                    {isSending ? "Відправляємо..." : "Відправити заявку"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* ✅ прибрано 2 блоки контактів під формою */}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12">
                    <img
                      src={Logo}
                      alt="Rozkvit.AI logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xl font-bold gradient-text">Rozkvit.AI</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI-студія креативного контенту нового покоління
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Послуги</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#services" className="hover:text-purple-400 transition-colors">
                      Відео креативи
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-purple-400 transition-colors">
                      AI чат-боти
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-purple-400 transition-colors">
                      AI фотографії
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Компанія</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#process" className="hover:text-purple-400 transition-colors">
                      Про нас
                    </a>
                  </li>
                  <li>
                    <a href="#portfolio" className="hover:text-purple-400 transition-colors">
                      Портфоліо
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-purple-400 transition-colors">
                      Блог
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Контакти</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>rozkvit.ai.ua@gmail.com</li>

                  <li>
                    <a
                      href="https://www.instagram.com/rozkvit.ai/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 hover:text-purple-400 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      @rozkvit.ai
                    </a>
                  </li>

                  <li>Україна, Київ</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 text-center text-sm text-muted-foreground">
              <p>© 2026 Rozkvit.AI. Всі права захищені.</p>
            </div>
          </div>
        </footer>

        {/* ✅ PORTFOLIO MODAL */}
        {selectedCase && (
          <div
            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedCase(null)}
          >
            <div
              className="max-w-3xl w-full glass border border-white/10 rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedCase.image}
                  alt={selectedCase.title}
                  className="w-full h-[320px] object-cover"
                />

                <button
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-4 right-4 px-4 py-2 rounded-xl glass-hover border border-white/10"
                >
                  Закрити ✕
                </button>
              </div>

              <div className="p-6 space-y-3">
                <div className="text-sm text-muted-foreground">
                  {selectedCase.category}
                </div>
                <h3 className="text-2xl font-bold">{selectedCase.title}</h3>
                <p className="text-muted-foreground">
                  {selectedCase.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedCase.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex gap-3">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 neon-glow"
                  >
                    <a href="#contact">Хочу такий проєкт</a>
                  </Button>

                  <Button
                    variant="outline"
                    className="glass-hover border-purple-500/30"
                    onClick={() => setSelectedCase(null)}
                  >
                    Повернутись
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
