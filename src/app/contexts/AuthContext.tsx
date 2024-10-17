"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const login = (username: string, password: string) => {
    // Ici, vous devriez normalement vérifier les identifiants avec votre backend
    // Pour cet exemple, nous allons simplement authentifier si le nom d'utilisateur et le mot de passe ne sont pas vides
    if (username && password) {
      setIsAuthenticated(true);
      setUsername(username);
      Cookies.set('username', username, { expires: 7 }); // Le cookie expire après 7 jours
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    Cookies.remove('username');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};