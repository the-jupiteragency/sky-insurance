"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/app/LanguageContext";

const content = {
  en: {
    title: "Our Values",
    subtitle:
      "We offer our customers a service they can value with the peace of mind they are looking for. As our client, you are assured of our undivided attention and our ability to handle all your insurance needs in an ever-changing market.",
    items: [
      {
        title: "Excellence",
        description:
          "Our clients expect nothing less from us, and we strive to deliver the highest levels of customer service and product excellence. That's one reason why we discuss the Circle of Operational Excellence with our clients – ensuring they are aware of their coverage options for commercial insurance, personal insurance, life, disability and group benefits.",
        img: "/icon 1.png",
      },
      {
        title: "Quality",
        description:
          "From our staff training to our technology investments, we ensure our systems and people deliver a top-quality solution for clients. As an example, much of our operations are paperless, which helps to ensure client files and information are available on a confidential basis to any licensed team member. That means any of our team members can help you when you call, even if your regular contact is out of the office.",
        img: "/icon 2.png",
      },
      {
        title: "Integrity",
        description:
          "SKY Insurance Brokerage is recognized in the industry and among clients for its strong experience, responsive client service, excellent product knowledge, pro-active risk management and loss control, and its unique claims advocacy processes. Taken together, these elements help us deliver on the core value of integrity.",
        img: "/icon 3.png",
      },
      {
        title: "Relationships",
        description:
          "From the start, our motto has been: We take pride in caring for our customers! We value the relationships we have built with our clients and insurance companies. Underlying these strong bonds is our commitment to professionalism. As proof, we only have to look at the many client referrals we receive – likely, the best compliment for any business.",
        img: "/icon 4.png",
      },
    ],
  },
  ar: {
    title: "قيمنا",
    subtitle:
      "نحن نقدم لعملائنا خدمة يمكنهم تقديرها بالراحة التي يبحثون عنها. كعميل لنا، يمكنكم أن تكونوا مطمئنين بتفرّد اهتمامنا وقدرتنا على التعامل مع جميع احتياجاتكم في مجال التأمين في سوق متغير باستمرار",
    items: [
      {
        title: "التميز",
        description:
          "عملاؤنا لا يتوقعون شيئًا أقل من ذلك منا، ونحن نسعى جاهدين لتقديم أعلى مستويات خدمة العملاء والتميز في المنتجات. وهذا هو أحد الأسباب التي تجعلنا نناقش دائرة التميز التشغيلي مع عملائنا - لضمان أنهم على دراية بخيارات تغطية التأمين الخاصة بهم للتأمين التجاري والشخصي والحياة والعجز والمزايا الجماعية",
        img: "/icon 1.png",
      },
      {
        title: "الجودة",
        description:
          "بدءًا من تدريب موظفينا وحتى استثماراتنا التكنولوجية، نضمن أن أنظمتنا وموظفينا يقدمون حلولاً عالية الجودة للعملاء. على سبيل المثال، الكثير من عملياتنا غير ورقية، مما يساعد على ضمان توفر ملفات العملاء والمعلومات على أساس سري لأي عضو مرخص في الفريق. وهذا يعني أن أيًا من أعضاء فريقنا يمكنه مساعدتك عند الاتصال، حتى لو كان جهة الاتصال المعتادة لديك خارج المكتب",
        img: "/icon 2.png",
      },
      {
        title: "النزاهة",
        description:
          "تمتلك شركة سكاي للوساطة التأمينية سمعة طيبة في الصناعة وبين العملاء بفضل خبرتها القوية، وخدمة العملاء السريعة الاستجابة، والمعرفة الممتازة بالمنتجات، وإدارة المخاطر النشطة والتحكم في الخسائر، بالإضافة إلى عمليات الدعم الفريدة للمطالبات. تجتمع هذه العناصر معًا لمساعدتنا على تحقيق القيمة الأساسية للنزاهة",
        img: "/icon 3.png",
      },
      {
        title: "العلاقات",
        description:
          "من البداية، كان شعارنا: نفخر بالعناية بعملائنا! نقدر العلاقات التي بنيناها مع عملائنا وشركات التأمين. يكمن وراء هذه الروابط القوية التزامنا بالاحترافية. كدليل على ذلك، يكفينا أن ننظر إلى العديد من إحالات العملاء التي نتلقاها - على الأرجح، أفضل إشادة لأي عمل تجاري",
        img: "/icon 4.png",
      },
    ],
  },
};

export default function ValuesSection() {
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
      className="py-24 bg-white"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerChildren}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <motion.div variants={fadeIn} className="text-center mb-16">
          <h2 className="text-5xl font-light text-blue-800 mb-4">
            {content[language as keyof typeof content].title}
          </h2>
          <p className="text-gray-800 text-xl max-w-xl mx-auto">
            {content[language as keyof typeof content].subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {content[language as keyof typeof content].items.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeIn}
              className="space-y-4"
            >
              <div className="mx-auto rounded-full flex items-center justify-center">
                <Image
                  src={item.img}
                  alt={item.title}
                  height={100}
                  width={100}
                />
              </div>
              <h3 className="text-3xl font-light text-blue-800 text-center ">
                {item.title}
              </h3>
              <p
                className="text-gray-800 text-xl 
              "
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
