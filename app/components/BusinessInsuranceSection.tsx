"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/app/LanguageContext";

const content = {
  en: {
    title: "Business Insurance",
    description: [
      "The SKY IB Business Insurance Division provides sound advice and service that ensures your business is equipped with the right coverage to handle any situation that may arise. Protecting your assets and providing risk-management solutions is at the core of what we do.",
      "As an insurance brokerage, we are your reliable providers of insurance implementation, claims, and renewal.",
      "We arm you with the right mix of policies to defend your organization against the threats that could otherwise force you to close your doors.",
      "Our variety of business insurance solutions can help to address the needs of any organization, giving business owners peace of mind knowing that they are prepared for the future.",
    ],
    fullService:
      "A Full-service agency offering affordable, comprehensive insurance strategies for businesses. Our aim is to protect your assets by providing professional risk-management solutions. Whether you are a new or established business, you need the right type of insurance to protect your interests. When you contact SKY IB regarding our business for insurance services, we will determine the best plan for you according to the needs of your business, the number of staff you have, risks that you may be facing, and similar factors.",
  },
  ar: {
    title: "تأمين الأعمال",
    description: [
      "يقدم قسم تأمين الأعمال في سكاي للوساطة التأمينية المشورة والخدمة السليمة التي تضمن تجهيز عملك بالتغطية المناسبة للتعامل مع أي موقف قد ينشأ. حماية أصولك وتوفير حلول إدارة المخاطر هو جوهر ما نقوم به.",
      "بصفتنا وسيطًا للتأمين، نحن مزودوك الموثوق بهم لتنفيذ التأمين والمطالبات والتجديد.",
      "نحن نسلحك بالمزيج المناسب من السياسات للدفاع عن مؤسستك ضد التهديدات التي يمكن أن تجبرك على إغلاق أبوابك.",
      "يمكن لمجموعة حلول تأمين الأعمال لدينا أن تساعد في تلبية احتياجات أي مؤسسة، مما يمنح أصحاب الأعمال راحة البال مع العلم أنهم مستعدون للمستقبل.",
    ],
    fullService:
      "وكالة خدمة كاملة تقدم استراتيجيات تأمين شاملة وبأسعار معقولة للشركات. هدفنا هو حماية أصولك من خلال توفير حلول إدارة المخاطر المهنية. سواء كنت شركة جديدة أو راسخة، فأنت بحاجة إلى النوع المناسب من التأمين لحماية مصالحك. عندما تتصل بـ سكاي للوساطة التأمينية بخصوص خدمات التأمين التجاري، سنحدد أفضل خطة لك وفقًا لاحتياجات عملك وعدد الموظفين لديك والمخاطر التي قد تواجهها والعوامل المماثلة.",
  },
};

export default function BusinessInsuranceSection() {
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
      className="py-24 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-12 md:flex-row items-start">
          <motion.div
            variants={fadeIn}
            className="flex-1 md:h-[800px] h-auto" // Flex allows responsive sizing
          >
            <Image
              src="/Business Insurance.jpg"
              alt="Business Insurance Handshake"
              width={500}
              height={900}
              className="rounded-lg h-full w-full object-cover" // Ensures the image covers the container height
            />
          </motion.div>
          <motion.div variants={fadeIn} className="flex-1 space-y-6 md:ml-8">
            <h2 className="text-6xl font-light text-blue-800">
              {content[language as keyof typeof content].title}
            </h2>
            {content[language as keyof typeof content].description.map(
              (paragraph: string, index: number) => (
                <p key={index} className="text-gray-800 text-2xl">
                  {paragraph}
                </p>
              )
            )}
            <div className="mt-8 ml-6">
              <p className="text-gray-800 text-2xl list-item ">
                {content[language as keyof typeof content].fullService}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
