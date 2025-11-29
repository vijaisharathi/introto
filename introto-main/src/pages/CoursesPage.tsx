import { motion } from "motion/react";
import { CoursesSection } from "../components/CoursesSection";
import { Search } from "lucide-react";
import { useState } from "react";
import { coursesData } from "../data/coursesData";

interface CoursesPageProps {
  onNavigate: (page: string, courseId?: number | string, scrollTo?: string) => void;
}

export function CoursesPage({ onNavigate }: CoursesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories from courses
  const categories = ["All", ...Array.from(new Set(coursesData.map(c => c.category)))];

  return (
    <div className="min-h-screen pt-12 pb-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 max-w-5xl mx-auto"
        >
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-6 leading-tight">
            Explore Our <span className="text-orange-500">Courses</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white mb-8 max-w-2xl mx-auto italic">
            Discover world-class AI-powered courses designed to transform your career
          </p>
          
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6 max-w-4xl mx-auto px-4 sm:px-0">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 text-sm rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto px-4 sm:px-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <CoursesSection 
            onNavigate={onNavigate} 
            showAll={true} 
            searchQuery={searchQuery} 
            selectedCategory={selectedCategory}
            scrollToCurriculum={true} 
          />
        </div>
      </div>
    </div>
  );
}
