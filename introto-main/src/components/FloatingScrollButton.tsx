import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export function FloatingScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility(); // Check initial position

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed right-4 sm:right-8 bottom-4 sm:bottom-8 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 hover:from-amber-500 hover:via-orange-600 hover:to-orange-700 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 z-[9999] group animate-fade-in animate-pulse-slow"
      aria-label="Scroll to top"
      style={{
        boxShadow: '0 10px 40px rgba(251, 146, 60, 0.4)',
      }}
    >
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300 animate-ping-slow"></div>
      
      {/* Inner icon */}
      <div className="relative z-10">
        <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:animate-bounce drop-shadow-lg" strokeWidth={3} />
      </div>
    </button>
  );
}







