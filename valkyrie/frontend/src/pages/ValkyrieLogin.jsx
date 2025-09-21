import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, Eye, EyeOff, ChevronDown, AlertCircle } from 'lucide-react';
import { TextHoverEffect } from '../components/ui/text-hover-effect';
import { Vortex } from '../components/ui/vortex';
import EncryptionPlaceholder from '../components/EncryptionPlaceholder';

const ValkyrieLogin = ({ onLogin }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0: Welcome, 1: Login Form, 2: Loading
  const [apiKey, setApiKey] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContinue = () => {
    setCurrentStep(1);
    setShowApiKey(true);
    // Smooth scroll to next section
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Validate API key
    if (!apiKey.trim()) {
      setErrorMessage('Please enter your API key');
      return;
    }
    
    // Validate master password
    if (!masterPassword.trim()) {
      setErrorMessage('Please enter your master password');
      return;
    }
    
    // Basic validation for API key format (should be at least 20 characters and contain alphanumeric characters)
    if (apiKey.trim().length < 20) {
      setErrorMessage('API key must be at least 20 characters long');
      return;
    }
    
    // Check if API key contains only valid characters (alphanumeric, hyphens, underscores)
    if (!/^[a-zA-Z0-9_-]+$/.test(apiKey.trim())) {
      setErrorMessage('API key can only contain letters, numbers, hyphens, and underscores');
      return;
    }
    
    // Basic validation for master password (should be at least 8 characters)
    if (masterPassword.trim().length < 8) {
      setErrorMessage('Master password must be at least 8 characters long');
      return;
    }
    
    // Check if master password contains at least one letter and one number
    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(masterPassword.trim())) {
      setErrorMessage('Master password must contain at least one letter and one number');
      return;
    }
    
    startTransitionAnimation();
  };

  const startTransitionAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(2);
    setShowLoading(true);
    setIsLoading(true);
    
    // Complete transition after 3 seconds
    setTimeout(() => {
      onLogin({ apiKey: apiKey || 'demo-key', masterPassword: masterPassword || 'demo-password' });
    }, 3000);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      setCurrentStep(0);
      setShowApiKey(false);
      setErrorMessage('');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const clearError = () => {
    setErrorMessage('');
  };

  // Show full screen authentication page
  if (currentStep === 2 && showLoading) {
    return (
      <div className="w-full h-screen overflow-hidden relative">
        {/* Glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-3xl -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#a123f6]/10 via-transparent to-blue-500/10 blur-2xl -z-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={200}
          baseHue={240}
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          {/* Authentication Screen */}
          <div className="h-screen flex items-center justify-center p-4">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-8">
                  <div className="w-full h-full rounded-full border-4 border-blue-400 animate-pulse" 
                       style={{
                         boxShadow: '0 0 20px #3b82f6, 0 0 40px #3b82f6, 0 0 60px #3b82f6',
                         borderColor: '#3b82f6'
                       }}>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Authenticating</h2>
              </div>
            </div>
          </div>
        </Vortex>
      </div>
    );
  }

  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md h-screen overflow-hidden relative">
      {/* Glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-3xl -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#a123f6]/10 via-transparent to-blue-500/10 blur-2xl -z-10"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={200}
        baseHue={240}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full relative"
      >
        {/* Welcome Section - Centered */}
        <div className="h-screen flex flex-col items-center justify-center relative w-full">
          <div className="text-center z-10">
            <div className="h-32 w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md relative mb-8">
              <TextHoverEffect text="VALKYRIE" />
              <div className="w-full h-20 relative">
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#a123f6] to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#a123f6] to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-1/4" />
              </div>
            </div>
            <p className="text-gray-400 text-lg mb-8">Secure File Management System</p>
            
            <button
              onClick={handleContinue}
              className="glass-button px-8 py-4 text-lg text-white flex items-center space-x-3 mx-auto group rounded-xl"
            >
              <span>Continue</span>
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

      {/* Combined Login Section */}
      <div className="h-screen flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md">
          <div className={`glass-card p-8 rounded-2xl ${showApiKey ? 'animate-fly-up' : 'opacity-0 translate-y-full'}`}>
            <div className="text-center mb-6">
              <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
              <p className="text-gray-400">Enter your API key and master password to continue</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  API Key
                </label>
                <div className="relative">
                                <input
                                  type="text"
                                  value={apiKey}
                                  onChange={(e) => {
                                    setApiKey(e.target.value);
                                    clearError();
                                  }}
                                  className={`input w-full ${errorMessage && errorMessage.includes('API key') ? 'border-red-500 focus:ring-red-500' : ''}`}
                                  placeholder=""
                                />
                  {!apiKey && (
                    <div className="absolute inset-0 flex items-center px-3 pointer-events-none">
                      <EncryptionPlaceholder 
                        text="Please enter your API key" 
                        className="text-gray-400 text-sm"
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">API key must be at least 20 characters long</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Master Password
                </label>
                <div className="relative">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  value={masterPassword}
                                  onChange={(e) => {
                                    setMasterPassword(e.target.value);
                                    clearError();
                                  }}
                                  className={`input w-full pr-12 ${errorMessage && errorMessage.includes('password') ? 'border-red-500 focus:ring-red-500' : ''}`}
                                  placeholder=""
                                />
                  {!masterPassword && (
                    <div className="absolute inset-0 flex items-center px-3 pointer-events-none">
                      <EncryptionPlaceholder 
                        text="Please enter your master password" 
                        className="text-gray-400 text-sm"
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors z-10"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters with letters and numbers</p>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errorMessage}</span>
                </div>
              )}

                            <div className="flex space-x-4">
                              <button
                                type="button"
                                onClick={handleBack}
                                className="glass-button flex-1 text-white py-3 rounded-xl"
                              >
                                Back
                              </button>
                              <button
                                type="submit"
                                className="glass-button flex-1 flex items-center justify-center space-x-2 text-white py-3 rounded-xl"
                              >
                                <span>Authenticate</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
            </form>
          </div>
        </div>
      </div>

      </Vortex>
    </div>
  );
};

export default ValkyrieLogin;
