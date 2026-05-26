"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthUser {
  nome: string;
  email: string;
  tipoUsuario: string;
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (data: AuthUser) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tracklive_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      localStorage.removeItem("tracklive_user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (data: AuthUser) => {
    setUser(data);
    localStorage.setItem("tracklive_user", JSON.stringify(data));
    localStorage.setItem("tracklive_token", data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tracklive_user");
    localStorage.removeItem("tracklive_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
