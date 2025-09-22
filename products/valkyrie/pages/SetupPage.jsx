import React, { useState } from 'react';
import { ChevronDown, User, Building, Lock, Key, CheckCircle } from 'lucide-react';
import { Vortex } from '../components/ui/vortex';

const SetupPage = ({ onSetupComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    masterPassword: '',
    confirmPassword: ''
  });
  const [apiKeys, setApiKeys] = useState(null);

  const steps = [
    { id: 'welcome', title: 'Welcome', icon: User },
    { id: 'personal', title: 'Personal', icon: User },
    { id: 'organization', title: 'Organization', icon: Building },
    { id: 'security', title: 'Security', icon: Lock },
    { id: 'keys', title: 'API Keys', icon: Key },
    { id: 'complete', title: 'Complete', icon: CheckCircle }
  ];

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 500);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateApiKeys = () => {
    const keys = {
      ceo: `ceo-${Math.random().toString(36).substr(2, 16)}`,
      editor: `editor-${Math.random().toString(36).substr(2, 16)}`,
      viewer: `viewer-${Math.random().toString(36).substr(2, 16)}`,
      admin: `admin-${Math.random().toString(36).substr(2, 16)}`
    };
    setApiKeys(keys);
    return keys;
  };

  const handleSetupComplete = () => {
    const userData = {
      ...formData,
      apiKeys,
      setupDate: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    localStorage.setItem('valkyrie_user_data', JSON.stringify(userData));
    onSetupComplete(userData);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1: return formData.name.trim() && formData.email.trim();
      case 2: return formData.organization.trim();
      case 3: return formData.masterPassword.length >= 8 && formData.masterPassword === formData.confirmPassword;
      case 4: return apiKeys !== null;
      default: return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Welcome
        return (
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-7xl font-bold bg-gradient-to-r from-[#a123f6] to-blue-400 bg-clip-text text-transparent animate-pulse">
                VALKYRIE
              </h1>
              <p className="text-3xl text-gray-300 font-light">Secure File Management System</p>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Welcome to the future of secure file management. Let's set up your account and generate your access keys.
              </p>
            </div>
            <div className="flex justify-center space-x-3">
              <div className="w-4 h-4 bg-[#a123f6] rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        );

      case 1: // Personal Information
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-white">Personal Information</h2>
              <p className="text-xl text-gray-400">Tell us about yourself</p>
            </div>
            <div className="space-y-8 max-w-lg mx-auto">
              <div className="space-y-3">
                <label className="text-lg font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-6 py-4 bg-black/60 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-[#a123f6] focus:outline-none transition-all duration-300 text-lg backdrop-blur-sm"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-3">
                <label className="text-lg font-medium text-gray-300">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-6 py-4 bg-black/60 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-[#a123f6] focus:outline-none transition-all duration-300 text-lg backdrop-blur-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
          </div>
        );

      case 2: // Organization
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-white">Organization Details</h2>
              <p className="text-xl text-gray-400">What organization are you representing?</p>
            </div>
            <div className="space-y-8 max-w-lg mx-auto">
              <div className="space-y-3">
                <label className="text-lg font-medium text-gray-300">Organization Name</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  className="w-full px-6 py-4 bg-black/60 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-[#a123f6] focus:outline-none transition-all duration-300 text-lg backdrop-blur-sm"
                  placeholder="Enter your organization name"
                />
              </div>
            </div>
          </div>
        );

      case 3: // Security
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-white">Master Password</h2>
              <p className="text-xl text-gray-400">Create a secure master password</p>
            </div>
            <div className="space-y-8 max-w-lg mx-auto">
              <div className="space-y-3">
                <label className="text-lg font-medium text-gray-300">Master Password</label>
                <input
                  type="password"
                  value={formData.masterPassword}
                  onChange={(e) => handleInputChange('masterPassword', e.target.value)}
                  className="w-full px-6 py-4 bg-black/60 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-[#a123f6] focus:outline-none transition-all duration-300 text-lg backdrop-blur-sm"
                  placeholder="Enter your master password"
                />
              </div>
              <div className="space-y-3">
                <label className="text-lg font-medium text-gray-300">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-6 py-4 bg-black/60 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-[#a123f6] focus:outline-none transition-all duration-300 text-lg backdrop-blur-sm"
                  placeholder="Confirm your master password"
                />
              </div>
              {formData.masterPassword && formData.masterPassword.length < 8 && (
                <p className="text-red-400 text-lg">Password must be at least 8 characters long</p>
              )}
              {formData.confirmPassword && formData.masterPassword !== formData.confirmPassword && (
                <p className="text-red-400 text-lg">Passwords do not match</p>
              )}
            </div>
          </div>
        );

      case 4: // API Keys
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-white">API Keys Generated</h2>
              <p className="text-xl text-gray-400">Your access keys have been created</p>
            </div>
            <div className="space-y-8 max-w-4xl mx-auto">
              {!apiKeys && (
                <div className="text-center">
                  <button
                    onClick={() => generateApiKeys()}
                    className="px-12 py-6 bg-gradient-to-r from-[#a123f6] to-blue-400 text-white rounded-xl font-bold text-xl hover:from-[#a123f6]/80 hover:to-blue-400/80 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  >
                    Generate API Keys
                  </button>
                </div>
              )}
              {apiKeys && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(apiKeys).map(([role, key]) => (
                      <div key={role} className="bg-black/60 border-2 border-white/20 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xl font-bold text-gray-300 capitalize">{role}</span>
                          <button
                            onClick={() => navigator.clipboard.writeText(key)}
                            className="text-[#a123f6] hover:text-blue-400 transition-colors text-lg font-semibold"
                          >
                            Copy
                          </button>
                        </div>
                        <code className="text-sm text-gray-400 break-all bg-black/40 p-3 rounded-lg block">{key}</code>
                      </div>
                    ))}
                  </div>
                  <div className="bg-yellow-900/30 border-2 border-yellow-500/40 rounded-xl p-6 backdrop-blur-sm">
                    <p className="text-yellow-200 text-lg text-center">
                      ⚠️ Please save these API keys securely. You won't be able to see them again.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 5: // Complete
        return (
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <div className="w-32 h-32 bg-gradient-to-r from-[#a123f6] to-blue-400 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-6xl font-bold text-white">Setup Complete!</h2>
              <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Your Valkyrie account has been successfully configured. You can now access your secure file management system.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <div className="w-6 h-6 bg-[#a123f6] rounded-full animate-bounce"></div>
              <div className="w-6 h-6 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-6 h-6 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Vortex
        backgroundColor="transparent"
        rangeY={800}
        particleCount={500}
        baseHue={260}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        {/* Main Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div key={index} className="flex flex-col items-center space-y-3">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 transform ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-[#a123f6] to-blue-400 scale-110' 
                        : isActive 
                        ? 'bg-gradient-to-r from-[#a123f6] to-blue-400 ring-8 ring-[#a123f6]/30 scale-110' 
                        : 'bg-gray-700/50 scale-90'
                    }`}>
                      <Icon className={`w-8 h-8 ${isCompleted || isActive ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-3 backdrop-blur-sm">
              <div 
                className="bg-gradient-to-r from-[#a123f6] to-blue-400 h-3 rounded-full transition-all duration-700 transform"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-12 scale-95' : 'opacity-100 transform translate-y-0 scale-100'}`}>
            {renderStepContent()}
          </div>

          {/* Continue Button */}
          <div className="mt-16 text-center">
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleContinue}
                disabled={!validateStep(currentStep)}
                className={`px-12 py-6 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 ${
                  validateStep(currentStep)
                    ? 'bg-gradient-to-r from-[#a123f6] to-blue-400 text-white hover:from-[#a123f6]/80 hover:to-blue-400/80 shadow-2xl hover:shadow-[#a123f6]/25'
                    : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
                <ChevronDown className="w-6 h-6 inline-block ml-3" />
              </button>
            ) : (
              <button
                onClick={handleSetupComplete}
                className="px-12 py-6 bg-gradient-to-r from-[#a123f6] to-blue-400 text-white rounded-xl font-bold text-xl hover:from-[#a123f6]/80 hover:to-blue-400/80 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-[#a123f6]/25"
              >
                Start Using Valkyrie
              </button>
            )}
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default SetupPage;