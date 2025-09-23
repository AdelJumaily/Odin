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
  Minus
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
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-800">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          src="/cityroad.mp4"
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
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8">
                The modern way of
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
                  securing enterprises
                </span>
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
                  className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <a href="/contact">
                    Let's Talk
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
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


      {/* Features Grid */}
      <section className="py-24 px-8 sm:px-12 lg:px-16 xl:px-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">5 min implementation time</h3>
              <p className="text-gray-400">to deploy core security functionalities</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Client and server-side SDKs</h3>
              <p className="text-gray-400">to fast-track implementation</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Advanced threat detection</h3>
              <p className="text-gray-400">beats any traditional security solution</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">A single integration that allows you to quickly set up and scale</h3>
              <p className="text-gray-400">across your entire organization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Scale Section */}
      <section className="py-24 px-8 sm:px-12 lg:px-16 xl:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="mb-6">
                <span className="text-blue-600 text-lg font-medium">Global Scale</span>
              </div>
              
              <h2 className="text-5xl sm:text-6xl font-bold text-black leading-tight mb-8">
                Companies across the globe leverage Odin's trusted security platform
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Companies across the globe can leverage Odin's trusted registry of 1 billion+ 
                security events to supercharge threat detection and response. Our global teams 
                are here to support you wherever you and your customers operate.
              </p>
            </div>

            {/* Right Content - 3D Globe */}
            <div className="relative">
              <div className="w-full h-96 mx-auto relative">
                <GlobeDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-8 sm:px-12 lg:px-16 xl:px-20 bg-black border-t border-white/10">
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
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Enterprises Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Uptime Guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Security Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Countries Served</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 px-8 sm:px-12 lg:px-16 xl:px-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Our <span className="text-blue-600">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive security solutions designed to protect your organization from evolving threats
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability) => (
              <div key={capability.id} className="group cursor-pointer">
                <div 
                  className="flex items-center justify-between py-6 border-b border-gray-200 group-hover:border-blue-400/50 transition-colors duration-300"
                  onClick={() => toggleCapability(capability.id)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-blue-600 font-bold text-lg">[{capability.id}]</span>
                    <h3 className="text-xl font-semibold text-black group-hover:text-blue-600 transition-colors duration-300">
                      {capability.title}
                    </h3>
                  </div>
                  {expandedCapability === capability.id ? (
                    <Minus className="w-5 h-5 text-blue-600 transition-all duration-300 rotate-180" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-all duration-300" />
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
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {capability.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-blue-600 font-semibold text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {capability.features.map((feature, index) => (
                          <li key={index} className="text-gray-500 text-sm flex items-center gap-2">
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

      {/* Partners Section */}
      <section className="py-24 px-8 sm:px-12 lg:px-16 xl:px-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Trusted by <span className="text-blue-400">Industry Leaders</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We partner with the world's leading technology companies to deliver enterprise-grade security solutions
            </p>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
