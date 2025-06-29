"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/app/LanguageContext";

const content = {
  en: {
    title: "Our Services",
    subtitle: "We'd love to help!",
    description: [
      "The Business insurance policies are designed to protect stocks and business premises against accidental, natural or malicious damage.",
      "More extensive plans also provide cover in the event of loss of income or money, loss of goods during transit, public liability and personal accident assault.",
      "Sky Insurance strives to be an ethical, principled, and value-based organization dedicated to setting new benchmarks in the industry. Our primary goal is to address the insurance needs of all sections of society and enterprises, offering cost-effective and comprehensive solutions to our clients. We are committed to designing top-tier claims administration and management systems to ensure the swift resolution of claims and implementing effective risk management practices across all client portfolios.",
    ],
    learn: "Learn how we can protect you",
    business: {
      title: "BUSINESS / COMMERCIAL INSURANCE",
      items: [
        "Liability Classes",
        "Employer's Liability",
        "Products Liability",
        "Public Liability",
        "Directors and Officers Liability",
        "Professional Indemnity",
        "Group Health Insurance",
        "Marine Cargo Care at Sea, Over land or in the Air",
        "Motor Fleet",
        "Property Classes",
        "Fire and Special Perils",
        "Pension Assurance",
        "Hoteliers Insurance",
      ],
    },
    personal: {
      title: "PERSONAL INSURANCE",
      items: [
        "Home Assurance",
        "Motor",
        "Health",
        "Life Assurance",
        "Yacht & Pleasure Craft",
      ],
    },
  },
  ar: {
    title: "خدماتنا",
    subtitle: "نحن نحب أن نساعد!",
    description: [
      "تم تصميم وثائق تأمين الأعمال لحماية المخزون ومباني الأعمال ضد الأضرار العرضية أو الطبيعية أو الكيدية.",
      "توفر الخطط الأكثر شمولاً أيضًا تغطية في حالة فقدان الدخل أو المال أو فقدان البضائع أثناء النقل والمسؤولية العامة والحوادث الشخصية.",
      "تسعى سكاي للتأمين جاهدة لتكون مؤسسة أخلاقية ومبدئية وقائمة على القيم مكرسة لوضع معايير جديدة في الصناعة. هدفنا الأساسي هو تلبية احتياجات التأمين لجميع قطاعات المجتمع والمؤسسات، وتقديم حلول فعالة من حيث التكلفة وشاملة لعملائنا. نحن ملتزمون بتصميم أنظمة إدارة المطالبات من الدرجة الأولى لضمان الحل السريع للمطالبات وتنفيذ ممارسات إدارة المخاطر الفعالة عبر جميع محافظ العملاء.",
    ],
    learn: "تعرف على كيف يمكننا حمايتك",
    business: {
      title: "تأمين الأعمال / التجاري",
      items: [
        "فئات المسؤولية",
        "مسؤولية صاحب العمل",
        "مسؤولية المنتجات",
        "المسؤولية العامة",
        "مسؤولية المديرين والمسؤولين",
        "التعويض المهني",
        "التأمين الصحي الجماعي",
        "رعاية البضائع البحرية في البحر أو البر أو الجو",
        "أسطول السيارات",
        "فئات الممتلكات",
        "الحريق والمخاطر الخاصة",
        "تأمين المعاشات",
        "تأمين الفنادق",
      ],
    },
    personal: {
      title: "التأمين الشخصي",
      items: [
        "تأمين المنزل",
        "السيارات",
        "الصحة",
        "تأمين الحياة",
        "اليخوت وقوارب النزهة",
      ],
    },
  },
};

export default function Services() {
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
    <div className="min-h-screen">
      {/* Header Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="relative py-12 md:py-16 bg-slate-100 pt-28"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="container mx-auto px-4 py-20 md:py-44">
          <div className="relative">
            <Image
              src="/light star.png"
              alt="star"
              className="absolute top-0 left-0 md:top-32 md:left-32 w-16 h-16 md:w-32 md:h-32"
              width={130}
              height={130}
            />
            <Image
              src="/dark star.png"
              alt="star"
              className="absolute bottom-0 right-0 md:bottom-16 md:right-32 w-16 h-16 md:w-32 md:h-32"
              width={130}
              height={130}
            />
            <h1 className="text-center text-4xl md:text-6xl font-light text-blue-800">
              {content[language as keyof typeof content].title}
            </h1>
          </div>
        </div>
      </motion.section>

      {/* Help Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-12 md:py-16"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative h-[300px] md:h-[700px] w-full md:w-[650px] overflow-hidden rounded-lg">
              <Image
                src="/services.webp"
                alt="Professional reviewing documents"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-light text-blue-800">
                {content[language as keyof typeof content].subtitle}
              </h2>
              <div className="space-y-5 text-gray-800 text-lg md:text-2xl">
                {content[language as keyof typeof content].description.map(
                  (paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Protection Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gray-50 py-12 md:py-16"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl md:text-5xl font-light text-blue-800">
            {content[language as keyof typeof content].learn}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {/* Business Insurance */}
            <motion.div
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-6"
            >
              <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/Business Insurance.webp"
                  alt="Business insurance consultation"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="mb-4 text-xl md:text-2xl font-light text-blue-800">
                  {content[language as keyof typeof content].business.title}
                </h3>
                <ul className="grid grid-cols-1 text-gray-900">
                  {content[language as keyof typeof content].business.items.map(
                    (item, index) => (
                      <motion.li
                        key={index}
                        variants={fadeIn}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        • {item}
                      </motion.li>
                    )
                  )}
                </ul>
              </div>
            </motion.div>

            {/* Personal Insurance */}
            <motion.div
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="space-y-6"
            >
              <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/BUSINESS  COMMERCIAL INSURANCE.webp"
                  alt="Personal insurance planning"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="mb-4 text-xl md:text-2xl font-light text-blue-800">
                  {content[language as keyof typeof content].personal.title}
                </h3>
                <ul className="grid grid-cols-1 text-gray-900">
                  {content[language as keyof typeof content].personal.items.map(
                    (item, index) => (
                      <motion.li
                        key={index}
                        variants={fadeIn}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        • {item}
                      </motion.li>
                    )
                  )}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
