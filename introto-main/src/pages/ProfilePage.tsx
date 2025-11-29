import React from "react";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { 
  User, 
  Calendar,
  BookOpen, 
  Award,
  TrendingUp,
  Settings,
  Star,
  Clock,
  Target,
  Zap,
  Play,
  BarChart3
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { coursesData } from "../data/coursesData";

interface ProfilePageProps {
  onNavigate: (page: string, param?: number) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    setTimeout(() => onNavigate("login"), 0);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Redirecting to login...</div>
      </div>
    );
  }

  const enrolledCourses = user.enrolledCourses || [];
  const enrolledCoursesData = coursesData.filter(course => enrolledCourses.includes(course.id));
  const totalHours = enrolledCoursesData.reduce((total, course) => {
    const weeks = parseInt(course.duration.split(' ')[0]);
    return total + (weeks * 5);
  }, 0);

  return (
    <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <button
            onClick={() => onNavigate("home")}
            className="text-white/60 hover:text-white flex items-center gap-2 mb-3 transition-colors text-sm"
          >
            ← Back
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">My Dashboard</h1>
          <p className="text-white/60 text-sm">Welcome back, {user.name}!</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border-white/20 p-4 sm:p-6">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{enrolledCourses.length}</div>
              <div className="text-xs sm:text-sm text-white/70">Courses</div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-xl border-white/20 p-4 sm:p-6">
              <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{totalHours}h</div>
              <div className="text-xs sm:text-sm text-white/70">Learning Time</div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border-white/20 p-4 sm:p-6">
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">75%</div>
              <div className="text-xs sm:text-sm text-white/70">Avg Progress</div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-white/20 p-4 sm:p-6">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{enrolledCourses.length}</div>
              <div className="text-xs sm:text-sm text-white/70">Certificates</div>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6 sm:p-8 text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                    <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 border-4 border-slate-900 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>

              {/* User Info */}
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{user.name}</h2>
              <p className="text-white/60 text-sm mb-6">{user.email}</p>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0 shadow-lg">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button 
                  onClick={() => onNavigate("courses")}
                  className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </Button>
              </div>

              {/* Member Info */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Member since Dec 2024</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                  <Target className="w-4 h-4" />
                  <span>12 Day Streak 🔥</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                  My Learning
                </h3>

                {enrolledCoursesData.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-white/30" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">No courses yet</h4>
                    <p className="text-white/60 text-sm mb-6">Start your learning journey today!</p>
                    <Button
                      onClick={() => onNavigate("courses")}
                      className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0"
                    >
                      Explore Courses
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrolledCoursesData.map((course, idx) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + idx * 0.1 }}
                      >
                        <div className="group bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer">
                          <div className="flex flex-col sm:flex-row gap-4">
                            {/* Course Image */}
                            <div className="w-full sm:w-20 h-40 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20">
                              <img 
                                src={course.image} 
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>

                            {/* Course Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                                <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                                  {course.title}
                                </h4>
                                <span className="px-2.5 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-medium border border-green-500/30 w-fit">
                                  Active
                                </span>
                              </div>

                              {/* Progress Bar */}
                              <div className="mb-3">
                                <div className="flex items-center justify-between mb-1.5 text-xs">
                                  <span className="text-white/60">Progress</span>
                                  <span className="text-amber-400 font-semibold">65%</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-4 text-xs text-white/50">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {course.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" />
                                    {course.modules.length} modules
                                  </span>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => onNavigate("lms", course.id)}
                                  className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0 w-full sm:w-auto"
                                >
                                  <Play className="w-3 h-3 mr-1.5" />
                                  Continue
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Learning Stats & Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                  Achievements
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-4 text-center border border-yellow-500/30">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs font-semibold text-white mb-0.5">Quick Start</div>
                    <div className="text-xs text-white/60">First course</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 text-center border border-blue-500/30">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs font-semibold text-white mb-0.5">Dedicated</div>
                    <div className="text-xs text-white/60">7 day streak</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 text-center border border-purple-500/30">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs font-semibold text-white mb-0.5">Top Scorer</div>
                    <div className="text-xs text-white/60">90%+ quiz</div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 text-center border border-green-500/30">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs font-semibold text-white mb-0.5">Certified</div>
                    <div className="text-xs text-white/60">1 earned</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Activity & Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  Recent Activity
                </h3>

                <div className="space-y-3">
                  {enrolledCoursesData.length > 0 ? (
                    enrolledCoursesData.slice(0, 3).map((course, idx) => (
                      <div key={course.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm">
                            Studying <span className="text-amber-300 font-medium">{course.title}</span>
                          </p>
                          <p className="text-white/50 text-xs mt-0.5">{idx + 1} hours ago</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-white/60 text-sm">
                      No activity yet. Start learning!
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
