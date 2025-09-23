"use client";
import React from "react";
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { 
  Users, 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight,
  Shield,
  Code,
  Brain,
  Globe,
  Heart,
  Award,
  Zap
} from "lucide-react";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section - Anduril Style */}
      <section className="relative py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Headline */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-8 relative">
                Creating technology that's helping to secure the digital world.
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 blur-sm opacity-40"></div>
              </h1>
            </div>
            
            {/* Right Side - Body Text & CTA */}
            <div className="space-y-8">
              <p className="text-lg text-black leading-relaxed">
                Odin is not a traditional cybersecurity company. We privately fund our R&D and deliver 
                finished products off the shelf, meaning we emphasize speed and results. If you like building 
                quickly and seeing your work deployed in real operational scenarios, we want you at Odin.
              </p>
              
              <div className="flex items-center gap-4">
                <a href="#open-positions" className="text-black underline hover:no-underline transition-all duration-300 relative">
                  View Openings
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm opacity-30"></div>
                </a>
                <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 relative shadow-lg shadow-black/20">
                  <ArrowRight className="w-5 h-5 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm opacity-40"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6 relative">
              Explore Our <span className="text-blue-600 relative">
                Benefits
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-600/30 to-blue-600/20 blur-lg opacity-60"></div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl opacity-30"></div>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">Full Family Health Coverage</h3>
              <div className="w-full h-px bg-gray-200 mb-3"></div>
              <p className="text-gray-600 text-sm">
                Your health is our top priority. We offer top tier coverage for medical, dental, vision and life.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">16 Weeks Paid Parental Leave for All Caregivers</h3>
              <div className="w-full h-px bg-gray-200 mb-3"></div>
              <p className="text-gray-600 text-sm">
                Grow your family with ease. We offer four months fully paid to ensure you and your family are taken care of.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">Family Planning & Support</h3>
              <div className="w-full h-px bg-gray-200 mb-3"></div>
              <p className="text-gray-600 text-sm">
                We're proud to offer family planning support. Fertility planning and treatment, adoption support, gestational carrier support and fertility preservation are all included.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">Generous PTO, Sick Time, and Holidays</h3>
              <div className="w-full h-px bg-gray-200 mb-3"></div>
              <p className="text-gray-600 text-sm">
                Balance is everything and ample time off is restorative. Odin provides employees with extremely competitive holistic paid time off plans.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">Mental Health Resources</h3>
              <div className="w-full h-px bg-gray-200 mb-3"></div>
              <p className="text-gray-600 text-sm">
                Health in mind and body. We provide free mental health resources and counseling services for all employees.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">Professional Development</h3>
              <div className="w-full h-px bg-gray-200 mb-3"></div>
              <p className="text-gray-600 text-sm">
                We support professional development opportunities that help you grow your skills and advance your career.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">Life Insurance</h3>
              <div className="w-full h-px bg-gray-200 mb-3"></div>
              <p className="text-gray-600 text-sm">
                Basic life covered 100% by Odin and the option to purchase additional coverage for you and your family.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">Primary & Virtual Care</h3>
              <div className="w-full h-px bg-gray-200 mb-3"></div>
              <p className="text-gray-600 text-sm">
                Free membership with One Medical, same day or next day appointments, and 24/7 virtual care access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-24 bg-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Open <span className="text-blue-400">Positions</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our current job openings and find the perfect role to advance your cybersecurity career.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-white">Senior Security Engineer</CardTitle>
                    <CardDescription className="text-gray-400">Engineering • Full-time • Remote</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  Lead the development of our next-generation security platform, working with cutting-edge technologies 
                  to protect enterprise clients from evolving threats.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Remote</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Full-time</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <a href="#">
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Code className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-white">Frontend Developer</CardTitle>
                    <CardDescription className="text-gray-400">Engineering • Full-time • Remote</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  Build intuitive and secure user interfaces for our security platform using React, TypeScript, 
                  and modern web technologies.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Remote</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Full-time</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <a href="#">
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-white">Threat Intelligence Analyst</CardTitle>
                    <CardDescription className="text-gray-400">Security • Full-time • Remote</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  Analyze global threat landscapes, develop intelligence reports, and help our clients stay ahead 
                  of emerging cybersecurity threats.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Remote</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Full-time</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <a href="#">
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-white">DevOps Engineer</CardTitle>
                    <CardDescription className="text-gray-400">Engineering • Full-time • Remote</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  Build and maintain our secure cloud infrastructure, implement CI/CD pipelines, and ensure 
                  high availability of our security services.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Remote</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Full-time</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <a href="#">
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section id="culture" className="py-24 bg-stone-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Our <span className="text-blue-600">Culture</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe that great security comes from great people. Our culture fosters innovation, collaboration, and continuous learning.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">Values That Drive Us</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Security First</h4>
                      <p className="text-gray-600 text-sm">Every decision we make prioritizes the security and privacy of our clients.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Innovation</h4>
                      <p className="text-gray-600 text-sm">We constantly push boundaries to stay ahead of evolving threats.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Collaboration</h4>
                      <p className="text-gray-600 text-sm">We work together as one team to achieve our mission.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Excellence</h4>
                      <p className="text-gray-600 text-sm">We strive for the highest standards in everything we do.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-black mb-6">Benefits & Perks</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Competitive salary and equity</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Comprehensive health insurance</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Flexible work arrangements</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Professional development budget</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Generous time off policy</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Home office stipend</span>
                    </li>
                  </ul>
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
