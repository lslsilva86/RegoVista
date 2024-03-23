import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType } from '../types/AuthTypes';

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: true,
  sessionId: '',
  accountId: '',
  setSessionId: () => {
    return '';
  },
  setAccountId: () => {
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
  const [accountId, setAccountId] = useState('');

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    setSessionId('');
    setAccountId('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, sessionId, accountId, setSessionId, setAccountId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
