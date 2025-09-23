"use client";
import React from "react";
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  ArrowRight,
  Calendar,
  User,
  Clock,
  ExternalLink,
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <BookOpen className="w-4 h-4" />
              Comprehensive Security Knowledge Base
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeOut",
              }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
            >
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Security{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Resources
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: "easeOut",
              }}
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Access our comprehensive library of security guides, documentation, and best practices 
              to strengthen your organization's cybersecurity posture.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.7,
                duration: 0.8,
                ease: "easeOut",
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/50 hover:shadow-2xl hover:shadow-white/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
              >
                <a href="#documentation">
                  Explore Resources
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-gray-800 hover:bg-white/25 hover:border-white/40 hover:shadow-2xl hover:shadow-blue-500/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
              >
                <a href="#webinars">
                  Join Webinars
                </a>
              </Button>
            </motion.div>
          </div>
          
          {/* Quick Access Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.9,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="mt-20 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
                <p className="text-sm text-gray-600 mb-4">Comprehensive guides and technical docs</p>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-500"
                >
                  <a href="#documentation">
                    Browse Docs
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Video className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Webinars</h3>
                <p className="text-sm text-gray-600 mb-4">Expert-led security training sessions</p>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-500"
                >
                  <a href="#webinars">
                    View Schedule
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Downloads</h3>
                <p className="text-sm text-gray-600 mb-4">Templates, checklists, and reports</p>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-500"
                >
                  <a href="#downloads">
                    Download Now
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="py-24 bg-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              <span className="text-blue-400">Documentation</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive guides and technical documentation for all our security solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  Getting Started Guide
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Complete setup and configuration guide for new users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-400/50 text-blue-400 hover:bg-blue-400 hover:text-white"
                >
                  <a href="#">
                    Read Guide
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  API Reference
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Complete API documentation with examples and code snippets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-400/50 text-blue-400 hover:bg-blue-400 hover:text-white"
                >
                  <a href="#">
                    View API Docs
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  Security Best Practices
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Industry best practices and security recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-400/50 text-blue-400 hover:bg-blue-400 hover:text-white"
                >
                  <a href="#">
                    Read Best Practices
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Security <span className="text-blue-600">Blog</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest cybersecurity trends, threat intelligence, and security insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>December 15, 2024</span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  Zero Trust Architecture: A Complete Guide
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Learn how to implement zero trust security principles in your organization 
                  to enhance your security posture.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>Security Team</span>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    <a href="#">
                      Read More
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>December 10, 2024</span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  Ransomware Trends 2024: What to Watch
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Analysis of emerging ransomware threats and strategies to protect your 
                  organization from these attacks.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>Threat Intelligence</span>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    <a href="#">
                      Read More
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>December 5, 2024</span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  Cloud Security: Best Practices for 2025
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Essential cloud security strategies and tools to secure your cloud infrastructure 
                  and data.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>Cloud Security</span>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    <a href="#">
                      Read More
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="py-24 bg-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Security <span className="text-blue-400">Webinars</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join our expert-led webinars to learn about the latest security trends and best practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Advanced Threat Detection</h3>
                    <p className="text-gray-400 text-sm">January 15, 2025 • 2:00 PM EST</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">
                  Learn about advanced threat detection techniques and how to implement them 
                  in your security operations center.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>60 minutes</span>
                  </div>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <a href="#">
                      Register Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Lock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Incident Response Planning</h3>
                    <p className="text-gray-400 text-sm">January 22, 2025 • 3:00 PM EST</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">
                  Develop a comprehensive incident response plan to minimize damage and 
                  recovery time during security incidents.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>45 minutes</span>
                  </div>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <a href="#">
                      Register Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Security <span className="text-blue-600">Resources</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download our security checklists, templates, and guides to improve your organization's security posture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">Security Checklist</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Comprehensive security checklist to audit your organization's security posture
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-600/50 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <a href="#">
                    Download PDF
                    <Download className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">Incident Response Template</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Ready-to-use incident response plan template for your organization
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-600/50 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <a href="#">
                    Download Template
                    <Download className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">Threat Intelligence Report</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Latest threat intelligence report with emerging security trends
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-600/50 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <a href="#">
                    Download Report
                    <Download className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
