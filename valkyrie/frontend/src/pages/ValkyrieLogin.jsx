import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, Eye, EyeOff, ChevronDown } from 'lucide-react';
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
    if (apiKey.trim() && masterPassword.trim()) {
      setCurrentStep(2);
      setShowLoading(true);
      setIsLoading(true);
      // Simulate loading for 3 seconds
      setTimeout(() => {
        onLogin({ apiKey, masterPassword });
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      setCurrentStep(0);
      setShowApiKey(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

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
                    onChange={(e) => setApiKey(e.target.value)}
                    className="input w-full"
                    placeholder=""
                    required
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Master Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={masterPassword}
                    onChange={(e) => setMasterPassword(e.target.value)}
                    className="input w-full pr-12"
                    placeholder=""
                    required
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
              </div>

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

      {/* Loading Section */}
      {currentStep === 2 && (
        <div className="h-screen flex items-center justify-center p-4 relative">
          <div className="w-full max-w-md">
            <div className={`glass-card p-8 rounded-2xl text-center ${showLoading ? 'animate-fly-up' : 'opacity-0 translate-y-full'}`}>
              <div className="mb-6">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-gray-700"></div>
                  {/* Animated outer ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 animate-spin-slow"></div>
                  {/* Inner ring */}
                  <div className="absolute inset-2 rounded-full border-2 border-gray-600"></div>
                  {/* Animated inner ring */}
                  <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-blue-500 animate-spin-reverse"></div>
                  {/* Center dot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-dot"></div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Authenticating</h2>
                <p className="text-gray-400">Please wait while we verify your credentials...</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse-dot"></div>
                  <span>Validating API key</span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-dot" style={{ animationDelay: '0.5s' }}></div>
                  <span>Verifying master password</span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-dot" style={{ animationDelay: '1s' }}></div>
                  <span>Initializing secure session</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </Vortex>
    </div>
  );
};

export default ValkyrieLogin;
