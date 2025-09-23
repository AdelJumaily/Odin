"use client";
import React from "react";
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { 
  Handshake, 
  Building2, 
  Users, 
  Award, 
  ArrowRight,
  Shield,
  Globe,
  Zap,
  Star,
  CheckCircle
} from "lucide-react";

export default function PartnersPage() {
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
              <Handshake className="w-4 h-4" />
              Partnership Program
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
                Partner{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                With Us
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
              Join our partner ecosystem and help organizations worldwide strengthen their cybersecurity posture. 
              Together, we can build a safer digital future.
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
                <a href="#partnership-types">
                  Explore Partnership Types
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-gray-800 hover:bg-white/25 hover:border-white/40 hover:shadow-2xl hover:shadow-blue-500/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
              >
                <a href="#become-partner">
                  Become a Partner
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section id="partnership-types" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Partnership <span className="text-blue-600">Types</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the partnership model that best fits your business and helps you deliver exceptional security solutions to your clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">Technology Partners</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Integrate our security solutions with your technology stack and create powerful combined offerings.
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>API access and integration support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Co-marketing opportunities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Technical training and certification</span>
                  </li>
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-600/50 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <a href="#">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">Channel Partners</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Resell our security solutions and earn competitive margins while helping clients secure their infrastructure.
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Competitive partner margins</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Sales and technical support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Marketing materials and campaigns</span>
                  </li>
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-600/50 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <a href="#">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">Service Partners</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Deliver professional services using our platform and provide comprehensive security consulting to clients.
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Professional services certification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Implementation and support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Referral opportunities</span>
                  </li>
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-600/50 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <a href="#">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-24 bg-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Our <span className="text-blue-400">Partners</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're proud to work with industry-leading organizations that share our commitment to cybersecurity excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Cloud Providers</h3>
                <p className="text-gray-400 text-sm">
                  AWS, Azure, Google Cloud
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">SIEM Partners</h3>
                <p className="text-gray-400 text-sm">
                  Splunk, QRadar, Sentinel
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">System Integrators</h3>
                <p className="text-gray-400 text-sm">
                  Accenture, Deloitte, IBM
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Technology Vendors</h3>
                <p className="text-gray-400 text-sm">
                  Cisco, Palo Alto, Fortinet
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Partner <span className="text-blue-600">Benefits</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our partner program and unlock exclusive benefits designed to help you grow your business and serve your clients better.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-black mb-6">Why Partner With Odin?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Proven Technology</h4>
                      <p className="text-gray-600 text-sm">Industry-leading security platform trusted by 500+ enterprises worldwide.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Comprehensive Support</h4>
                      <p className="text-gray-600 text-sm">Dedicated partner success team, training, and technical support.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Market Opportunity</h4>
                      <p className="text-gray-600 text-sm">Growing cybersecurity market with increasing demand for advanced solutions.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Flexible Programs</h4>
                      <p className="text-gray-600 text-sm">Multiple partnership models to fit your business needs and goals.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-black mb-6">Partner Resources</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Partner portal and training materials</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Co-marketing and lead generation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Technical certification programs</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Sales and technical support</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Competitive pricing and margins</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Regular partner events and updates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section id="become-partner" className="py-24 bg-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to <span className="text-blue-400">Partner</span> With Us?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join our partner ecosystem and start delivering world-class security solutions to your clients. 
              Let's build a safer digital future together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/50 hover:shadow-2xl hover:shadow-white/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
              >
                <a href="/contact">
                  Apply to Become a Partner
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
                  Contact Partner Team
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
