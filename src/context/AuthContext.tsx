import React, { createContext, useContext, useState, useEffect } from "react";
import { Amplify } from 'aws-amplify';
import { signIn, signOut, signUp, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';

// Configure Amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_21KbTF0ci',
      userPoolClientId: '4qav35669albv2luaomg3hveln',
    }
  }
});

export interface UserType {
  username: string;
  email: string;
}

interface AuthContextType {
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<{isComplete: boolean, nextStep?: any}>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => ({ isComplete: false }),
  logout: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  // Check if user is already signed in on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        
        setUser({
          username: attributes.preferred_username || attributes.email?.split('@')[0] || 'User',
          email: attributes.email || ''
        });
      } catch (error) {
        // User is not signed in
        console.log('No user is signed in');
      }
    };
    
    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { isSignedIn, nextStep } = await signIn({ username: email, password });
      
      if (isSignedIn) {
        // User is successfully signed in, fetch their attributes
        const attributes = await fetchUserAttributes();
        
        setUser({
          username: attributes.preferred_username || email.split('@')[0],
          email: attributes.email || email
        });
      } else {
        // Handle additional auth steps if needed (MFA, etc.)
        console.log('Additional steps required:', nextStep);
        throw new Error(`Authentication requires additional steps: ${nextStep.signInStep}`);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      const { isSignUpComplete, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            preferred_username: username,
          },
          autoSignIn: true // enables auto sign-in after user is confirmed
        }
      });

      return { isComplete: isSignUpComplete, nextStep };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
