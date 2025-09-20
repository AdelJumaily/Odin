"use client";
import { ScrambleText } from "@/components/ui/scramble-text";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover -z-10"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Untitled video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black"></div>
        </video>
        
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtitle */}
          <p className="text-neutral-300 text-base sm:text-lg mb-10">
            The future of cybersecurity starts here
          </p>
          
          {/* Main Headline with Scramble Animation */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              <ScrambleText
                text="Autonomous Security Operations"
                className="text-white"
                scrambleDuration={1000}
                revealDuration={1500}
                delay={200}
              />
            </h1>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 justify-center">
            <a 
              href="/login"
              className="w-40 h-12 rounded-full bg-black border border-[#e01300] text-white text-sm font-semibold hover:bg-[#e01300] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#e01300]/25 flex items-center justify-center"
            >
              Get Started
            </a>
            <a 
              href="#learn-more"
              className="w-40 h-12 rounded-full bg-transparent text-white border border-white text-sm font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
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
  );
}
