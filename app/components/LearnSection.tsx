"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/app/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const content = {
  en: {
    title: "Learn how we can protect you",
    business: "BUSINESS / COMMERCIAL INSURANCE",
    personal: "PERSONAL INSURANCE",
    cta: "Learn more",
  },

  ar: {
    title: "طرق يمكننا من خلالها حمايتك",
    business: "تأمين الأعمال / التجاري",
    personal: "تأمين شخصي",
    cta: "تعرف أكثر",
  },
};

export default function LearnSection() {
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

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.section
      className="py-24 bg-[#22519f] text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerChildren}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          variants={fadeIn}
          className="text-6xl font-normal mb-12 text-center"
        >
          {content[language as keyof typeof content].title}
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div variants={fadeIn} className="text-center">
            <Image
              src="/BUSINESS  COMMERCIAL INSURANCE.jpg"
              alt="Business Insurance"
              width={700}
              height={600}
              className="rounded-lg shadow-xl mb-4 mx-auto"
            />
            <h3 className="text-2xl font-normal mt-4">
              {content[language as keyof typeof content].business}
            </h3>
          </motion.div>
          <motion.div variants={fadeIn} className="text-center">
            <Image
              src="/PERSONAL INSURANCE.jpg"
              alt="Personal Insurance"
              width={700}
              height={600}
              className="rounded-lg shadow-xl mb-4 mx-auto"
            />
            <h3 className="text-2xl font-normal mt-4">
              {content[language as keyof typeof content].personal}
            </h3>
          </motion.div>
        </div>
        <motion.div variants={fadeIn} className="text-center">
          <Link href="/services" passHref>
            <Button
              variant="outline"
              className="rounded-full bg-transparent text-xl"
              size="lg"
            >
              {content[language as keyof typeof content].cta}
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
