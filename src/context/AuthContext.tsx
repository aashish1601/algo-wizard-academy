import React, { createContext, useContext, useState, useEffect } from "react";
import { Amplify } from 'aws-amplify';
import { signIn, signOut, signUp, getCurrentUser, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';

// Configure Amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_21KbTF0ci',
      userPoolClientId: '4qav35669albv2luaomg3hveln',
    }
  }
});

// API Gateway URL
const API_ENDPOINT = 'https://iu77gvzn2a.execute-api.us-east-1.amazonaws.com/dev';

export interface UserType {
  username: string;
  email: string;
}

export interface EvaluationResult {
  success: boolean;
  allPassed?: boolean;
  results?: Array<{
    input: any;
    expected: any;
    actual: any;
    passed: boolean;
    error?: string;
  }>;
  error?: string;
}

export interface SubmissionResult {
  message: string;
  submissionId?: string;
  evaluationResults: EvaluationResult;
  notification?: {
    success: boolean;
    reason?: string;
    error?: string;
  };
  leaderboardUpdate?: {
    success: boolean;
    newScore?: number;
    error?: string;
  };
}

interface AuthContextType {
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<{isComplete: boolean, nextStep?: any}>;
  logout: () => Promise<void>;
  submitCode: (algorithmType: string, code: string) => Promise<SubmissionResult>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => ({ isComplete: false }),
  logout: async () => {},
  submitCode: async () => ({ 
    message: '', 
    evaluationResults: { success: false }
  }),
  isLoading: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already signed in on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true);
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        
        setUser({
          username: attributes.preferred_username || attributes.email?.split('@')[0] || 'User',
          email: attributes.email || ''
        });
      } catch (error) {
        // User is not signed in
        console.log('No user is signed in');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
const signup = async (email: string, password: string, username: string) => {
  try {
    setIsLoading(true);
    console.log('Attempting signup with:', { email, username });
    
    const { isSignUpComplete, nextStep } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          preferred_username: username,
        },
        autoSignIn: true
      }
    });
    
    console.log('Sign up response:', { isSignUpComplete, nextStep });
    return { isComplete: isSignUpComplete, nextStep };
  } catch (error: any) {
    console.error('Detailed signup error:', error);
    // Extract more specific error information
    const errorMessage = error.message || 'Unknown error occurred during signup';
    const errorName = error.name || 'Error';
    console.error(`Error type: ${errorName}, Message: ${errorMessage}`);
    
    throw error;
  } finally {
    setIsLoading(false);
  }
};

  const logout = async () => {
    try {
      setIsLoading(true);
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const submitCode = async (algorithmType: string, code: string): Promise<SubmissionResult> => {
    try {
      if (!user) {
        throw new Error('User must be logged in to submit code');
      }

      // Get the current authenticated session to get the JWT token
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();
      
      if (!idToken) {
        throw new Error('No valid authentication token found');
      }

      // Prepare the request payload
      const payload = {
        userId: user.username,
        email: user.email,
        algorithmType,
        code
      };
      
      console.log('Submitting code to:', API_ENDPOINT);
      console.log('Payload:', payload);
      
      // Call the API Gateway endpoint with the token
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to submit code: ${response.status}`);
      }
      
      // Parse and return the response
      const result = await response.json();
      return result as SubmissionResult;
    } catch (error: any) {
      console.error('Error submitting code:', error);
      return {
        message: error.message || 'Failed to submit code',
        evaluationResults: {
          success: false,
          error: error.message || 'An unknown error occurred'
        }
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, submitCode, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
