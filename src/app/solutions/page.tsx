import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Header Section */}
      <section className="relative pt-20 pb-16 px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="text-white text-sm">
              <p>secureth@email.com</p>
              <p>(+1) 7282 7632</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[#e01300] to-[#ff6940] rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-sm"></div>
              </div>
            </div>
            <div>
              <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative px-8 sm:px-12 lg:px-16 xl:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* New Security Platform Badge */}
              <div className="inline-block">
                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-500/30">
                  New Security Platform
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Protect your organization from any threat
              </h1>

              {/* Sub-headline */}
              <p className="text-lg text-gray-300 leading-relaxed">
                Security AI Platform to Protect the Entire Enterprise. Break Down Security. 
                Gain Enterprise-Wide Visibility. Action Your Data In Real-Time.
              </p>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
                <button className="bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-lg font-semibold transition-colors">
                  Get Started
                </button>
              </div>
            </div>

            {/* Right Content - 3D Server Rack */}
            <div className="relative">
              {/* Background Network Lines */}
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                  {/* Circuit board lines */}
                  <path d="M50 50 L350 50" stroke="#4ade80" strokeWidth="1" opacity="0.6"/>
                  <path d="M50 100 L350 100" stroke="#4ade80" strokeWidth="1" opacity="0.6"/>
                  <path d="M50 150 L350 150" stroke="#4ade80" strokeWidth="1" opacity="0.6"/>
                  <path d="M50 200 L350 200" stroke="#4ade80" strokeWidth="1" opacity="0.6"/>
                  <path d="M50 250 L350 250" stroke="#4ade80" strokeWidth="1" opacity="0.6"/>
                  
                  {/* Vertical lines */}
                  <path d="M100 50 L100 250" stroke="#4ade80" strokeWidth="1" opacity="0.6"/>
                  <path d="M200 50 L200 250" stroke="#4ade80" strokeWidth="1" opacity="0.6"/>
                  <path d="M300 50 L300 250" stroke="#4ade80" strokeWidth="1" opacity="0.6"/>
                </svg>
              </div>

              {/* Abstract Icons */}
              <div className="absolute top-10 left-10 w-8 h-8 border border-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
              </div>
              <div className="absolute top-20 right-20 w-6 h-6 border border-white rounded-full"></div>
              <div className="absolute bottom-20 left-20 w-8 h-8 border border-white rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <div className="absolute bottom-10 right-10 w-6 h-6 border border-white rounded-lg"></div>

              {/* 3D Server Rack */}
              <div className="relative z-10 ml-auto w-80 h-64 perspective-1000">
                <div className="transform-gpu rotate-y-15 rotate-x-5">
                  {/* Server Rack Base */}
                  <div className="relative w-64 h-48 bg-gray-800 rounded-lg shadow-2xl">
                    {/* Top Surface */}
                    <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg"></div>
                    
                    {/* Front Face */}
                    <div className="absolute top-8 left-0 w-full h-40 bg-gray-800 rounded-b-lg">
                      {/* Green Light Strips */}
                      <div className="absolute top-4 left-4 right-4 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                      <div className="absolute top-12 left-4 right-4 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                      <div className="absolute top-20 left-4 right-4 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                      
                      {/* Server Units */}
                      <div className="absolute top-28 left-4 right-4 h-8 bg-gray-700 rounded"></div>
                      <div className="absolute top-36 left-4 right-4 h-8 bg-gray-700 rounded"></div>
                    </div>
                    
                    {/* Side Panel */}
                    <div className="absolute top-8 right-0 w-8 h-40 bg-gradient-to-l from-gray-600 to-gray-700 rounded-r-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valkyrie Product Section */}
      <section className="px-8 sm:px-12 lg:px-16 xl:px-20 py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Security Solution
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Valkyrie is our flagship security platform designed to protect your organization 
              with advanced AI-powered threat detection and real-time response capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Real-Time Monitoring</h3>
              <p className="text-gray-300">
                Continuous monitoring of your entire infrastructure with instant threat detection and alerting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Analysis</h3>
              <p className="text-gray-300">
                Advanced machine learning algorithms analyze patterns and predict potential security threats.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-purple-500 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Automated Response</h3>
              <p className="text-gray-300">
                Instant automated responses to security incidents with minimal human intervention required.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="/download"
              className="inline-block bg-gradient-to-r from-[#e01300] to-[#ff6940] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#e01300]/25 transition-all duration-300 transform hover:scale-105"
            >
              Download Valkyrie Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
