import { LanguageProvider } from "@/app/LanguageContext";
import Navbar from "@/app/components/Navbar";
import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";
import ContactSection from "@/app/components/ContactSection";

const Arial = localFont({
  src: "./fonts/Arial.ttf",
  variable: "--font-Arial",
});

export const metadata: Metadata = {
  title: "Sky Insurance",
  description: "Preserving Prosperity, Providing Peace of Mind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Arial.variable} antialiased`}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <ContactSection />
        </LanguageProvider>
      </body>
    </html>
  );
}
