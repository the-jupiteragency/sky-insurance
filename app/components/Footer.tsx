"use client";

import { useLanguage } from "@/app/LanguageContext";
import Image from "next/image";
import { Facebook, Linkedin } from "lucide-react";

const content = {
  en: {
    rights: "All rights reserved",
    links: [
      { name: "Home", href: "/" },
      { name: "Services", href: "/services" },
      { name: "Contact", href: "/#contact" },
    ],
  },
  ar: {
    rights: "جميع الحقوق محفوظة",
    links: [
      { name: "الرئيسية", href: "/" },
      { name: "الخدمات", href: "/services" },
      { name: "اتصل بنا", href: "/#contact" },
    ],
  },
};

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-blue-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Image
              src="/logo.png"
              alt="Sky Insurance"
              width={100}
              height={100}
            />
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/skyinsurancebrokerage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://www.linkedin.com/company/sky-insurance-brokerage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Sky Insurance.{" "}
            {content[language as keyof typeof content].rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}
