import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  enrollCourse: (courseId: number) => void;
  isEnrolled: (courseId: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // Mock login - in real app, this would call an API
    if (email && password) {
      setUser({
        id: "1",
        name: email.split("@")[0],
        email: email,
        enrolledCourses: []
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const enrollCourse = (courseId: number) => {
    if (user) {
      setUser({
        ...user,
        enrolledCourses: [...user.enrolledCourses, courseId]
      });
    }
  };

  const isEnrolled = (courseId: number): boolean => {
    return user?.enrolledCourses.includes(courseId) || false;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated: !!user,
        enrollCourse,
        isEnrolled
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
