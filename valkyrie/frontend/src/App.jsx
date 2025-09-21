import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import ValkyrieLogin from './pages/ValkyrieLogin';
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
  const [credentials, setCredentials] = useState(null);

  const handleLogin = (creds) => {
    setCredentials(creds);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <ValkyrieLogin onLogin={handleLogin} />;
  }

  return <FileExplorer credentials={credentials} />;
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
