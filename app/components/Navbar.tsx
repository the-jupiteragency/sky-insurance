"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/app/LanguageContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const content = {
  en: {
    home: "Home",
    services: "Services",
    contact: "Contact",
    offers: "Quotes & Offers",
  },
  ar: {
    home: "الصفحة الرئيسية",
    services: "خدماتنا",
    contact: "اتصل بنا",
    offers: "عروضنا وأسعارنا",
  },
};

export default function Component() {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";
  const textColor = isHomePage && !isScrolled ? "text-white" : "text-black";
  const bgColor = isScrolled ? "bg-white" : "bg-transparent";

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-colors duration-300 ${bgColor}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-2 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src="/logo.png?height=75&width=75"
              alt="Sky Insurance"
              width={75}
              height={75}
            />
          </Link>

          <div className="flex items-center space-x-5">
            <NavLink href="/" textColor={textColor}>
              {content[language as keyof typeof content].home}
            </NavLink>
            <NavLink href="/services" textColor={textColor}>
              {content[language as keyof typeof content].services}
            </NavLink>
            <NavLink href="#contact" textColor={textColor}>
              {content[language as keyof typeof content].contact}
            </NavLink>
            <NavLink href="/quote" textColor={textColor}>
              {content[language as keyof typeof content].offers}
            </NavLink>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className={textColor}
            >
              <Languages className="h-5 w-5" />
              <span className="sr-only">
                {language === "en" ? "Switch to Arabic" : "Switch to English"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({
  href,
  children,
  textColor,
}: {
  href: string;
  children: React.ReactNode;
  textColor: string;
}) {
  return (
    <Link
      href={href}
      className={`${textColor} hover:text-blue-900 transition-colors relative group`}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-900 transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </Link>
  );
}
