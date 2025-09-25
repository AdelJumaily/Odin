"use client";
import React from "react";
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Users,
  Shield
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 bg-black overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
        
        {/* Spotlight Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl opacity-40"></div>
        
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
              className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-blue-400/30"
            >
              <MessageSquare className="w-4 h-4" />
              Get in Touch
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
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Contact{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Us
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
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Ready to enhance your security posture? Get in touch with our team of experts to discuss your cybersecurity needs.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-black border-t border-white/10 relative">
        {/* Spotlight Effects */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-blue-500/15 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">First Name</label>
                        <input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">Last Name</label>
                        <input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300">Company</label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Your Company"
                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
                      <input
                        id="subject"
                        type="text"
                        placeholder="How can we help?"
                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                      <textarea
                        id="message"
                        placeholder="Tell us about your security needs..."
                        rows={5}
                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(147,51,234,0.3)] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
                    >
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
                <p className="text-lg text-gray-300 mb-8">
                  Our security experts are ready to help you protect your organization. 
                  Reach out to us through any of the channels below.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 group shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
                        <p className="text-gray-300 mb-2">Send us an email anytime</p>
                        <a href="mailto:contact@odin.com" className="text-blue-400 hover:text-blue-300 font-medium">
                          contact@odin.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 group shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
                        <p className="text-gray-300 mb-2">Speak with our team directly</p>
                        <a href="tel:+15551234567" className="text-blue-400 hover:text-blue-300 font-medium">
                          +1 (555) 123-4567
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 group shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
                        <p className="text-gray-300 mb-2">Our headquarters</p>
                        <p className="text-gray-300">
                          123 Security Street<br />
                          Cyber City, CC 12345<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 group shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Business Hours</h3>
                        <p className="text-gray-300 mb-2">When we're available</p>
                        <p className="text-gray-300">
                          Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                          Saturday: 10:00 AM - 4:00 PM EST<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-24 bg-black border-t border-white/10 relative">
        {/* Spotlight Effects */}
        <div className="absolute top-1/4 left-1/2 w-80 h-80 bg-red-500/15 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl opacity-40"></div>
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              <span className="text-blue-400">Emergency</span> Security Support
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Experiencing a security incident? Our emergency response team is available 24/7 to help you contain and resolve threats quickly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] hover:shadow-[0_0_50px_rgba(220,38,38,0.3)] transition-all duration-300"
              >
                <a href="tel:+15551234567">
                  Emergency Hotline
                  <Phone className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 hover:border-white/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(147,51,234,0.3)] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
              >
                <a href="mailto:emergency@odin.com">
                  Emergency Email
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