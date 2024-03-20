export interface AuthContextType {
  isLoggedIn: boolean;
  sessionId: String;
  setSessionId: (sessionId: string) => void;
  login: () => void;
  logout: () => void;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export type RequestToken = string;
