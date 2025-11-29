import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "5 Essential Skills Every Professional Needs in 2025",
    excerpt: "The job market is evolving rapidly. Discover the top skills that will keep you competitive and relevant in your career.",
    image: "https://images.unsplash.com/photo-1541560052-5e137f229371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvcmtpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzYyNDg4NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Sarah Johnson",
    date: "November 1, 2025",
    readTime: "5 min read",
    category: "Career Development"
  },
  {
    id: 2,
    title: "How AI is Transforming Online Education",
    excerpt: "Explore how artificial intelligence is personalizing learning experiences and making education more accessible than ever.",
    image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjI0NjY5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Michael Chen",
    date: "October 28, 2025",
    readTime: "7 min read",
    category: "Technology"
  },
  {
    id: 3,
    title: "From Beginner to Pro: A Data Science Journey",
    excerpt: "Follow the inspiring story of how one learner went from zero coding experience to landing their dream job in data science.",
    image: "https://images.unsplash.com/photo-1653133224278-f55672909571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGNvZGluZ3xlbnwxfHx8fDE3NjI0ODg0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Emily Rodriguez",
    date: "October 25, 2025",
    readTime: "6 min read",
    category: "Success Stories"
  },
  {
    id: 4,
    title: "The Future of Work: Remote vs Hybrid Models",
    excerpt: "As companies adapt to new work environments, learn about the skills and strategies needed to thrive in this new era.",
    image: "https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYyNDE3NDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "James Wilson",
    date: "October 22, 2025",
    readTime: "8 min read",
    category: "Future of Work"
  },
  {
    id: 5,
    title: "Marketing Trends That Will Dominate 2026",
    excerpt: "Stay ahead of the curve with these emerging marketing strategies and tactics that will shape the industry next year.",
    image: "https://images.unsplash.com/photo-1542744094-f77e9f7a10b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MjQwNDM2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Lisa Anderson",
    date: "October 20, 2025",
    readTime: "6 min read",
    category: "Marketing"
  },
  {
    id: 6,
    title: "Building Resilience: Lessons from Top Leaders",
    excerpt: "Learn the mindset shifts and practices that successful leaders use to navigate challenges and uncertainty.",
    image: "https://images.unsplash.com/photo-1758518727707-b023e285b709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlcnNoaXAlMjBtZWV0aW5nfGVufDF8fHx8MTc2MjQ4ODQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Robert Chen",
    date: "October 18, 2025",
    readTime: "7 min read",
    category: "Leadership"
  }
];

const categories = ["All", "Career Development", "Technology", "Success Stories", "Future of Work", "Marketing", "Leadership"];

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 max-w-5xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-6 leading-tight">
            Introto{" "}
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white mb-8 max-w-2xl mx-auto italic">
            Insights, stories, and resources to help you grow in your career
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 bg-white/10 border-white/30 text-white placeholder:text-white/50"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Grid - All Cards Same Size */}
        {filteredPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all group cursor-pointer h-full flex flex-col min-h-[450px] sm:min-h-[480px]">
                  <div className="relative overflow-hidden aspect-[16/10] flex-shrink-0">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-medium">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl text-white mb-2 sm:mb-3 group-hover:text-amber-300 transition-colors line-clamp-2 min-h-[56px] sm:min-h-[64px] font-bold">
                      {post.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 mb-3 sm:mb-4 flex-1 line-clamp-3 min-h-[72px] sm:min-h-[84px] italic">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 sm:gap-4 text-xs text-white/60 mb-3 sm:mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span className="hidden sm:inline">{post.date}</span>
                        <span className="sm:hidden">{post.date.split(' ')[0]} {post.date.split(' ')[1]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate">{post.author}</span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 text-xs sm:text-sm">
                        Read
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-white/70">No articles found. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
