"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/app/LanguageContext";

const content = {
  en: {
    title: "Our Story",
    description: [
      "Sky Insurance Brokerage is a trusted insurance brokerage company wholly committed to preserving the prosperity of each of its clients.",
      "We offer our customers a service they can value with the peace of mind they are looking for.",
      "As our client, you are assured of our undivided attention and our ability to handle all your insurance needs in an ever-changing market.",
      "We provide a service that is transparent and sound, persistent in its ambition to improve and provide quality insurance products.",
      "We work to establish solid relationships with our policy holders, insurance companies, our employees and the community we live and conduct our business in.",
      "Our work ethic is based on a commitment to meet the principles outlined above and continue to serve the best interests of all our clients.",
    ],
    mission: {
      title: "Our Mission",
      description: [
        "To provide cost effective, innovative & comprehensive insurance solutions in addition to designing the best of its breed claims administration and management systems ensuring speedy settlement of claims to individuals, SMEs & mega corporates in Egypt.",
        "We aspire to combine excellence, quality and timely service delivery with professionalism in risk coverage, premium management, claim handling, risk management and insurance portfolio management services through a well qualified staff using the latest technologies & easy to use mobile application.",
      ],
    },
    vision: {
      title: "Our Vision",
      description: [
        "Setting new benchmarks in the insurance brokerage industry & becoming the client's first choice.",
      ],
    },
  },
  ar: {
    title: "قصتنا",
    description: [
      "شركة سكاي للوساطة التأمينية هي شركة وساطة تأمين موثوق بها وملتزمة بالحفاظ على ازدهار كل عميل من عملائنا",
      "نحن نقدم لعملائنا خدمة يمكنهم تقديرها مع راحة البال التي يبحثون عنها. كعميل لدينا، يمكنك الاطمئنان إلى اهتمامنا الكامل وقدرتنا على التعامل مع جميع احتياجاتك التأمينية في سوق متغير باستمرار",
      "نحن نقدم خدمة تتسم بالشفافية وصحيحة، مثابرة في طموحها في لتحسين وتوفيرمنتجات تأمينية عالية الجودة",
      "نحن نعمل على إقامة علاقات قوية مع حاملي وثائق التأمين، شركات التأمين، موظفينا، والمجتمع الذي نعيش ونقوم بأعمالنا فيه.تعتمد أخلاقيات عملنا على الالتزام بتلك المبادئ المذكورة أعلاه ومواصلة خدمة مصالح جميع عملائنا بأفضل طريقة",
    ],
    mission: {
      title: "مهمتنا",
      description: [
        "توفير حلول تأمين فعالة من حيث التكلفة ومبتكرة وشاملة بالإضافة إلى تصميم أفضل أنظمة إدارة المطالبات وإدارتها لضمان التسوية السريعة للمطالبات للأفراد والشركات الصغيرة والمتوسطة والشركات الكبرى في مصر",
        "نطمح إلى الجمع بين التميز والجودة وتقديم الخدمات في الوقت المناسب مع الاحترافية في تغطية المخاطر وإدارة الأقساط ومعالجة المطالبات وإدارة المخاطر وخدمات إدارة محافظ التأمين من خلال موظفين مؤهلين تأهيلاً جيدًا باستخدام أحدث التقنيات وتطبيقات الهاتف المحمول سهلة الاستخدام",
      ],
    },
    vision: {
      title: "رؤيتنا",
      description: [
        "وضع معايير جديدة في صناعة وساطة التأمين وأن نصبح الخيار الأول للعميل",
      ],
    },
  },
};

export default function StorySection() {
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
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div variants={fadeIn}>
            <Image
              src="/our story.webp"
              alt="Our Story"
              width={700}
              height={700}
              className="rounded-lg shadow-xl"
              loading="lazy"
            />
          </motion.div>
          <motion.div variants={fadeIn} className="space-y-6">
            <h2 className="text-6xl font-light text-blue-800">
              {content[language as keyof typeof content].title}
            </h2>
            {content[language as keyof typeof content].description.map(
              (description, index) => (
                <p key={index} className="text-gray-800 text-2xl">
                  {description}
                </p>
              )
            )}
            <Image
              src="/light star.png"
              alt="star"
              className="h-12 w-12"
              height={150}
              width={150}
            />
          </motion.div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeIn} className="space-y-6 md:order-1">
            <h2 className="text-6xl font-light text-blue-800">
              {content[language as keyof typeof content].mission.title}
            </h2>
            {content[language as keyof typeof content].mission.description.map(
              (description, index) => (
                <p key={index} className="text-gray-800 text-2xl">
                  {description}
                </p>
              )
            )}
            <Image
              src="/dark star.png"
              alt="star"
              className="h-12 w-12"
              height={150}
              width={150}
            />
          </motion.div>
          <motion.div variants={fadeIn} className="md:order-2">
            <Image
              src="/our mission.webp"
              alt="Our Mission"
              width={700}
              height={700}
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center mt-24">
          <motion.div variants={fadeIn}>
            <Image
              src="/our vision.webp"
              alt="Our Vision"
              width={700}
              height={700}
              className="rounded-lg shadow-xl"
            />
          </motion.div>
          <motion.div variants={fadeIn} className="space-y-6">
            <h2 className="text-6xl font-light text-blue-800">
              {content[language as keyof typeof content].vision.title}
            </h2>
            {content[language as keyof typeof content].vision.description.map(
              (description, index) => (
                <p key={index} className="text-gray-800 text-2xl">
                  {description}
                </p>
              )
            )}
            <Image
              src="/light star.png"
              alt="star"
              className="h-12 w-12"
              height={150}
              width={150}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
