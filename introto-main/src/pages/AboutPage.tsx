import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Award, Users, Globe, TrendingUp, Target, Heart, Lightbulb, GraduationCap, Rocket, Sparkles, BookOpen, Zap } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const achievements = [
  {
    icon: Users,
    title: "50,000+",
    description: "Active Learners Worldwide",
    color: "from-blue-400 to-indigo-500"
  },
  {
    icon: Award,
    title: "200+",
    description: "Expert-Led Courses",
    color: "from-amber-400 to-orange-500"
  },
  {
    icon: Globe,
    title: "150+",
    description: "Countries Reached",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: TrendingUp,
    title: "98%",
    description: "Student Satisfaction",
    color: "from-purple-400 to-pink-500"
  }
];

const milestones = [
  { year: "2010", event: "Founded by Sarah Johnson with a vision to democratize education" },
  { year: "2013", event: "Reached 10,000 students across 50 countries" },
  { year: "2016", event: "Won 'Best EdTech Platform' award" },
  { year: "2019", event: "Launched corporate training programs" },
  { year: "2022", event: "Partnership with Fortune 500 companies" },
  { year: "2025", event: "50,000+ students and expanding globally" }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1675434301763-594b4d0c5819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MjQxNTM3NHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYyNDE3NDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1759560245150-8dcbb7f01142?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF3YXJkJTIwdHJvcGh5fGVufDF8fHx8MTc2MjQxODk1NXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1762330919025-a9acfd4aaae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvbmxpbmUlMjBsZWFybmluZyUyMHN0dWRlbnR8ZW58MXx8fHwxNzYyNDg4NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
];

export function AboutPage() {
  return (
    <div className="min-h-screen pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 max-w-5xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-6 leading-tight">
            About{" "}
            <span className="text-orange-500">
              Introto
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white mb-4 max-w-2xl mx-auto italic">
            Empowering individuals and organizations through transformative education since 2010
          </p>
        </motion.div>

        {/* Founder Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-96 md:h-auto">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758691737644-ef8be18256c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3VuZGVyJTIwZW50cmVwcmVuZXVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYyNDkxNjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-3 sm:mb-4 w-fit">
                  <span className="text-xs sm:text-sm text-amber-300">Our Founder</span>
                </div>
                <h2 className="text-2xl sm:text-3xl text-white mb-3 sm:mb-4 font-bold">Sarah Johnson</h2>
                <p className="text-sm sm:text-base text-amber-300 mb-4 sm:mb-6">Founder & CEO</p>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                    </div>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed italic">
                      Founded Introto in 2010 with a vision to make high-quality education accessible to everyone, everywhere
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-amber-400" />
                    </div>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed italic">
                      Experienced firsthand the transformative power of learning, coming from a background with limited educational opportunities
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Target className="w-5 h-5 text-amber-400" />
                    </div>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed italic">
                      "I believe that education is the great equalizer. Everyone deserves access to knowledge that can change their lives."
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Rocket className="w-5 h-5 text-amber-400" />
                    </div>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed italic">
                      Under her leadership, Introto has grown from a small startup to a global platform, touching the lives of over 50,000 learners across 150+ countries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-6 font-bold">Our <span className="text-white">Story</span></h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4 sm:px-0 italic">
              From a small idea to a global movement in education
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {/* The Beginning */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 sm:p-8 border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all cursor-pointer">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl text-white mb-3 font-bold">The Beginning</h3>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed italic">
                      Introto was born out of frustration with the traditional education system's limitations. Sarah Johnson, having struggled to access quality education in her youth, recognized that millions of talented individuals worldwide faced similar barriers.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* The Launch */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 sm:p-8 border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all cursor-pointer">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl text-white mb-3 font-bold">The Launch (2010)</h3>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-3">
                      Armed with nothing but a laptop, determination, and a deep belief in the power of education, Sarah launched the first version of Introto from her apartment.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-amber-300">
                      <Zap className="w-4 h-4" />
                      <span>The initial course "Digital Skills for the Modern World" attracted 100 students in the first month</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* The Growth */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 sm:p-8 border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all cursor-pointer">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl text-white mb-3 font-bold">The Growth</h3>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-4">
                      What started as a one-woman operation quickly grew into a passionate team of educators, technologists, and dreamers united by a common goal: to democratize access to world-class education.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <BookOpen className="w-4 h-4 text-amber-400" />
                        <span>Partnered with industry experts</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <GraduationCap className="w-4 h-4 text-amber-400" />
                        <span>Refined teaching methodology</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Target className="w-4 h-4 text-amber-400" />
                        <span>Created engaging learning experiences</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Users className="w-4 h-4 text-amber-400" />
                        <span>Built a passionate team</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Today & Future */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 sm:p-8 border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all cursor-pointer">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl text-white mb-3 font-bold">Today & The Future</h3>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-4">
                      Today, Introto stands as a testament to what's possible when passion meets purpose. We've helped thousands of professionals advance their careers, supported hundreds of companies in upskilling their workforce, and created a vibrant global community of lifelong learners.
                    </p>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed italic">
                        "But we're just getting started. Our mission remains the same: to empower every individual with the knowledge and skills they need to thrive in an ever-changing world."
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-6 font-bold">Our <span className="text-white">Achievements</span></h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4 sm:px-0 italic">
              Milestones that mark our journey of excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-4 sm:p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all h-full text-center cursor-pointer">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                    <achievement.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl text-white mb-2">{achievement.title}</div>
                  <p className="text-sm sm:text-base text-white/70 italic">{achievement.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <Card className="p-4 sm:p-6 md:p-8 border-white/10 bg-white/5 backdrop-blur-sm">
            <h3 className="text-xl sm:text-2xl text-white mb-6 sm:mb-8 text-center font-bold">Our Journey</h3>
            <div className="space-y-4 sm:space-y-6">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white flex-shrink-0">
                      {milestone.year.slice(2)}
                    </div>
                    {idx < milestones.length - 1 && (
                      <div className="w-px h-full min-h-[3rem] bg-gradient-to-b from-amber-500/50 to-transparent mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="text-amber-300 mb-1">{milestone.year}</div>
                    <p className="text-white/90">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-6 font-bold">Gallery</h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4 sm:px-0 italic">
              Glimpses of our team, office, and community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                <ImageWithFallback
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-6 font-bold">Our Core <span className="text-white">Values</span></h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4 sm:px-0 italic">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Excellence", description: "We strive for excellence in every course, every interaction, and every outcome." },
              { icon: Heart, title: "Empathy", description: "We understand our learners' challenges and design experiences that truly support their journey." },
              { icon: Globe, title: "Accessibility", description: "Quality education should be available to everyone, everywhere, without barriers." }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all cursor-pointer h-full">
                  <value.icon className="w-12 h-12 text-amber-400 mb-4" />
                  <h3 className="text-xl text-white mb-3 font-bold">{value.title}</h3>
                  <p className="text-white/70 leading-relaxed italic">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
