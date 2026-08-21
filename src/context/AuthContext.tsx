"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  isVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string; 
  bio:string;
   phone:string;

};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  updateUser: () => {},
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/api/auth/me");

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Get user error:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);
  const updateUser = (updatedUser: User) => {
  setUser(updatedUser);
};

  // Logout
  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        setUser(null);
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}