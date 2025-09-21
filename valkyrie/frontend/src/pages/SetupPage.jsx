import React, { useState, useEffect } from 'react';
import { ChevronDown, User, Building, Mail, Lock, Key, CheckCircle } from 'lucide-react';

const SetupPage = ({ onSetupComplete }) => {
  const [currentStep, setCurrentStep] = 0;
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    masterPassword: '',
    confirmPassword: ''
  });
  const [apiKeys, setApiKeys] = useState(null);
  const [showKeys, setShowKeys] = useState(false);

  const steps = [
    { id: 'welcome', title: 'Welcome to Valkyrie', icon: User },
    { id: 'personal', title: 'Personal Information', icon: User },
    { id: 'organization', title: 'Organization Details', icon: Building },
    { id: 'security', title: 'Master Password', icon: Lock },
    { id: 'keys', title: 'API Keys Generated', icon: Key },
    { id: 'complete', title: 'Setup Complete', icon: CheckCircle }
  ];

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateApiKeys = () => {
    const keys = {
      ceo: `ceo-${Math.random().toString(36).substr(2, 12)}`,
      editor: `editor-${Math.random().toString(36).substr(2, 12)}`,
      viewer: `viewer-${Math.random().toString(36).substr(2, 12)}`,
      admin: `admin-${Math.random().toString(36).substr(2, 12)}`
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
    
    // Save to localStorage
    localStorage.setItem('valkyrie_user_data', JSON.stringify(userData));
    
    // Call completion handler
    onSetupComplete(userData);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1: // Personal
        return formData.name.trim() && formData.email.trim();
      case 2: // Organization
        return formData.organization.trim();
      case 3: // Security
        return formData.masterPassword.length >= 8 && formData.masterPassword === formData.confirmPassword;
      case 4: // Keys
        return apiKeys !== null;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Welcome
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-[#a123f6] to-blue-400 bg-clip-text text-transparent">
                VALKYRIE
              </h1>
              <p className="text-2xl text-gray-300">Secure File Management System</p>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Welcome to the future of secure file management. Let's set up your account and generate your access keys.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <div className="w-3 h-3 bg-[#a123f6] rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        );

      case 1: // Personal Information
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Personal Information</h2>
              <p className="text-gray-400">Tell us about yourself</p>
            </div>
            <div className="space-y-6 max-w-md mx-auto">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#a123f6] focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#a123f6] focus:outline-none transition-colors"
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
              <h2 className="text-4xl font-bold text-white">Organization Details</h2>
              <p className="text-gray-400">What organization are you representing?</p>
            </div>
            <div className="space-y-6 max-w-md mx-auto">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Organization Name</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#a123f6] focus:outline-none transition-colors"
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
              <h2 className="text-4xl font-bold text-white">Master Password</h2>
              <p className="text-gray-400">Create a secure master password</p>
            </div>
            <div className="space-y-6 max-w-md mx-auto">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Master Password</label>
                <input
                  type="password"
                  value={formData.masterPassword}
                  onChange={(e) => handleInputChange('masterPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#a123f6] focus:outline-none transition-colors"
                  placeholder="Enter your master password"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#a123f6] focus:outline-none transition-colors"
                  placeholder="Confirm your master password"
                />
              </div>
              {formData.masterPassword && formData.masterPassword.length < 8 && (
                <p className="text-red-400 text-sm">Password must be at least 8 characters long</p>
              )}
              {formData.confirmPassword && formData.masterPassword !== formData.confirmPassword && (
                <p className="text-red-400 text-sm">Passwords do not match</p>
              )}
            </div>
          </div>
        );

      case 4: // API Keys
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">API Keys Generated</h2>
              <p className="text-gray-400">Your access keys have been created</p>
            </div>
            <div className="space-y-6 max-w-2xl mx-auto">
              {!apiKeys && (
                <button
                  onClick={() => generateApiKeys()}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#a123f6] to-blue-400 text-white rounded-lg font-semibold hover:from-[#a123f6]/80 hover:to-blue-400/80 transition-all duration-300"
                >
                  Generate API Keys
                </button>
              )}
              {apiKeys && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(apiKeys).map(([role, key]) => (
                      <div key={role} className="bg-black/40 border border-white/20 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-300 capitalize">{role}</span>
                          <button
                            onClick={() => navigator.clipboard.writeText(key)}
                            className="text-[#a123f6] hover:text-blue-400 transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                        <code className="text-xs text-gray-400 break-all">{key}</code>
                      </div>
                    ))}
                  </div>
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                    <p className="text-yellow-200 text-sm">
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
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-[#a123f6] to-blue-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white">Setup Complete!</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Your Valkyrie account has been successfully configured. You can now access your secure file management system.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <div className="w-3 h-3 bg-[#a123f6] rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/50"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#a123f6] rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-[#a123f6] to-blue-400' 
                        : isActive 
                        ? 'bg-gradient-to-r from-[#a123f6] to-blue-400 ring-4 ring-[#a123f6]/30' 
                        : 'bg-gray-700'
                    }`}>
                      <Icon className={`w-6 h-6 ${isCompleted || isActive ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#a123f6] to-blue-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
            {renderStepContent()}
          </div>

          {/* Continue Button */}
          <div className="mt-12 text-center">
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleContinue}
                disabled={!validateStep(currentStep)}
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  validateStep(currentStep)
                    ? 'bg-gradient-to-r from-[#a123f6] to-blue-400 text-white hover:from-[#a123f6]/80 hover:to-blue-400/80 shadow-lg hover:shadow-xl'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
                <ChevronDown className="w-5 h-5 inline-block ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSetupComplete}
                className="px-8 py-4 bg-gradient-to-r from-[#a123f6] to-blue-400 text-white rounded-lg font-semibold text-lg hover:from-[#a123f6]/80 hover:to-blue-400/80 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Using Valkyrie
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;