import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Download, Mail, CheckCircle } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ConnectSection() {
  const [email, setEmail] = useState("");
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
      setEmail("");
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-sm text-amber-300">Free Download</span>
            </div>

            <h2 className="text-4xl lg:text-5xl text-white leading-tight font-bold">
              Get Your Free
              <span className="block bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Career Development Guide
              </span>
            </h2>

            <p className="text-lg text-white/80 leading-relaxed italic">
              Download our comprehensive 50-page e-book packed with actionable strategies, industry insights, and expert advice to accelerate your professional growth.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-white/90">10 proven strategies to advance your career</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-white/90">Exclusive insights from industry leaders</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-white/90">Practical worksheets and templates</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-white/90">Step-by-step action plans</span>
              </div>
            </div>

            <form onSubmit={handleDownload} className="pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-11 h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-amber-400"
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0 shadow-xl h-12 px-8"
                >
                  {downloaded ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Downloaded!
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download Free
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-white/60 mt-2">
                By downloading, you agree to receive updates. Unsubscribe anytime.
              </p>
            </form>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30 backdrop-blur-sm border border-white/20">
              {/* E-book mockup */}
              <div className="aspect-[4/5] bg-gradient-to-br from-slate-800 to-slate-900 p-8 flex items-center justify-center">
                <div className="relative w-full max-w-xs">
                  <div className="bg-white rounded-lg shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 p-8 text-white">
                      <div className="mb-6">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                          <span className="text-2xl">📚</span>
                        </div>
                        <h3 className="text-2xl mb-2 font-bold">Career Development Guide</h3>
                        <p className="text-sm text-white/90">Transform Your Professional Journey</p>
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-full"></div>
                        <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                        <div className="h-3 bg-slate-200 rounded w-4/6"></div>
                        <div className="mt-4 h-3 bg-slate-200 rounded w-full"></div>
                        <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                      </div>
                      <div className="mt-6 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"></div>
                        <div className="flex-1">
                          <div className="h-2 bg-slate-200 rounded w-20 mb-1"></div>
                          <div className="h-2 bg-slate-200 rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-xl"
            >
              <div className="text-center">
                <div className="text-2xl text-white">10K+</div>
                <div className="text-xs text-white/70">Downloads</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
