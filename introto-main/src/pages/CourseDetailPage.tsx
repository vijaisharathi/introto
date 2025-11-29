import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  CheckCircle,
  BookOpen,
  CreditCard,
  Lock,
  Languages,
  Share2,
  Check,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  FileText,
  Headphones,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { coursesData } from "../data/coursesData";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface CourseDetailPageProps {
  courseId: number;
  onNavigate: (page: string, param?: number | string, scrollTo?: string) => void;
  scrollToSection?: string;
}

export function CourseDetailPage({ courseId, onNavigate, scrollToSection }: CourseDetailPageProps) {
  const course = coursesData.find((c) => c.id === courseId);
  const { isAuthenticated, enrollCourse, isEnrolled } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [copiedCourseId, setCopiedCourseId] = useState<number | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
  const [currency, setCurrency] = useState<string>("USD");

  // Currency conversion rates (base: USD)
  const currencyRates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    AED: 3.67,
    INR: 83.0,
  };

  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    AED: "د.إ",
    INR: "₹",
  };

  // Convert price based on selected currency
  const convertPrice = (priceInUSD: number): number => {
    return Math.round(priceInUSD * currencyRates[currency] * 100) / 100;
  };

  useEffect(() => {
    if (scrollToSection) {
      setTimeout(() => {
        const element = document.getElementById(scrollToSection);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [scrollToSection]);

  // refs for the "train on a track" payment card effect
  const mainRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // scroll-follow effect: move the card inside the track based on scroll progress (desktop only)
  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;
    let resizeTimeout: NodeJS.Timeout | null = null;

    const onScroll = () => {
      // Only run on desktop (lg breakpoint = 1024px)
      if (window.innerWidth < 1024) {
        // Reset styles on mobile - let natural flow position the card
        if (cardRef.current) {
          cardRef.current.style.position = "static";
          cardRef.current.style.transform = "none";
          cardRef.current.style.transition = "none";
          cardRef.current.style.willChange = "auto";
        }
        if (trackRef.current) {
          trackRef.current.style.height = "auto";
        }
        ticking = false;
        return;
      }

      if (!mainRef.current || !trackRef.current || !cardRef.current) {
        ticking = false;
        return;
      }

      const mainRect = mainRef.current.getBoundingClientRect();
      const cardEl = cardRef.current;

      const mainTop = window.scrollY + mainRect.top;
      const mainHeight = mainRect.height;
      const cardHeight = cardEl.offsetHeight;

      // set the track container height to match the main content so the card can travel full length
      trackRef.current.style.height = `${mainHeight}px`;

      const start = mainTop;
      const end = mainTop + Math.max(0, mainHeight - cardHeight);

      const scrollY = window.scrollY;
      const progress = (scrollY - start) / Math.max(1, end - start);
      const clamped = Math.min(1, Math.max(0, progress));

      const translate = clamped * Math.max(0, mainHeight - cardHeight);

      // apply transform with smooth transitions
      cardEl.style.position = "absolute";
      cardEl.style.top = "0px";
      cardEl.style.left = "0px";
      cardEl.style.width = "100%";
      cardEl.style.willChange = "transform";
      cardEl.style.transition = "transform 0.2s ease-out";
      cardEl.style.transform = `translate3d(0, ${translate}px, 0)`;
      
      ticking = false;
    };

    const scrollHandler = () => {
      if (!ticking) {
        if (rafId) cancelAnimationFrame(rafId);
        ticking = true;
        rafId = requestAnimationFrame(onScroll);
      }
    };

    const resizeHandler = () => {
      // Debounce resize events
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(onScroll);
      }, 150);
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    window.addEventListener("resize", resizeHandler);

    // run once to initialize
    onScroll();

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", resizeHandler);
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [showPayment]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl text-white mb-4 font-bold">Course Not Found</h1>
          <Button onClick={() => onNavigate("courses")}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const enrolled = isEnrolled(courseId);

  const handleEnrollment = () => {
    if (!isAuthenticated) {
      onNavigate("login");
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    enrollCourse(courseId);
    onNavigate("lms", courseId);
  };

  const handleShareCourse = async () => {
    const courseLink = `${window.location.origin}/course-detail/${courseId}`;
    try {
      await navigator.clipboard.writeText(courseLink);
      setCopiedCourseId(courseId);
      setTimeout(() => setCopiedCourseId(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = courseLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedCourseId(courseId);
      setTimeout(() => setCopiedCourseId(null), 2000);
    }
  };

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const getContentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return <PlayCircle className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      case 'pdf':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  if (enrolled) {
    onNavigate("lms", courseId);
    return null;
  }

  const message = course.category === "Technology"
    ? "The only way to do great work is to love what you do."
    : course.category === "Marketing"
    ? "Marketing is no longer about the stuff you make, but about the stories you tell."
    : course.category === "Business"
    ? "The best investment you can make is in yourself."
    : "Design is not just what it looks like, it is how it works.";

  const motivationalQuote = `${message} - Start your journey today!`;

  return (
    <div className="min-h-screen pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => onNavigate("courses")}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </button>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content - Always first */}
          <div ref={mainRef} className="lg:col-span-2 space-y-6 sm:space-y-8 order-1">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm">
                <ImageWithFallback
                  src={course.image}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-sm">
                      {course.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                      {course.level}
                    </span>
                  </div>

                  <h1 className="text-4xl text-white mb-4 font-bold">{course.title}</h1>

                  <p className="text-lg text-white/80 mb-6 italic">{course.description}</p>

                  <div className="flex flex-wrap items-center gap-6 text-white/70">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="w-5 h-5" />
                      <span>English</span>
                    </div>
                    <button
                      onClick={handleShareCourse}
                      className="flex items-center gap-2 hover:text-amber-300 transition-colors cursor-pointer"
                      title="Share course"
                    >
                      {copiedCourseId === courseId ? (
                        <>
                          <Check className="w-5 h-5 text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-5 h-5" />
                          <span>Share</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Motivational Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
            >
              <p className="text-lg text-amber-200 italic text-center">{motivationalQuote}</p>
            </motion.div>

            {/* Learning Outcomes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-sm">
                <h2 className="text-2xl text-white mb-6 font-bold">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.learningOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{outcome}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Instructor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-sm">
                <h2 className="text-2xl text-white mb-6 font-bold">Your Instructor</h2>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl flex-shrink-0">
                    {course.instructor.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-1 font-bold">{course.instructor.name}</h3>
                    <p className="text-amber-300 mb-2">{course.instructor.title}</p>
                    <p className="text-white/70 italic">{course.instructor.bio}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Course Curriculum */}
            <motion.div id="curriculum" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
              <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-sm">
                <h2 className="text-2xl text-white mb-6 font-bold">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.modules.map((module, idx) => {
                    const isExpanded = expandedModules.has(module.id);
                    return (
                      <div key={module.id} className="rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all hover:border-white/20">
                        {/* Module Header - Always Visible */}
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="w-full p-4 flex items-start gap-4 hover:bg-white/5 transition-colors text-left"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white flex-shrink-0 font-semibold">
                            {idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-white mb-1 font-bold">{module.title}</h3>
                                <p className="text-sm text-white/70 mb-2 italic">{module.description}</p>
                                <div className="flex items-center gap-4 text-sm text-white/60 flex-wrap">
                                  <span className="flex items-center gap-1">
                                    {getContentIcon(module.content.type)}
                                    {module.content.type.toUpperCase()}
                                  </span>
                                  {module.content.duration && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {module.content.duration}
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" />
                                    {module.quiz.questions.length} quiz {module.quiz.questions.length === 1 ? 'question' : 'questions'}
                                  </span>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-white/70 transition-transform" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-white/70 transition-transform" />
                                )}
                              </div>
                            </div>
                          </div>
                        </button>

                        {/* Expanded Content - Tree-like Structure */}
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-0 border-t border-white/10 ml-14">
                              <div className="space-y-4 pt-4">
                                {/* What You'll Learn Section */}
                                <div className="space-y-2">
                                  <h4 className="text-white font-bold flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    What You'll Learn
                                  </h4>
                                  <div className="pl-6 space-y-2">
                                    <div className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                                      <p className="text-sm text-white/80 italic">Master the core concepts and fundamentals covered in this module</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                                      <p className="text-sm text-white/80 italic">Apply practical skills through hands-on exercises and examples</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                                      <p className="text-sm text-white/80 italic">Understand real-world applications and use cases</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Content Breakdown */}
                                <div className="space-y-2">
                                  <h4 className="text-white font-bold flex items-center gap-2">
                                    {getContentIcon(module.content.type)}
                                    Module Content
                                  </h4>
                                  <div className="pl-6 space-y-3">
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                                      <div className="mt-0.5">
                                        {getContentIcon(module.content.type)}
                                      </div>
                                      <div className="flex-1">
                                        <div className="text-white text-sm font-medium mb-1">
                                          {module.title} - {module.content.type.charAt(0).toUpperCase() + module.content.type.slice(1)}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-white/60">
                                          {module.content.duration && (
                                            <span className="flex items-center gap-1">
                                              <Clock className="w-3 h-3" />
                                              {module.content.duration}
                                            </span>
                                          )}
                                          <span className="capitalize">{module.content.type}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Quiz Information */}
                                <div className="space-y-2">
                                  <h4 className="text-white font-bold flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" />
                                    Assessment
                                  </h4>
                                  <div className="pl-6">
                                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                      <p className="text-sm text-white/80 mb-2">
                                        This module includes <span className="text-amber-300 font-semibold">{module.quiz.questions.length}</span> quiz {module.quiz.questions.length === 1 ? 'question' : 'questions'} to test your understanding.
                                      </p>
                                      <div className="space-y-2 mt-3">
                                        {module.quiz.questions.slice(0, 3).map((question, qIdx) => (
                                          <div key={question.id} className="flex items-start gap-2 text-xs text-white/70">
                                            <span className="text-amber-300 font-medium">{qIdx + 1}.</span>
                                            <span>{question.question}</span>
                                          </div>
                                        ))}
                                        {module.quiz.questions.length > 3 && (
                                          <p className="text-xs text-white/60 italic">
                                            + {module.quiz.questions.length - 3} more {module.quiz.questions.length - 3 === 1 ? 'question' : 'questions'}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar - Enrollment - Shows below curriculum on mobile, beside on desktop */}
          <div className="lg:col-span-1 order-2">
            <div ref={trackRef} className="relative">
              <div ref={cardRef} className="w-full">
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                  <Card className="p-6 sm:p-8 border-white/10 bg-white/5 backdrop-blur-sm">
                    {!showPayment ? (
                      <>
                        <div className="text-center mb-6">
                          <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="text-5xl text-white">
                              {currencySymbols[currency]}{convertPrice(course.price)}
                            </div>
                            <Select value={currency} onValueChange={setCurrency}>
                              <SelectTrigger className="h-8 w-24 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white text-xs font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-900/95 backdrop-blur-md border border-white/20 shadow-xl rounded-lg min-w-[100px] p-1">
                                <SelectItem value="USD" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-md cursor-pointer py-2 px-3 text-xs font-medium transition-colors">
                                  USD
                                </SelectItem>
                                <SelectItem value="EUR" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-md cursor-pointer py-2 px-3 text-xs font-medium transition-colors">
                                  EUR
                                </SelectItem>
                                <SelectItem value="GBP" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-md cursor-pointer py-2 px-3 text-xs font-medium transition-colors">
                                  GBP
                                </SelectItem>
                                <SelectItem value="AED" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-md cursor-pointer py-2 px-3 text-xs font-medium transition-colors">
                                  AED
                                </SelectItem>
                                <SelectItem value="INR" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-md cursor-pointer py-2 px-3 text-xs font-medium transition-colors">
                                  INR
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <p className="text-white/70">One-time payment</p>
                        </div>

                        <Button onClick={handleEnrollment} size="lg" className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0 shadow-xl mb-4">Enroll Now</Button>

                        <div className="space-y-3 pt-6 border-t border-white/10">
                          <div className="flex items-center gap-3 text-white/90"><CheckCircle className="w-5 h-5 text-green-400" /><span>Lifetime access</span></div>
                          <div className="flex items-center gap-3 text-white/90"><CheckCircle className="w-5 h-5 text-green-400" /><span>Certificate of completion</span></div>
                          <div className="flex items-center gap-3 text-white/90"><CheckCircle className="w-5 h-5 text-green-400" /><span>24/7 support</span></div>
                          <div className="flex items-center gap-3 text-white/90"><CheckCircle className="w-5 h-5 text-green-400" /><span>Access on mobile & desktop</span></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl text-white mb-6 text-center font-bold">Payment Details</h3>

                        <form onSubmit={handlePayment} className="space-y-4">
                          <div>
                            <Label htmlFor="cardName" className="text-white mb-2 block">Cardholder Name</Label>
                            <Input id="cardName" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required className="bg-white/10 border-white/30 text-white placeholder:text-white/50" />
                          </div>

                          <div>
                            <Label htmlFor="cardNumber" className="text-white mb-2 block">Card Number</Label>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                              <Input id="cardNumber" type="text" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required maxLength={19} className="pl-11 bg-white/10 border-white/30 text-white placeholder:text-white/50" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry" className="text-white mb-2 block">Expiry Date</Label>
                              <Input id="expiry" type="text" placeholder="MM/YY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required maxLength={5} className="bg-white/10 border-white/30 text-white placeholder:text-white/50" />
                            </div>
                            <div>
                              <Label htmlFor="cvv" className="text-white mb-2 block">CVV</Label>
                              <Input id="cvv" type="text" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} required maxLength={3} className="bg-white/10 border-white/30 text-white placeholder:text-white/50" />
                            </div>
                          </div>

                          <div className="pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between text-white mb-3">
                              <span>Total</span>
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">
                                  {currencySymbols[currency]}{convertPrice(course.price)}
                                </span>
                                <Select value={currency} onValueChange={setCurrency}>
                                  <SelectTrigger className="h-8 w-24 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white text-xs font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-slate-900/95 backdrop-blur-md border border-white/20 shadow-xl rounded-lg min-w-[100px] p-1">
                                    <SelectItem value="USD" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-md cursor-pointer py-2 px-3 text-xs font-medium transition-colors">
                                      USD
                                    </SelectItem>
                                    <SelectItem value="EUR" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-md cursor-pointer py-2 px-3 text-xs font-medium transition-colors">
                                      EUR
                                    </SelectItem>
                                    <SelectItem value="GBP" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-md cursor-pointer py-2 px-3 text-xs font-medium transition-colors">
                                      GBP
                                    </SelectItem>
                                    <SelectItem value="AED" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-md cursor-pointer py-2 px-3 text-xs font-medium transition-colors">
                                      AED
                                    </SelectItem>
                                    <SelectItem value="INR" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-md cursor-pointer py-2 px-3 text-xs font-medium transition-colors">
                                      INR
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white border-0 shadow-xl"><Lock className="w-4 h-4 mr-2" />Complete Payment</Button>

                          <Button type="button" variant="outline" onClick={() => setShowPayment(false)} className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20">Cancel</Button>
                        </form>

                        <div className="mt-4 text-xs text-white/60 text-center"><Lock className="w-3 h-3 inline mr-1" />Secure payment powered by Stripe</div>
                      </>
                    )}
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
