"use client";
import React from "react";
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { 
  Users, 
  Award, 
  Shield, 
  Globe,
  Linkedin,
  Twitter
} from "lucide-react";

export default function LeadershipPage() {
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
              <Users className="w-4 h-4" />
              Leadership Team
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
                Leadership{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Team
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
              Meet the visionary leaders driving Odin's mission to secure the digital world. 
              Our executive team brings decades of experience in cybersecurity, technology, and business leadership.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Executive <span className="text-blue-600">Leadership</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our leadership team combines deep technical expertise with proven business acumen to guide Odin's strategic vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Alex Chen</h3>
                <p className="text-blue-600 font-medium mb-3">CEO & Co-Founder</p>
                <p className="text-gray-600 text-sm mb-4">
                  Former cybersecurity director at Fortune 500 companies with 15+ years of experience in threat intelligence and enterprise security.
                </p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Sarah Johnson</h3>
                <p className="text-blue-600 font-medium mb-3">CTO & Co-Founder</p>
                <p className="text-gray-600 text-sm mb-4">
                  Former principal engineer at leading tech companies with expertise in distributed systems, AI, and security architecture.
                </p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Michael Rodriguez</h3>
                <p className="text-blue-600 font-medium mb-3">Chief Security Officer</p>
                <p className="text-gray-600 text-sm mb-4">
                  Former government cybersecurity advisor with expertise in threat hunting, incident response, and security operations.
                </p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Emily Davis</h3>
                <p className="text-blue-600 font-medium mb-3">VP of Engineering</p>
                <p className="text-gray-600 text-sm mb-4">
                  Former engineering manager at top-tier tech companies with expertise in scaling engineering teams and product development.
                </p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">David Kim</h3>
                <p className="text-blue-600 font-medium mb-3">VP of Sales</p>
                <p className="text-gray-600 text-sm mb-4">
                  Former enterprise sales leader with 12+ years of experience in cybersecurity sales and customer success.
                </p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Lisa Wang</h3>
                <p className="text-blue-600 font-medium mb-3">VP of Product</p>
                <p className="text-gray-600 text-sm mb-4">
                  Former product manager at leading security companies with expertise in product strategy and market analysis.
                </p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-24 bg-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Leadership <span className="text-blue-400">Principles</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our leadership team is guided by core principles that shape our company culture and decision-making.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Security First</h3>
                <p className="text-gray-300 text-sm">
                  Every decision prioritizes the security and privacy of our clients and their data.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Excellence</h3>
                <p className="text-gray-300 text-sm">
                  We strive for the highest standards in everything we do, from product development to customer service.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Collaboration</h3>
                <p className="text-gray-300 text-sm">
                  We work together as one team, fostering open communication and mutual respect.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
                <p className="text-gray-300 text-sm">
                  We continuously push boundaries to stay ahead of evolving threats and deliver cutting-edge solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
