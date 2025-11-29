import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { Differentiators } from "../components/Differentiators";
import { CoursesSection } from "../components/CoursesSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { PrinciplesSection } from "../components/PrinciplesSection";
import { useEffect } from "react";

interface LandingPageProps {
  onNavigate: (page: string, param?: number | string, scrollTo?: string) => void;
  scrollToSection?: string;
}

export function LandingPage({ onNavigate, scrollToSection }: LandingPageProps) {
  useEffect(() => {
    if (scrollToSection) {
      const element = document.getElementById(scrollToSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [scrollToSection]);

  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <AboutSection />
      <Differentiators />
      <div id="courses">
        <CoursesSection onNavigate={onNavigate} showAll={false} scrollToCurriculum={true} />
      </div>
      <TestimonialsSection />
      <PrinciplesSection />
    </>
  );
}
