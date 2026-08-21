import React, { createContext, useContext, useState } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>({
    id: 'u101',
    username: 'ZephyrGamer',
    handle: '@zephyr_pro',
    bio: 'Mobile gaming enthusiast & developer.',
  });

  const login = (username: string) => {
    setUser({
      id: Date.now().toString(),
      username,
      handle: `@${username.toLowerCase().replace(/\s+/g, '')}`,
      bio: 'New Zephyr explorer',
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

