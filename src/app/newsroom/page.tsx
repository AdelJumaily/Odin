"use client";
import React from "react";
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { 
  Newspaper, 
  Calendar, 
  User, 
  ArrowRight,
  ExternalLink,
  Download,
  FileText,
  Video,
  Mic
} from "lucide-react";

export default function NewsroomPage() {
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
              <Newspaper className="w-4 h-4" />
              Press & Media
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
                Newsroom
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
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Stay updated with the latest news, press releases, and media coverage about Odin's mission to secure the digital world.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Latest <span className="text-blue-600">Press Releases</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Official announcements and updates from Odin about our products, partnerships, and company milestones.
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
                  Odin Raises $50M Series B to Accelerate Cybersecurity Innovation
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Funding will be used to expand our threat detection capabilities and accelerate product development for enterprise security solutions.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>Press Team</span>
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
                  Odin Partners with Leading Cloud Providers for Enhanced Security Integration
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  New partnerships with AWS, Azure, and Google Cloud will provide seamless security integration for enterprise customers.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>Partnership Team</span>
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
                  Odin Achieves SOC 2 Type II Certification
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Certification demonstrates our commitment to maintaining the highest standards of security, availability, and confidentiality.
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
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-24 bg-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Media <span className="text-blue-400">Coverage</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See what industry publications and media outlets are saying about Odin's innovative approach to cybersecurity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">TechCrunch</h3>
                    <p className="text-gray-400 text-sm">December 12, 2024</p>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  "Odin's AI-Powered Security Platform Raises the Bar for Enterprise Protection"
                </h4>
                <p className="text-gray-300 mb-6">
                  Odin's innovative approach to threat detection using artificial intelligence is setting new standards in the cybersecurity industry...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Read Full Article</span>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <a href="#">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Security Weekly</h3>
                    <p className="text-gray-400 text-sm">December 8, 2024</p>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  "Interview: Odin's CEO on the Future of Cybersecurity"
                </h4>
                <p className="text-gray-300 mb-6">
                  In this exclusive interview, Alex Chen discusses Odin's vision for the future of cybersecurity and how AI is transforming threat detection...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Watch Interview</span>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <a href="#">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Press <span className="text-blue-600">Kit</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download our press kit for logos, images, company information, and other resources for media coverage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">Company Logos</h3>
                <p className="text-gray-600 text-sm mb-6">
                  High-resolution logos in various formats for print and digital use
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-600/50 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <a href="#">
                    Download Logos
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
                <h3 className="text-xl font-semibold text-black mb-3">Company Fact Sheet</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Comprehensive overview of Odin's mission, products, and key statistics
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-600/50 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <a href="#">
                    Download Fact Sheet
                    <Download className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mic className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">Executive Bios</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Detailed biographies and headshots of Odin's leadership team
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-600/50 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <a href="#">
                    Download Bios
                    <Download className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Press */}
      <section className="py-24 bg-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Press <span className="text-blue-400">Contact</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              For media inquiries, interview requests, or press kit access, please contact our press team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/50 hover:shadow-2xl hover:shadow-white/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
              >
                <a href="mailto:press@odin.com">
                  Contact Press Team
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 hover:border-white/40 hover:shadow-2xl hover:shadow-white/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
              >
                <a href="/contact">
                  General Contact
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
