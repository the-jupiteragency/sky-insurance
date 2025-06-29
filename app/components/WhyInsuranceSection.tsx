"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/app/LanguageContext";

const content = {
  en: {
    title: "Why SKY Insurance",
    keyPoints: [
      "1. Cost",
      "2. Speed",
      "3. Ease",
      "4. Security of personal data and peace of mind that all the essentials are covered.",
    ],
    description: [
      "When shopping for insurance, there are several key items to look at:",
      "Choosing Sky Insurance Brokerage helps get you the insurance you need at the best price. As we work for the biggest insurance companies, the service is typically more personalized, meaning better quality support.",
      "Insurance can be a complex concept that is not always easy to understand. While we know that we need insurance to protect our health, our house and car and to ensure that our loved ones are protected, the finer details often become blurred. We can help you navigate the process of finding, comparing, and acquiring insurance by breaking it down into terms and conditions. We pride themselves on providing our clients with the best value in insurance coverage. Having an experienced insurance broker represent you is also a wise way to safeguard yourself and your business.",
    ],
  },
  ar: {
    title: "لماذا تأمين سكاي",
    keyPoints: [
      "١.التكلفة",
      "٢.السرعة",
      "٣.السهولة",
      "٤.أمان البيانات الشخصية والطمأنينة بأن جميع الأمور الأساسية مغطاة",
    ],
    description: [
      ":عند التسوق للتأمين، هناك عدة عناصر رئيسية يجب النظر فيها",
      "ان اختيار شركة سكاي للوساطة التأمينية يساعدك في الحصول على التأمين الذي تحتاجه بأفضل سعر. حيث أننا نعمل مع أكبر شركات التأمين، فإن الخدمة عادةً ما  تكون أكثر تخصيصًا، مما يعني دعمًا أفضل جودة",
      "يمكن أن يكون التأمين مفهومًا معقدًا ليس دائمًا سهل الفهم. على الرغم من أننا نعلم أننا بحاجة إلى التأمين لحماية صحتنا ومنزلنا وسيارتنا وضمان حماية أحبائنا، إلا أن التفاصيل الدقيقة غالبًا ما تتشوش. يمكننا مساعدتك في التنقل خلال عملية البحث عن التأمين ومقارنته والحصول عليه عن طريق تقسيمه إلى شروط وأحكام. نفتخر بتوفير أفضل قيمة لعملائنا في تغطية التأمين. والحصول على وسيط تأمين متمرس يمثل أيضًا وسيلة حكيمة لحماية نفسك وعملك",
    ],
  },
};

export default function WhyInsuranceSection() {
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
      <Image
        src="/light star.png"
        alt="star"
        className={`absolute bottom-48 ${
          language === "ar" ? "right-28" : "left-28"
        } hidden md:block`}
        height={200}
        width={200}
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <motion.div variants={fadeIn} className="md:w-1/3">
            <h2 className="text-5xl font-light text-blue-800 mb-4 w-56">
              {content[language as keyof typeof content].title}
            </h2>
          </motion.div>
          <motion.div variants={fadeIn} className="md:w-2/3 space-y-2">
            <p className="text-gray-800 text-2xl">
              {content[language as keyof typeof content].description[0]}
            </p>
            <ul className="space-y-4">
              {content[language as keyof typeof content].keyPoints.map(
                (point, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 text-gray-800 text-xl"
                  >
                    <span>{point}</span>
                  </li>
                )
              )}
            </ul>
            {content[language as keyof typeof content].description
              .slice(1)
              .map((desc, index) => (
                <p key={index} className="text-gray-800 text-2xl">
                  {desc}
                </p>
              ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
