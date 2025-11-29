import { Menu, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate("home");
  };

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
  // Translucent header that participates in normal document flow (scrolls away)
  <header className="relative w-full backdrop-blur-xl bg-white/70 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavigation("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <svg 
              className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 self-center" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="12" r="4" fill="black"/>
            </svg>
            <span className="text-2xl sm:text-3xl text-black font-bold leading-none flex items-center">introto.in</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavigation("about")}
              className={`transition-colors duration-200 font-bold text-lg ${
                currentPage === 'about' 
                  ? 'text-blue-500' 
                  : 'text-black hover:text-blue-500'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation("courses")}
              className={`transition-colors duration-200 font-bold text-lg ${
                currentPage === 'courses' 
                  ? 'text-blue-500' 
                  : 'text-black hover:text-blue-500'
              }`}
            >
              Courses
            </button>
            <button 
              onClick={() => handleNavigation("community")}
              className={`transition-colors duration-200 font-bold text-lg ${
                currentPage === 'community' 
                  ? 'text-blue-500' 
                  : 'text-black hover:text-blue-500'
              }`}
            >
              Community
            </button>
            <button 
              onClick={() => handleNavigation("blog")}
              className={`transition-colors duration-200 font-bold text-lg ${
                currentPage === 'blog' 
                  ? 'text-blue-500' 
                  : 'text-black hover:text-blue-500'
              }`}
            >
              Blog
            </button>
          </nav>

          {/* Login/User Button */}
          <div className="hidden md:flex md:items-center">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/90 hover:bg-white transition-all shadow-sm hover:shadow-md">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-bold text-gray-700 max-w-[100px] truncate">{user?.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200 shadow-lg">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <DropdownMenuItem 
                      onSelect={() => handleNavigation("profile")}
                      className="px-3 py-2 cursor-pointer flex items-center gap-2 text-gray-700 hover:bg-gray-100"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onSelect={handleLogout}
                      className="px-3 py-2 cursor-pointer flex items-center gap-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => handleNavigation("login")}
                className="bg-white/80 border-0 text-gray-900 hover:bg-white shadow-sm font-bold"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <button 
              onClick={() => handleNavigation("about")}
              className={`block w-full text-left font-bold text-lg transition-colors duration-200 ${
                currentPage === 'about' 
                  ? 'text-blue-500' 
                  : 'text-black hover:text-blue-500'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation("courses")}
              className={`block w-full text-left font-bold text-lg transition-colors duration-200 ${
                currentPage === 'courses' 
                  ? 'text-blue-500' 
                  : 'text-black hover:text-blue-500'
              }`}
            >
              Courses
            </button>
            <button 
              onClick={() => handleNavigation("community")}
              className={`block w-full text-left font-bold text-lg transition-colors duration-200 ${
                currentPage === 'community' 
                  ? 'text-blue-500' 
                  : 'text-black hover:text-blue-500'
              }`}
            >
              Community
            </button>
            <button 
              onClick={() => handleNavigation("blog")}
              className={`block w-full text-left font-bold text-lg transition-colors duration-200 ${
                currentPage === 'blog' 
                  ? 'text-blue-500' 
                  : 'text-black hover:text-blue-500'
              }`}
            >
              Blog
            </button>
            {isAuthenticated ? (
              <>
                <div className="text-black font-bold pt-2 pb-2 border-t border-white/20 text-base">
                  Hi, {user?.name}
                </div>
                <Button 
                  onClick={() => handleNavigation("profile")}
                  className="w-full bg-white/80 border-0 text-gray-900 hover:bg-white shadow-sm justify-start"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button 
                  onClick={handleLogout}
                  className="w-full bg-white/80 border-0 text-gray-900 hover:bg-white shadow-sm justify-start"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => handleNavigation("login")}
                className="w-full bg-white/80 border-0 text-gray-900 hover:bg-white shadow-sm"
              >
                Login
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
