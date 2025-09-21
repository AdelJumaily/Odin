import Navbar from './components/Navbar';
import { WhatWeDo } from '../components/what-we-do';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/globeSpinning.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-16 sm:px-24 lg:px-32 xl:px-40">
          <div className="max-w-5xl mx-auto text-center">
            {/* Subtitle */}
            <p className="text-neutral-300 text-base sm:text-lg mb-10">
              Secure File Management for Organizations
            </p>
            
            {/* Main Headline - Updated */}
            <div className="b-12 pb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight pb-35">
                Enterprise Grade File Management Systems
              </h1>
            </div>
            
            {/* CTA Buttons */}
            <div className="relitive flex flex-col gap-5 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center items-center">
              <a 
                href="/signup"
                className="w-56 h-14 rounded-full bg-transparent border-2 border-[#e01300] text-white text-base font-semibold hover:bg-[#e01300] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#e01300]/25 flex items-center justify-center"
              >
                Get Started
              </a>
              <a 
                href="#learn-more"
                className="w-56 h-14 rounded-full bg-transparent text-white border-2 border-white text-base font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <WhatWeDo />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
