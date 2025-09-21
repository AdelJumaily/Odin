import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import ValkyrieLogin from './pages/ValkyrieLogin';
import SetupPage from './pages/SetupPage';
import FileExplorer from './pages/FileExplorer';
import LoadingSpinner from './components/LoadingSpinner';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // DEVELOPMENT MODE - Skip authentication
  const DEV_MODE = true;
  
  if (DEV_MODE) {
    return children; // Skip authentication in dev mode
  }
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Main App Routes
const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [userData, setUserData] = useState(null);

  // Check if setup is complete on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('valkyrie_user_data');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      setIsSetupComplete(true);
    }
  }, []);

  const handleSetupComplete = (data) => {
    setUserData(data);
    setIsSetupComplete(true);
    // Auto-login with CEO key
    setCredentials({
      apiKey: data.apiKeys.ceo,
      masterPassword: data.masterPassword
    });
    setIsAuthenticated(true);
  };

  const handleLogin = (creds) => {
    setCredentials(creds);
    setIsAuthenticated(true);
  };

  // Show setup page if not completed
  if (!isSetupComplete) {
    return <SetupPage onSetupComplete={handleSetupComplete} />;
  }

  // Show login page if setup is complete but not authenticated
  if (!isAuthenticated) {
    return <ValkyrieLogin onLogin={handleLogin} userData={userData} />;
  }

  // Show file explorer if authenticated
  return <FileExplorer credentials={credentials} userData={userData} />;
};

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
