import { motion } from "motion/react";
import { Play, Users, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutSection() {
  return (
    <section id="about" className="pt-0.65 sm:pt-0.65 md:pt-0.65 pb-16 sm:pb-20 md:pb-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image/Video */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20 border border-white/20 backdrop-blur-sm">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758687126375-e2c1683219e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBtZW50b3IlMjB0ZWFjaGluZ3xlbnwxfHx8fDE3NjI0ODg0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Education mentoring"
                className="w-full aspect-[4/3] object-cover"
              />
              
              {/* Video Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all hover:scale-110 shadow-xl">
                  <Play className="w-8 h-8 text-slate-900 ml-1" fill="currentColor" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white leading-tight font-bold break-words">
              Restoring Bharat's Civilizational Wisdom.
              <br />
              <span className="bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
                For Every Seeker
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed text-justify italic">
              introto.in offers scientifically designed introductory courses on Indian Knowledge Systems — Bharatiya Jnana Parampara. Its mission is to make this wisdom clear, accessible, and factual, based on the works of Bharat's greatest scholars. In essence, it's Jnana Marga — the path of knowledge — for rebuilding Bharatiya civilization.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <h4 className="text-white mb-1 font-bold">Self-Paced Study</h4>
                  <p className="text-base sm:text-lg text-white/70 italic">Your schedule - accessible<br />anytime, anywhere</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <h4 className="text-white mb-1 font-bold">Micro Sessions</h4>
                  <p className="text-base sm:text-lg text-white/70 italic">Videos capped at 10 mins -<br />your bite-sized advantage</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
