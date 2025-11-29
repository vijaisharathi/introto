import { motion } from "motion/react";
import { Card } from "./ui/card";
import { useState, useEffect } from "react";

const principles = [
  {
    id: 1,
    title: "Innovation First",
    quote: "We believe in pushing boundaries and constantly evolving our curriculum to stay ahead of industry trends.",
    author: "Dr. Maria Santos",
    role: "Chief Learning Officer",
    gradient: "from-yellow-400 to-amber-500"
  },
  {
    id: 2,
    title: "Student-Centric Approach",
    quote: "Every decision we make starts with one question: How does this benefit our learners?",
    author: "Alex Thompson",
    role: "Head of Student Success",
    gradient: "from-rose-400 to-pink-500"
  },
  {
    id: 3,
    title: "Excellence in Execution",
    quote: "Quality isn't an act, it's a habit. We deliver excellence in every course, every lesson, every interaction.",
    author: "James Liu",
    role: "VP of Content",
    gradient: "from-blue-400 to-indigo-500"
  },
  {
    id: 4,
    title: "Integrity & Trust",
    quote: "We build lasting relationships through transparency, honesty, and unwavering commitment to our promises.",
    author: "Sarah Johnson",
    role: "CEO & Founder",
    gradient: "from-teal-400 to-emerald-500"
  }
];

export function PrinciplesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % principles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentPrinciple = principles[currentSlide];

  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden" style={{ fontFamily: 'Calibri, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 sm:mb-6 px-4 sm:px-0 font-bold">
            <span className="text-white">Wisdom that guides</span> <span className="bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">Introto</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4 sm:px-0 italic">
            The founding principles that keep Introto aligned with its purpose<br />- to revive, transmit and live Bharat's Knowledge Systems
          </p>
        </motion.div>

        <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-0">
          <div className="mb-8">
            <div className="relative">
              {/* Background glowing gradient border effect */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-lg"></div>
              
              <motion.div
                key={currentPrinciple.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <Card className="p-8 sm:p-10 md:p-12 border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all h-full flex flex-col">
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl text-white mb-4 font-bold">{currentPrinciple.title}</h3>

                  {/* Quote */}
                  <p className="text-base sm:text-lg text-white/90 mb-6 flex-1 leading-relaxed italic">
                    {currentPrinciple.quote}
                  </p>

                  {/* Replacement Text */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/70 italic">
                      These principles guide our mission to deliver exceptional learning experiences and empower students worldwide.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2">
            {principles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide 
                    ? 'w-8 bg-amber-400' 
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
