import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // DEVELOPMENT MODE - Skip authentication
  const DEV_MODE = true;

  useEffect(() => {
    const initAuth = async () => {
      if (DEV_MODE) {
        // Development mode - auto-login with mock user
        const mockUser = {
          id: 1,
          name: 'Developer',
          role: 'ceo',
          apiKey: 'dev-mode-key'
        };
        
        apiService.setApiKey('dev-mode-key');
        apiService.setCurrentUser(mockUser);
        setUser(mockUser);
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      // Production mode - normal authentication
      const savedUser = apiService.getCurrentUser();
      const apiKey = localStorage.getItem('odin_api_key');
      
      if (savedUser && apiKey) {
        try {
          // Verify the API key is still valid
          await apiService.health();
          setUser(savedUser);
          setIsAuthenticated(true);
        } catch (error) {
          // API key is invalid, clear everything
          apiService.logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (apiKey) => {
    try {
      // Test the API key by making a request
      const response = await apiService.health();
      
      // For now, we'll create a mock user based on the API key
      // In a real implementation, you'd get user info from the backend
      const mockUser = {
        id: 1,
        name: 'Current User',
        role: 'editor', // This should come from the backend
        apiKey: apiKey
      };
      
      apiService.setApiKey(apiKey);
      apiService.setCurrentUser(mockUser);
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Invalid API key' 
      };
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
