import { motion } from "motion/react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const heroImages = [
  "https://images.unsplash.com/photo-1762330919025-a9acfd4aaae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvbmxpbmUlMjBsZWFybmluZyUyMHN0dWRlbnR8ZW58MXx8fHwxNzYyNDg4NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1762176263996-a0713a49ee4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGFzc3Jvb20lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MjQ2MTg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1541560052-5e137f229371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvcmtpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzYyNDg4NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYyNDE3NDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

interface HeroSectionProps {
  onNavigate: (page: string, sectionId?: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative min-h-screen flex items-start pt-8 pb-1 sm:pb-1 md:pb-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight font-bold">
              Transform Yourself with
              <span className="block text-orange-500">
                Bharat's Distilled Wisdom
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl italic">
              Deep knowledge made clear, practical and relevant - from the greatest minds to you - the curious seeker
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg"
                onClick={() => onNavigate("home", "courses")}
                className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0 shadow-xl shadow-amber-500/30 w-fit"
              >
                Start Learning
              </Button>
              <Button 
                size="lg"
                onClick={() => onNavigate("about")}
                className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white border-0 shadow-xl shadow-teal-500/30 w-fit"
              >
                Introto Story
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4 sm:pt-6">
              <div>
                <div className="text-2xl sm:text-3xl text-white">5K+</div>
                <div className="text-xs sm:text-sm text-white/70">Learners</div>
              </div>
              <div className="w-px h-8 sm:h-12 bg-white/20"></div>
              <div>
                <div className="text-2xl sm:text-3xl text-white">10+</div>
                <div className="text-xs sm:text-sm text-white/70">Expert Courses</div>
              </div>
              <div className="w-px h-8 sm:h-12 bg-white/20"></div>
              <div>
                <div className="text-2xl sm:text-3xl text-white">98%</div>
                <div className="text-xs sm:text-sm text-white/70">Positive Approval</div>
              </div>
            </div>
          </motion.div>

          {/* Right Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30 backdrop-blur-sm border border-white/20">
              <div className="aspect-[4/3] relative">
                {heroImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: idx === currentImage ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`Hero ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400/30 to-orange-500/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-teal-500/30 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
