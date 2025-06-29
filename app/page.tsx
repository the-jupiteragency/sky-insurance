import HeroSection from "@/app/components/HeroSection";
import StorySection from "@/app//components/StorySection";
import WhyInsuranceSection from "@/app//components/WhyInsuranceSection";
import ValuesSection from "@/app//components/ValueSection";
import LearnSection from "@/app//components/LearnSection";
import MoreToLearnSection from "@/app//components/MoreToLearnSection";
import BusinessInsuranceSection from "@/app/components/BusinessInsuranceSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <MoreToLearnSection />
      <ValuesSection />
      <WhyInsuranceSection />
      <BusinessInsuranceSection />
      <LearnSection />
    </>
  );
}
