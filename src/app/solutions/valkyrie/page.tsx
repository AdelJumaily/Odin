"use client";
import React from "react";
import Navbar from '../../components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { DataCenterRack } from '@/components/ui/data-center-model';
import { 
  CheckCircle, 
  Shield, 
  Database, 
  Lock, 
  Globe, 
  Zap, 
  ArrowRight,
  Search,
  Clock
} from 'lucide-react';

export default function ValkyriePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-800">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/90 to-purple-800/20"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10"></div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                {/* Subtitle */}
                <div className="mb-6">
                  <span className="text-purple-400 text-lg font-medium">Enterprise File Management</span>
                </div>
                
                {/* Main Headline */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  The modern way of
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                    managing files
                  </span>
                </h1>
                
                {/* Description */}
                <p className="text-xl text-gray-300 leading-relaxed">
                  Trusted by 500+ leading companies to secure and manage their file operations, 
                  Valkyrie is the world's most advanced enterprise file management and security platform.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                    <a href="#features">
                      View Features
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right Content - 3D Model */}
              <div className="relative h-[600px] lg:h-[700px]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl backdrop-blur-sm">
                  <DataCenterRack />
                </div>
                {/* Spotlight effect overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30 rounded-2xl pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-24 px-8 sm:px-12 lg:px-16 xl:px-20 bg-gradient-to-br from-slate-900 via-black to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="mb-6">
                <span className="text-purple-400 text-lg font-medium">Developer First Design</span>
              </div>
              
              <h2 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-8">
                Integrate file management in a few easy steps
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Valkyrie's developer portal provides a single elegant interface that enables you to 
                seamlessly integrate our file management products in just a few minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
                >
                  <a href="/contact">
                    Create A Dev Account
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                >
                  <a href="/resources">
                    Read the docs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Content - Code Example */}
            <div className="relative">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden">
                <div className="bg-slate-800 px-4 py-3 border-b border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-4">FileAPI.ts</span>
                  </div>
                </div>
                <div className="p-6">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{`async function initializeFileManagement() {
  const client = new ValkyrieClient({
    apiKey: process.env.VALKYRIE_API_KEY,
    environment: 'production'
  });

  const fileManager = await client
    .fileManagement
    .initialize({
      organizationId: 'org_123',
      securityLevel: 'enterprise'
    });

  return fileManager;
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-8 sm:px-12 lg:px-16 xl:px-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Client and server-side SDKs</h3>
              <p className="text-gray-400">to fast-track implementation</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Advanced file security</h3>
              <p className="text-gray-400">beats any traditional file management solution</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">A single integration that allows you to quickly set up and scale</h3>
              <p className="text-gray-400">across your entire organization</p>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-24 px-8 sm:px-12 lg:px-16 xl:px-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Choose <span className="text-purple-400">Valkyrie</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced file management and security features designed for modern enterprises
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 hover:border-purple-400/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Enterprise Security</h3>
              <p className="text-gray-300">
                Advanced encryption, access controls, and compliance features to keep your files secure.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 hover:border-purple-400/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Database className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Scalable Storage</h3>
              <p className="text-gray-300">
                Handle petabytes of data with our distributed file system and intelligent caching.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 hover:border-purple-400/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Access Control</h3>
              <p className="text-gray-300">
                Granular permissions and role-based access control for complete file management.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}