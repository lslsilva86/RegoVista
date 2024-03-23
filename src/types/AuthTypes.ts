export interface AuthContextType {
  isLoggedIn: boolean;
  sessionId: string;
  accountId: string;
  setSessionId: (sessionId: string) => void;
  setAccountId: (accountId: string) => void;
  login: () => void;
  logout: () => void;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export type RequestToken = string;
