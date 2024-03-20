import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType } from '../types/AuthTypes';

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: true,
  sessionId: '',
  setSessionId: () => {
    return '';
  },
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState('');

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    setSessionId('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, sessionId, setSessionId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
