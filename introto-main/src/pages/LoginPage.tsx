import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const success = login(email, password);
    if (success) {
      onNavigate("home");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-white text-xl sm:text-2xl">I</span>
              </div>
              <span className="text-xl sm:text-2xl text-white">Introto</span>
            </div>
            <h1 className="text-2xl sm:text-3xl text-white mb-2 font-bold">Welcome Back</h1>
            <p className="text-sm sm:text-base text-white/70">Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-white mb-2 block">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-11 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-white mb-2 block">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-11 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-amber-400"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                {error}
              </div>
            )}

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0 shadow-xl"
              size="lg"
            >
              Sign In
            </Button>

            <div className="text-center">
              <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                Forgot your password?
              </a>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white/70">Demo Credentials</span>
              </div>
            </div>

            <div className="text-sm text-white/70 space-y-2 p-4 rounded-lg bg-white/5 border border-white/10">
              <div>
                <p className="text-white/90 font-medium mb-1">Demo Credentials:</p>
                <p>Email: <span className="text-white">demo@introto.com</span></p>
                <p>Password: <span className="text-white">any password</span></p>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
