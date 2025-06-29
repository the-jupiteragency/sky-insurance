"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/LanguageContext";

const content = {
  en: {
    title: "More to know",
    items: [
      "Sky Insurance Brokerage has grown to become a leading Egyptian broker of life, property and casualty insurance products and services.",
      "The Company believes that as insurance intermediary, it is the next stepping stone in the path to becoming the complete insurance solution provider.",
      "The company strives with dedication to determine the needs of the clients and excels in providing the right solutions to meet the client’s expectations and attain the critical success factors in respect of service.",
      "We are insurance brokerage licensed & registered by the Egyptian Financial Regulatory Authority under No. 94.",
      "Sky Insurance Brokerage renders its expertise and assistance to clients by providing:",
      "1. Consulting services, analyzing and examining existing insurance coverage.",
      "2. Risk inspection, risk assessment, risk management.",
      "3. Customization of insurance coverage - specific to the client's activities.",
      "4. Managing insurance claims and other support services.",
      "Our licensed professionals take a pro-active consultative approach to understanding the risks in your business, resolving problems and recommending insurance that covers your operations from all sides.",
    ],
  },

  ar: {
    title: "لمعرفه المزيد",
    items: [
      "شركة سكاي للوساطة التأمينية نمت لتصبح واحدة من الوسطاء الرائدين في مصر في منتجات وخدمات التأمين على الحياة والممتلكات والحوادث.",
      "تعتقد الشركة أنها كوسيط تأميني، تمثل الخطوة التالية في طريق أن تصبح مزود حلول تأمينية شاملة.",
      "تسعى الشركة بتفانٍ لتحديد احتياجات العملاء والتفوق في تقديم الحلول الصحيحة لتلبية توقعات العميل وتحقيق عوامل النجاح الحرجة فيما يتعلق بالخدمة",
      "نحن وساطة تأمين مرخصة ومسجلة لدى الهيئة العامة للرقابة المالية المصرية تحت رقم 94",
      ":تقدم شركة سكاي للوساطة التأمينية خبرتها ومساعدتها للعملاء من خلال تقديم",
      "١. الخدمات الاستشارية، تحليل وفحص التغطية التأمينية الحالية.",
      "٢. تفتيش المخاطر، تقييم المخاطر، إدارة المخاطر",
      "٣. تخصيص تغطية التأمين - خاصة بأنشطة العملاء",
      "٤. إدارة المطالبات التأمينية وخدمات دعم أخرى",
      "يتبنى محترفونا المرخصون نهجًا استشاريًا نشطًا لفهم المخاطر في عملك، وحل المشكلات وتوصية بتأمين يغطي عملياتك من جميع الجوانب",
    ],
  },
};
export default function MoreToLearnSection() {
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
      className="relative py-24 bg-[url('/bg.jpg')] bg-cover bg-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerChildren}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Dark star on top left or top right based on language */}
      <Image
        src="/dark star.png"
        alt="star"
        className={cn(
          "absolute top-20 hidden md:block", // Hide on mobile (md breakpoint)
          language === "ar" ? "right-28" : "left-28" // Adjust position based on RTL/LTR
        )}
        height={150}
        width={150}
      />

      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          variants={fadeIn}
          className="text-5xl font-light text-blue-800 mb-12 text-center"
        >
          {content[language as keyof typeof content].title}
        </motion.h2>

        <motion.div variants={staggerChildren} className="space-y-6">
          {content[language as keyof typeof content].items.map(
            (item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="flex items-start space-x-4"
              >
                <p className="text-gray-800 text-xl">{item}</p>
              </motion.div>
            )
          )}
        </motion.div>
      </div>

      {/* Light star on bottom right or bottom left based on language */}
      <Image
        src="/light star.png"
        alt="star"
        className={cn(
          "absolute bottom-20 hidden md:block", // Hide on mobile (md breakpoint)
          language === "ar" ? "left-28" : "right-28" // Adjust position based on RTL/LTR
        )}
        height={150}
        width={150}
      />
    </motion.section>
  );
}
