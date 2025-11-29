import React from "react";
import { motion } from "motion/react";
import { 
  Award, 
  Clock, 
  Globe, 
  HeadphonesIcon, 
  Shield, 
  Zap,
  BookOpen,
  Target
} from "lucide-react";

const differentiators = [
  {
    icon: Award,
    title: "Trusted Indian Wisdom",
    description: "Join 5K+ learners<br />across 19 countries<br />— with a 98% positive impact rating",
    gradient: "from-amber-400 to-orange-500"
  },
  {
    icon: Clock,
    title: "Dharmic Credentials",
    description: "Knowledge drawn strictly from Dharmic sources — designed for real-life impact",
    gradient: "from-blue-400 to-indigo-500"
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Connect with learners from 150+ countries",
    gradient: "from-teal-400 to-cyan-500"
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Expert Support",
    description: "Get help whenever you need it from our dedicated team",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    icon: Shield,
    title: "Active Reflection",
    description: "Apply what you learn through engaging work — practice, not just theory",
    gradient: "from-green-400 to-emerald-500"
  },
  {
    icon: Zap,
    title: "Global Learner Circle",
    description: "Connect with seekers from around the world exploring Indian wisdom together",
    gradient: "from-yellow-400 to-amber-500"
  },
  {
    icon: BookOpen,
    title: "Tailored Learning Paths",
    description: "Choose a journey that fits your goals — from curious seeker to confident pioneer",
    gradient: "from-rose-400 to-red-500"
  },
  {
    icon: Target,
    title: "Learning that Sticks",
    description: "Insights built for real retention — reflect and apply so ideas stay with you for life",
    gradient: "from-violet-400 to-purple-500"
  }
];

export function Differentiators() {
  return (
    <section className="py-16 sm:py-20 md:py-24 relative" style={{ fontFamily: 'Calibri, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 sm:mb-6 px-4 sm:px-0 font-bold">
            <span className="block text-white">Civilizational Clarity. Real Transformation.</span>
            <span className="block bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
              Everyday Insights for Empowerment
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto italic px-4 sm:px-0">
            Short, powerful courses that bring India&apos;s wisdom into your modern life<br />- for curious professionals, learners and seekers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all hover:shadow-xl hover:shadow-black/20 flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                
                <h3 className="text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
