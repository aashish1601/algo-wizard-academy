
import React, { createContext, useContext, useState } from "react";

export interface UserType {
  username: string;
  email: string;
}

interface AuthContextType {
  user: UserType | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const login = (email: string, password: string) => {
    // Simulate successful login as Cognito
    setUser({
      username: email.split("@")[0],
      email,
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
