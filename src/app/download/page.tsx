"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LinearGradient } from 'react-text-gradients';


function DownloadContent() {
  const searchParams = useSearchParams();
  const orgId = searchParams.get('org');
  const checksum = searchParams.get('checksum');
  const downloadUrl = searchParams.get('downloadUrl');
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [platform, setPlatform] = useState('macOS');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Detect platform
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent;
      if (userAgent.includes('Mac')) setPlatform('macOS');
      else if (userAgent.includes('Windows')) setPlatform('Windows');
      else if (userAgent.includes('Linux')) setPlatform('Linux');
    }

    // Auto-start download when page loads
    if (orgId && !downloadStarted) {
      startDownload();
    }
  }, [orgId, downloadStarted, downloadUrl]);

  const startDownload = async () => {
    if (!orgId) return;
    
    setDownloadStarted(true);
    try {
      // Use the provided download URL or fallback to API endpoint
      const url = downloadUrl || `/api/installer/download/${orgId}`;
      
      if (downloadUrl) {
        // Direct download from URL
        window.location.href = url;
      } else {
        // Fallback: Fetch from API endpoint
        const response = await fetch(url);
        if (response.ok) {
          const blob = await response.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = `odin-file-manager-${orgId}.txt`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(blobUrl);
          document.body.removeChild(a);
        } else {
          console.error('Download failed');
        }
      }
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #a123f6 0%, #1a1a2e 25%, #5116f6 100%)'
    }}>
      <div className="max-w-5xl mx-auto mt-10 w-full">
        {/* Header */}
        <div className="text-center mb-12 header-animation">
          <div className="relitive text-[75px] font-extrabold">
            <LinearGradient gradient={['to right', '#a123f6 ,#5116f6']} fallbackColor="#a123f6">Valkyrie </LinearGradient>
             File Manager
          </div>
          <div className="relitive text-xl subtitle-fade font-bold pb-2">
            Your secure, encrypted file management system
          </div>
          <img src="/valyrielogo.png" alt="Valkyrie Logo" className="absolute ml-20 pt-3 h-30 w-45 opacity-25"/>
          <img src="/valyrielogo.png" alt="Valkyrie Logo" className="absolute ml-20 pt-2 h-30 w-45 opacity-75 "/>
        </div>

        {/* Download Options Card */}
        <div className="card download-card">
          <div className="card-shimmer"></div>
          
          <div className="flex items-center gap-4 mb-6 text-2xl font-semibold">
            Download Valkyrie:
          </div>
          
          <div className="flex justify-center">
            {/* Main Download - Desktop/Server */}
            <div className="download-option active max-w-md">
              <div className="download-option-glow"></div>
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <div className="text-3xl font-bold text-white">VM</div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Valkyrie File Manager</h3>
                <p className="text-base opacity-80 mb-6">
                  Complete file management system for desktop and server deployment
                </p>
                <div className="space-y-3 text-sm font-mono opacity-70 mb-6 bg-black/20 p-4 rounded-lg">
                  <div>Platform: {isClient ? platform : 'macOS'}</div>
                  <div>Size: ~7MB</div>
                  <div>Type: Complete System Package</div>
                </div>
                <button 
                  onClick={() => {
                    // Trigger download of the Valkyrie system
                    const link = document.createElement('a');
                    link.href = '/odin-valkyrie-default.zip';
                    link.download = 'odin-valkyrie-file-manager.zip';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="w-full bg-gradient-to-r from-[#a123f6] to-[#5116f6] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Download Now
                </button>
                <div className="mt-3 text-sm opacity-60">
                  Ready to install
                </div>
              </div>
            </div>
          </div>

          {/* Download Info */}
          <div className="mt-6 p-4 bg-black/20 rounded-lg">
            <div className="text-sm font-mono opacity-90">
              <div className="flex justify-between items-center mb-2">
                <span>Organization:</span>
                <span>{orgId || 'org_1758409386964_o0nyeae7k'}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>SHA256 Checksum:</span>
                <span className="text-xs break-all">
                  {checksum || '87a4b38f13f6c54392eb16d280cf9f922c2d3d3912b6b9077d388c199a6da919'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Instructions Card */}
        <div className="card installation-card">
          <div className="card-shimmer"></div>
          
          <div className="flex items-center gap-4 mb-6 text-2xl font-semibold">
            Installation Instructions
          </div>
          
          <ol className="space-y-4 list-none">
            {[
              'Download and extract the Valkyrie file manager ZIP file',
              'Run the install-complete.sh script (Linux/Mac) or install-complete.bat (Windows)',
              'Wait for "Installation Complete!" message with service URLs',
              'Open http://localhost:3000 in your browser to access the file manager'
            ].map((step, index) => (
              <li 
                key={index}
                className="pl-12 relative transition-all duration-300 hover:translate-x-2 hover:text-[#a123f6] step-item"
              >
                <div 
                  className="absolute left-0 top-0 w-8 h-8 bg-gradient-to-br from-[#a123f6] to-[#5116f6] rounded-full flex items-center justify-center font-bold text-sm step-number"
                  style={{ animationDelay: `${(index + 1) * 0.2}s` }}
                >
                  {index + 1}
                </div>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Features Card */}
        <div className="card features-card">
          <div className="card-shimmer"></div>
          
          <div className="flex items-center gap-4 mb-6 text-2xl font-semibold">
            File Management Features
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'E', title: 'End-to-End Encryption', desc: 'All files encrypted at rest and in transit' },
              { icon: 'AI', title: 'Advanced Search', desc: 'AI-powered content search across all files' },
              { icon: 'V', title: 'Version Control', desc: 'Track file changes and maintain version history' },
              { icon: 'S', title: 'Secure File Sharing', desc: 'Share files with encrypted links and expiration' },
              { icon: 'L', title: 'Local Control', desc: 'Complete control over your data, no cloud dependency' },
              { icon: 'A', title: 'Access Control', desc: 'Granular permissions and user management' }
            ].map((feature, index) => (
              <div 
                key={index}
                className="feature-item"
              >
                <div className="feature-glow"></div>
                
                <div className="flex items-center gap-3 mb-3 font-semibold relative z-10">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {feature.icon}
                  </div>
                  {feature.title}
                </div>
                <div className="text-sm opacity-80 leading-relaxed relative z-10">
                  {feature.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Card */}
        <div className="card security-card">
          <div className="card-shimmer"></div>
          
          <div className="flex items-center gap-4 mb-6 text-2xl font-semibold">
            Security Notes
          </div>
          
          <p className="mb-4 font-semibold">Important: Keep your appliance secure by:</p>
          
          <ul className="space-y-3 mb-6">
            {[
              'Running on a trusted network only',
              'Keeping the software updated',
              'Using strong passwords for admin access',
              'Regularly backing up your data'
            ].map((item, index) => (
              <li 
                key={index}
                className="pl-6 relative transition-all duration-300 hover:translate-x-2 hover:text-[#a123f6] py-1 security-item"
              >
                <span 
                  className="absolute left-0 security-lock"
                  style={{ animationDelay: `${(index + 1) * 0.3}s` }}
                >
                  • 
                </span>
                {item}
              </li>
            ))}
          </ul>
          
          <div className="mt-6 p-4 bg-[#00ff00]/10 border border-[#00ff00]/20 rounded-xl text-sm access-note">
            <div className="font-semibold mb-2">Access Information:</div>
            <div className="space-y-1">
              <div>• Web Interface: <span className="font-mono text-[#00d4ff]">http://localhost:3000</span></div>
              <div>• API Endpoint: <span className="font-mono text-[#00d4ff]">http://localhost:6789</span></div>
              <div>• Health Check: <span className="font-mono text-[#00d4ff]">http://localhost:6789/health</span></div>
            </div>
          </div>
        </div>


      </div>

      <style jsx>{`
        /* Base card styles */
        .card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(50px);
          animation: slideInUp 0.8s ease-out forwards;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
          border-color: rgba(0, 212, 255, 0.3);
        }

        .card-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .card:hover .card-shimmer {
          left: 100%;
        }

                /* Animation delays for cards */
                .download-card { animation-delay: 0s; }
                .installation-card { animation-delay: 0.1s; }
                .features-card { animation-delay: 0.2s; }
                .security-card { animation-delay: 0.3s; }

        /* Header animations */
        .header-animation {
          animation: fadeInDown 1s ease-out;
        }

        .logo-gradient {
          background: linear-gradient(45deg, #00d4ff, #5865f2, #ff6b6b);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease-in-out infinite;
        }

        .logo-float {
          animation: float 3s ease-in-out infinite;
        }

        .subtitle-fade {
          animation: fadeIn 1.5s ease-out;
        }

        /* Icon animations */
        .icon-pulse {
          animation: pulse 2s infinite;
        }

        .icon-delay-1 { animation-delay: 0.5s; }
        .icon-delay-2 { animation-delay: 1s; }
        .icon-delay-3 { animation-delay: 1.5s; }

        /* Progress bar */
        .progress-bar {
          width: 85%;
          animation: progressAnimation 2s ease-out;
        }

        /* Installation steps */
        .step-number {
          animation: bounceIn 0.6s ease-out;
        }

        /* Download options */
        .download-option {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-height: 280px;
        }

        .download-option.active {
          border-color: rgba(0, 212, 255, 0.3);
          background: rgba(0, 212, 255, 0.05);
        }

        .download-option.coming-soon {
          opacity: 0.7;
          filter: grayscale(0.3);
        }

        .download-option:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
        }

        .download-option.active:hover {
          box-shadow: 0 25px 50px rgba(0, 212, 255, 0.3);
        }

        .download-option-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .download-option.active .download-option-glow {
          opacity: 1;
        }

        /* Feature items */
        .feature-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-height: 120px;
        }

        .feature-item:hover {
          transform: scale(1.02);
          border-color: rgba(0, 212, 255, 0.3);
        }

        .feature-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-item:hover .feature-glow {
          opacity: 1;
        }

                /* Security items */
                .security-lock {
                  animation: securityPulse 2s infinite;
                }

                .access-note {
                  animation: noteGlow 3s ease-in-out infinite;
                }



        /* Keyframe animations */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes progressAnimation {
          from { width: 0%; }
          to { width: 85%; }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes securityPulse {
          0%, 100% { 
            transform: scale(1);
            filter: hue-rotate(0deg);
          }
          50% { 
            transform: scale(1.2);
            filter: hue-rotate(180deg);
          }
        }

        @keyframes noteGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(0, 212, 255, 0.2); }
          50% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.4); }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .card {
            padding: 1.5rem;
          }
          
          .logo-gradient {
            font-size: 2rem;
          }
          
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen text-white overflow-x-hidden flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
      }}>
        <div className="text-center">
          <div className="text-4xl mb-4">Loading...</div>
          <div className="text-xl opacity-80">Preparing your download</div>
        </div>
      </div>
    }>
      <DownloadContent />
    </Suspense>
  );
}