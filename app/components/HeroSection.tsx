"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/app/LanguageContext";

const content = {
  en: {
    title: "Preserving Prosperity,",
    subtitle: "Providing Peace of Mind",
  },
  ar: {
    title: "،حماية تامة لمستقبلك",
    subtitle: "اختيارك الأمثل في التأمين",
  },
};

export default function HeroSection() {
  const { language } = useLanguage();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Image
        src="/hero section.webp"
        alt="Hero Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <Image
          src="/dark star.png"
          alt="star"
          className="absolute top-32 left-32 hidden md:block"
          height={130}
          width={130}
        />

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          variants={fadeIn}
        >
          {content[language as keyof typeof content].title}
          <br />
          {content[language as keyof typeof content].subtitle}
        </motion.h1>

        <Image
          src="/light star.png"
          alt="star"
          className="absolute bottom-24 right-32 hidden md:block"
          height={130}
          width={130}
        />
      </div>
    </motion.section>
  );
}
