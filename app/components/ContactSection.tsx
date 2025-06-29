"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Linkedin } from "lucide-react";
import { useLanguage } from "@/app/LanguageContext";
import Image from "next/image";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const content = {
  en: {
    title: "Contact us.",
    phone: "Call us: 15759",
    email: "E-mail: ib@sky.eg",
    address: [
      "address: One Kattameya, 215, Maadi",
      "Kattameya Ringroad - Cairo, Egypt.",
    ],
    form: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      message: "Message",
      submit: "Send",
    },
  },
  ar: {
    title: "اتصل بنا",
    phone: "اتصل بنا على الرقم: 15759",
    email: "ib@sky.eg :البريد الإلكتروني",
    address: [
      "العنوان: القطامية ون، 215، طريق القطامية الدائري",
      "المعادي، القاهرة، مصر",
    ],
    form: {
      firstName: "الاسم الأول",
      lastName: "الاسم الاخير",
      email: "البريد الإكترونى",
      message: "الرسالة",
      submit: "إرسال",
    },
  },
};

const ContactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().email("Email must be valid"),
  message: z.string().optional(),
});

export default function ContactSection() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationResult = ContactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      validationResult.error.errors.forEach((error) =>
        toast.error(error.message)
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      id="contact"
      className="py-16 bg-[#020c3f] text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerChildren}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <ToastContainer position="bottom-right" />
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={fadeIn} className="space-y-6">
            <h2 className="text-4xl font-light">
              {content[language as keyof typeof content].title}
            </h2>
            <div className="space-y-2 text-2xl font-light w-96">
              <a href="tel:15759">
                {content[language as keyof typeof content].phone}
              </a>
              <br />
              <a href="mailto:ib@sky.eg">
                {content[language as keyof typeof content].email}
              </a>
              <br />
              {content[language as keyof typeof content].address.map(
                (line: string, index: number) => (
                  <a
                    href="https://maps.app.goo.gl/VsEioxBDNYkt6pRN8"
                    target="_blank"
                    key={index}
                  >
                    {line}
                  </a>
                )
              )}
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm">
                    {content[language as keyof typeof content].form.firstName}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="bg-white text-primary rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm">
                    {content[language as keyof typeof content].form.lastName}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="bg-white text-primary rounded-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm">
                  {content[language as keyof typeof content].form.email}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white text-primary rounded-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm">
                  {content[language as keyof typeof content].form.message}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-white text-primary rounded-none"
                  rows={4}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-primary hover:bg-gray-100 rounded-none w-auto"
              >
                {isSubmitting
                  ? "Sending..."
                  : content[language as keyof typeof content].form.submit}
              </Button>
            </form>
          </motion.div>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-5 md:mb-0">
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
              &copy; {new Date().getFullYear()} Sky Insurance. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
