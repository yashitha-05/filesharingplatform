import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'authUser';
const USER_CREDENTIALS_KEY = 'userCredentials';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const credentials = localStorage.getItem(USER_CREDENTIALS_KEY);
    if (!credentials) {
      return false;
    }
    const users = JSON.parse(credentials) as { [email: string]: { name: string; password: string } };
    if (users[email] && users[email].password === password) {
      const loggedInUser = { name: users[email].name, email };
      setUser(loggedInUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    let users = {};
    const credentials = localStorage.getItem(USER_CREDENTIALS_KEY);
    if (credentials) {
      users = JSON.parse(credentials);
      if (users[email]) {
        // User already exists
        return false;
      }
    }
    users[email] = { name, password };
    localStorage.setItem(USER_CREDENTIALS_KEY, JSON.stringify(users));
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
