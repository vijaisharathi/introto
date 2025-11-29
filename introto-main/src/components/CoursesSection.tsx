import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Clock, Users, ArrowRight, Languages, Share2, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { coursesData } from "../data/coursesData";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CoursesSectionProps {
  onNavigate: (page: string, courseId?: number | string, scrollTo?: string) => void;
  showAll?: boolean;
  searchQuery?: string;
  selectedCategory?: string;
  scrollToCurriculum?: boolean;
}

export function CoursesSection({ onNavigate, showAll = false, searchQuery = "", selectedCategory = "All", scrollToCurriculum = false }: CoursesSectionProps) {
  const [currency, setCurrency] = useState<string>("USD");
  const [copiedCourseId, setCopiedCourseId] = useState<number | null>(null);
  
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

  // Filter courses by search query and category
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayCourses = showAll ? filteredCourses : filteredCourses.slice(0, 6);

  // Convert price based on selected currency
  const convertPrice = (priceInUSD: number): number => {
    return Math.round(priceInUSD * currencyRates[currency] * 100) / 100;
  };
  
  // Group courses by segment
  const flagshipCourses = displayCourses.filter(c => c.segment === 'flagship');
  const microCourses = displayCourses.filter(c => c.segment === 'micro');
  const wipCourses = displayCourses.filter(c => c.segment === 'wip');

  const handleShareCourse = async (courseId: number) => {
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

  const renderCourseGrid = (courses: typeof coursesData, segmentTitle: string, segmentColor: string) => {
    if (courses.length === 0) return null;
    
    return (
      <div className="mb-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl text-white font-bold">{segmentTitle}</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all h-full flex flex-col group">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs text-slate-900">
                      {course.category}
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500 text-xs text-white">
                      {course.level}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Centered Title */}
                    <h3 className="text-white text-center mb-2 text-lg font-bold group-hover:text-amber-300 transition-colors">
                      {course.title}
                    </h3>

                    {/* Centered Icon Details */}
                    <div className="flex items-center justify-center gap-6 mb-4 text-sm text-white/70 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Languages className="w-4 h-4" />
                        <span>English</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShareCourse(course.id);
                        }}
                        className="flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer"
                        title="Share course"
                      >
                        {copiedCourseId === course.id ? (
                          <>
                            <Check className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Brief Description (4 lines) */}
                    <p className="text-white/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-4 text-center italic">
                      {course.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl text-white">
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
                      <Button 
                        size="sm"
                        onClick={() => onNavigate("course-detail", course.id, scrollToCurriculum ? "curriculum" : undefined)}
                        className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0 group-hover:shadow-lg"
                      >
                        Enroll Now
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      );
    };

  return (
    <section id="courses" className="py-16 sm:py-20 md:py-24 relative" style={{ fontFamily: 'Calibri, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 sm:mb-6 px-4 sm:px-0 font-bold">
              <span className="text-white">Premium Courses.</span> <span className="bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">Timeless Wisdom</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto italic px-4 sm:px-0">
              Built for clarity and reflection - designed for real-world transformation without complexity or jargon
            </p>
          </motion.div>
        )}

        {showAll ? (
          <>
            {/* Flagship Courses */}
            {renderCourseGrid(flagshipCourses, "Flagship Courses", "bg-amber-500/20 text-amber-300 border border-amber-500/30")}
            
            {/* Micro Courses */}
            {renderCourseGrid(microCourses, "Micro Courses", "bg-blue-500/20 text-blue-300 border border-blue-500/30")}
            
            {/* WIP Courses */}
            {renderCourseGrid(wipCourses, "WIP Courses", "bg-green-500/20 text-green-300 border border-green-500/30")}
          </>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayCourses.map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all h-full flex flex-col group">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs text-slate-900">
                        {course.category}
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500 text-xs text-white">
                        {course.level}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      {/* Centered Title */}
                      <h3 className="text-white text-center mb-2 text-lg font-bold group-hover:text-amber-300 transition-colors">
                        {course.title}
                      </h3>

                      {/* Centered Icon Details */}
                      <div className="flex items-center justify-center gap-6 mb-4 text-sm text-white/70 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Languages className="w-4 h-4" />
                          <span>English</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShareCourse(course.id);
                          }}
                          className="flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer"
                          title="Share course"
                        >
                          {copiedCourseId === course.id ? (
                            <>
                              <Check className="w-4 h-4 text-green-400" />
                              <span className="text-green-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-4 h-4" />
                              <span>Share</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Brief Description (4 lines) */}
                      <p className="text-white/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-4 text-center italic">
                        {course.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl text-white">
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
                        <Button 
                          size="sm"
                          onClick={() => onNavigate("course-detail", course.id, scrollToCurriculum ? "curriculum" : undefined)}
                          className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0 group-hover:shadow-lg"
                        >
                          Enroll Now
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mt-12"
            >
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate("courses")}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                View All Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
