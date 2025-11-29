import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingScrollButton } from "./components/FloatingScrollButton";
import { AuthProvider } from "./contexts/AuthContext";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { CoursesPage } from "./pages/CoursesPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { BlogPage } from "./pages/BlogPage";
import { CommunityPage } from "./pages/CommunityPage";
import { LMSPage } from "./pages/LMSPage";
import { ProfilePage } from "./pages/ProfilePage";
type PageType = "home" | "login" | "courses" | "course-detail" | "about" | "blog" | "community" | "lms" | "profile";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [pageParam, setPageParam] = useState<number | undefined>(undefined);
  const [scrollSection, setScrollSection] = useState<string | undefined>(undefined);
  const [courseScrollSection, setCourseScrollSection] = useState<string | undefined>(undefined);

  const handleNavigation = (page: string, param?: number | string, scrollTo?: string) => {
    if (typeof param === "string") {
      // Handle scroll to section on home page
      setCurrentPage("home");
      setScrollSection(param);
      setTimeout(() => setScrollSection(undefined), 100);
    } else {
      setCurrentPage(page as PageType);
      setPageParam(param);
      if (scrollTo) {
        setCourseScrollSection(scrollTo);
        setTimeout(() => setCourseScrollSection(undefined), 500);
      } else {
        setCourseScrollSection(undefined);
      }
      window.scrollTo(0, 0);
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-x-hidden">
        {/* Ambient background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Header currentPage={currentPage} onNavigate={handleNavigation} />
          
          {currentPage === "home" && <LandingPage onNavigate={handleNavigation} scrollToSection={scrollSection} />}
          {currentPage === "login" && <LoginPage onNavigate={handleNavigation} />}
          {currentPage === "courses" && <CoursesPage onNavigate={handleNavigation} />}
          {currentPage === "course-detail" && pageParam && <CourseDetailPage courseId={pageParam} onNavigate={handleNavigation} scrollToSection={courseScrollSection} />}
          {currentPage === "about" && <AboutPage />}
          {currentPage === "blog" && <BlogPage />}
          {currentPage === "community" && <CommunityPage onNavigate={handleNavigation} />}
          {currentPage === "profile" && <ProfilePage onNavigate={handleNavigation} />}
          {currentPage === "lms" && pageParam && <LMSPage courseId={pageParam} onNavigate={handleNavigation} />}
          
          {/* Footer - Available on all pages */}
          <Footer />
        </div>

        {/* Floating Scroll to Top Button */}
        <FloatingScrollButton />
      </div>
    </AuthProvider>
  );
}
