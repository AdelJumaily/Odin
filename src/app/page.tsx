"use client";
import React, { useState } from "react";
import Navbar from './components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Eye,
  Zap,
  ArrowRight,
  Plus,
  Search,
  CheckCircle,
  Clock,
  Minus,
  Users
} from "lucide-react";
import { GlobeDemo } from "@/components/ui/globe-demo";

export default function Home() {
  const [expandedCapability, setExpandedCapability] = useState<number | null>(null);

  const capabilities = [
    {
      id: 1,
      title: "Threat Detection",
      description: "Advanced AI-powered threat detection that identifies and neutralizes security threats in real-time.",
      features: [
        "Real-time threat monitoring",
        "AI-powered anomaly detection", 
        "Automated incident response",
        "Threat intelligence integration"
      ]
    },
    {
      id: 2,
      title: "Incident Response",
      description: "Rapid response capabilities to contain and remediate security incidents with minimal business impact.",
      features: [
        "24/7 incident monitoring",
        "Automated containment procedures",
        "Expert response team",
        "Post-incident analysis"
      ]
    },
    {
      id: 3,
      title: "Data Analytics",
      description: "Comprehensive security analytics and reporting to provide insights into your security posture.",
      features: [
        "Security metrics dashboard",
        "Compliance reporting",
        "Risk assessment tools",
        "Custom analytics"
      ]
    },
    {
      id: 4,
      title: "Intelligence",
      description: "Threat intelligence and security research to stay ahead of emerging cyber threats.",
      features: [
        "Global threat intelligence",
        "Security research reports",
        "Threat hunting capabilities",
        "Vulnerability management"
      ]
    }
  ];

  const toggleCapability = (id: number) => {
    setExpandedCapability(expandedCapability === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        {/* Spotlight Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl opacity-40"></div>
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          src="/globeSpinning.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10"></div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20 w-full">
            <div className="max-w-4xl">
              {/* Subtitle */}
              <div className="mb-6">
                <span className="text-blue-400 text-lg font-medium">Enterprise Security Platform</span>
              </div>
              
              {/* Main Headline */}
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8 relative">
                The modern way of
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent relative">
                  securing enterprises
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-600/20 blur-xl opacity-60"></div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl opacity-30"></div>
              </h1>
              
              {/* Description */}
              <p className="text-xl text-gray-300 max-w-3xl mb-12 leading-relaxed">
                Trusted by 500+ leading companies to reduce threats and improve security posture, 
                Odin is the world's most advanced security operations and threat detection platform.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 border-0 text-white hover:from-blue-700 hover:to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:shadow-lg"
                >
                  <a href="/contact">
                    Let's Talk
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 hover:border-white/40 hover:shadow-2xl hover:shadow-blue-500/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
                >
                  <a href="/solutions/valkyrie">
                    View Solutions
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 px-8 sm:px-12 lg:px-16 xl:px-20 bg-black border-t border-white/10 relative">
        {/* Spotlight Effects */}
        <div className="absolute top-1/2 left-1/6 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl opacity-70"></div>
        <div className="absolute top-1/3 right-1/6 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl opacity-60"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              <span className="text-red-400">American</span> Security Excellence
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Proudly serving America's most critical organizations with cutting-edge cybersecurity solutions that protect our nation's digital infrastructure
            </p>
          </div>

          {/* Photo Element */}
          <div className="mb-16">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img 
                src="/GA-18.avif" 
                alt="American Flag - National Security"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                  </div>
                  <p className="text-lg font-medium">National Security</p>
                  <p className="text-sm text-gray-300">Protecting America's digital future</p>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {/* First set of logos */}
              <div className="flex space-x-16 items-center flex-shrink-0">
                <div className="text-2xl font-bold text-gray-400">VERCEL</div>
                <div className="text-2xl font-bold text-gray-400">AMAZON</div>
                <div className="text-2xl font-bold text-gray-400">MICROSOFT</div>
                <div className="text-2xl font-bold text-gray-400">GOOGLE</div>
                <div className="text-2xl font-bold text-gray-400">IBM</div>
                <div className="text-2xl font-bold text-gray-400">ORACLE</div>
                <div className="text-2xl font-bold text-gray-400">SALESFORCE</div>
                <div className="text-2xl font-bold text-gray-400">NETFLIX</div>
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex space-x-16 items-center flex-shrink-0">
                <div className="text-2xl font-bold text-gray-400">VERCEL</div>
                <div className="text-2xl font-bold text-gray-400">AMAZON</div>
                <div className="text-2xl font-bold text-gray-400">MICROSOFT</div>
                <div className="text-2xl font-bold text-gray-400">GOOGLE</div>
                <div className="text-2xl font-bold text-gray-400">IBM</div>
                <div className="text-2xl font-bold text-gray-400">ORACLE</div>
                <div className="text-2xl font-bold text-gray-400">SALESFORCE</div>
                <div className="text-2xl font-bold text-gray-400">NETFLIX</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-24 px-8 sm:px-12 lg:px-16 xl:px-20 bg-black relative">
        {/* Spotlight Effects */}
        <div className="absolute top-1/4 left-1/2 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl opacity-40"></div>
        {/* Corner Brackets */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-white"></div>
        <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-white"></div>
        <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-white"></div>
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-white"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8 text-white">
              <div className="flex items-start gap-6">
                {/* Star Icon */}
                <div className="w-6 h-6 text-white mt-2 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                
                <div className="space-y-8">
                  <p className="text-lg leading-relaxed">
                    Global threats are mounting. Turbulence and volatility are the new norm. But as America has proven for centuries, when we embrace daring ideas and resourceful development, we light the way forward.
                  </p>
                  
                  <p className="text-lg leading-relaxed">
                    Odin exists to restore that ethos to American cybersecurity. We accelerate our national security and advance our strategic edge with every challenge answered.
                  </p>
                </div>
              </div>
            </div>

            {/* Photo Element */}
            <div className="relative h-80 rounded-lg overflow-hidden">
              <img 
                src="/_.jpeg" 
                alt="National Security"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                  </div>
                  <p className="text-xl font-medium mb-2">National Security</p>
                  <p className="text-sm text-gray-300">Protecting America's digital infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-8 sm:px-12 lg:px-16 xl:px-20 bg-black border-t border-white/10 relative">
        {/* Spotlight Effects */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-blue-500/15 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">
                Odin delivers advanced security solutions for modern enterprises
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our comprehensive platform provides threat detection, incident response, 
                and compliance management to keep your organization secure. We combine 
                cutting-edge technology with expert knowledge to protect what matters most.
              </p>
              <div className="flex gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-none border-0 font-semibold"
                >
                  <a href="/contact">
                    LEARN MORE
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="space-y-8">
              {/* Photo Element */}
              <div className="relative h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <p className="text-xl font-medium mb-2">Advanced Security</p>
                    <p className="text-sm text-gray-300">Cutting-edge technology for modern enterprises</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 px-8 sm:px-12 lg:px-16 xl:px-20 bg-black border-t border-gray-600 relative">
        {/* Spotlight Effects */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/2 right-1/6 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Our <span className="text-blue-600">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive security solutions designed to protect your organization from evolving threats
            </p>
          </div>

          {/* Photo Element */}
          <div className="mb-16">
            <div className="relative h-64 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Security Capabilities</p>
                  <p className="text-sm text-gray-300">Advanced threat protection and response</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability) => (
              <div key={capability.id} className="group cursor-pointer">
                <div 
                  className="flex items-center justify-between py-6 border-b border-gray-600 group-hover:border-blue-400/50 transition-colors duration-300"
                  onClick={() => toggleCapability(capability.id)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-blue-600 font-bold text-lg">[{capability.id}]</span>
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {capability.title}
                    </h3>
                  </div>
                  {expandedCapability === capability.id ? (
                    <Minus className="w-5 h-5 text-blue-600 transition-all duration-300 rotate-180" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-all duration-300" />
                  )}
                </div>
                
                {/* Expanded Content */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedCapability === capability.id 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="py-6 space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {capability.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-blue-600 font-semibold text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {capability.features.map((feature, index) => (
                          <li key={index} className="text-gray-400 text-sm flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Careers Section - Professional Contractor Style */}
      <section className="py-24 bg-black relative">
        {/* Spotlight Effects */}
        <div className="absolute top-1/3 left-1/3 w-88 h-88 bg-white/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">Careers</h3>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 relative">
                  Join us in securing the future of cybersecurity.
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl opacity-50"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 blur-sm opacity-40"></div>
                </h2>
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                From concept to deployment in a week. An engineer's playground where we build what we believe is right and needs to exist. A dedicated team rallying around a shared mission to make a positive impact by creating a safer digital world. That's life at Odin.
              </p>
              
              <div className="flex items-center gap-4">
                <a href="/careers" className="text-white underline hover:no-underline transition-all duration-300 relative">
                  Learn More
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm opacity-30"></div>
                </a>
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300 relative shadow-lg shadow-white/20">
                  <ArrowRight className="w-5 h-5 text-black" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm opacity-40"></div>
                </button>
              </div>
            </div>

            {/* Right Side - Image Collage */}
            <div className="grid grid-cols-2 gap-4 h-96">
              {/* Top Image - Large Horizontal */}
              <div className="col-span-2 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm">Engineer working on security platform</p>
                </div>
              </div>
              
              {/* Bottom Left Image */}
              <div className="bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-xs">Team collaboration</p>
                </div>
              </div>
              
              {/* Bottom Right Image */}
              <div className="bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-xs">Security operations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
