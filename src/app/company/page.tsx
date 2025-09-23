"use client";
import React from "react";
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { 
  Shield, 
  Users, 
  Target, 
  Award, 
  Globe, 
  Heart,
  ArrowRight,
  CheckCircle,
  Building2,
  Cpu,
  Lock
} from "lucide-react";

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="bg-gradient-to-br from-gray-800 to-gray-600 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            About <span className="text-blue-600">Odin</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="text-xl text-gray-600 max-w-4xl mx-auto text-center mt-8"
          >
            We are a team of security experts dedicated to protecting enterprises from evolving cyber threats. 
            Our mission is to make the digital world safer through innovative security solutions.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Our <span className="text-blue-400">Mission</span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  To provide enterprise-grade security solutions that protect organizations from sophisticated 
                  cyber threats while enabling them to focus on their core business objectives. We believe 
                  that security should be seamless, intelligent, and always one step ahead of the attackers.
                </p>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Our <span className="text-blue-400">Vision</span>
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  To become the world's most trusted security partner, creating a future where every 
                  organization can operate confidently in the digital landscape without fear of cyber threats.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Core Values</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">Security First</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">Innovation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">Integrity</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">Excellence</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">Customer Success</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Meet Our <span className="text-blue-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of security experts brings together decades of experience in cybersecurity, 
              threat intelligence, and enterprise protection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Security Engineers</h3>
                <p className="text-gray-600 text-sm">
                  Expert developers and architects building our next-generation security platform
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Threat Analysts</h3>
                <p className="text-gray-600 text-sm">
                  Intelligence experts monitoring and analyzing global cyber threats 24/7
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Incident Response</h3>
                <p className="text-gray-600 text-sm">
                  Rapid response specialists ready to help organizations during security incidents
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              By the <span className="text-blue-400">Numbers</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our impact in the cybersecurity landscape
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Enterprises Protected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Security Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-black mb-6">
                Our <span className="text-blue-600">Culture</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                At Odin, we foster a culture of continuous learning, innovation, and collaboration. 
                We believe that the best security solutions come from diverse teams working together 
                to solve complex challenges.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Work-Life Balance</h3>
                    <p className="text-gray-600">We prioritize our team's well-being and personal growth</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Remote-First</h3>
                    <p className="text-gray-600">Flexible work arrangements to attract global talent</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Professional Development</h3>
                    <p className="text-gray-600">Continuous learning opportunities and certification support</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-black mb-6">Join Our Team</h3>
                  <p className="text-gray-600 mb-6">
                    We're always looking for talented individuals who share our passion for cybersecurity 
                    and want to make a difference in the digital world.
                  </p>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
                  >
                    <a href="/contact">
                      View Open Positions
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
