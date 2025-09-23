"use client";
import React from "react";
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Lock, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  Award, 
  Server, 
  Key, 
  Database, 
  Globe, 
  Users,
  ArrowRight,
  FileText,
  Download
} from "lucide-react";

export default function SecurityPage() {
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
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Shield className="w-4 h-4" />
              Enterprise-Grade Security
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Security{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Practices
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Learn about our comprehensive security measures, certifications, and commitment to protecting your data with industry-leading security practices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/50 hover:shadow-2xl hover:shadow-white/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
              >
                <a href="#certifications">
                  View Certifications
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-gray-800 hover:bg-white/25 hover:border-white/40 hover:shadow-2xl hover:shadow-blue-500/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
              >
                <a href="#security-report">
                  Download Security Report
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Security Overview */}
      <section className="py-24 bg-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Our <span className="text-blue-400">Security Framework</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We implement a multi-layered security approach that protects your data at every level of our infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Encryption</h3>
                <p className="text-gray-300 text-sm">
                  End-to-end encryption for all data transmission and storage
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Monitoring</h3>
                <p className="text-gray-300 text-sm">
                  24/7 security monitoring and threat detection
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Access Control</h3>
                <p className="text-gray-300 text-sm">
                  Multi-factor authentication and role-based access
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Server className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Infrastructure</h3>
                <p className="text-gray-300 text-sm">
                  Secure cloud infrastructure with redundancy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Security <span className="text-blue-600">Certifications</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain industry-leading security certifications and compliance standards to ensure the highest level of protection for your data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">SOC 2 Type II</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Certified for security, availability, processing integrity, confidentiality, and privacy
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Certified</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">ISO 27001</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Information security management system certification
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Certified</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Key className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">GDPR Compliant</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Full compliance with European data protection regulations
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Compliant</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Database className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">HIPAA Ready</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Healthcare data protection standards compliance
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Ready</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">PCI DSS</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Payment card industry data security standards
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Compliant</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">Penetration Testing</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Regular third-party security assessments
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Quarterly</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-24 bg-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Security <span className="text-blue-400">Measures</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive security measures protect your data at every level of our infrastructure.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-blue-400" />
                  Data Protection
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">AES-256 encryption for data at rest</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">TLS 1.3 for data in transit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Regular encryption key rotation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Secure data deletion procedures</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-blue-400" />
                  Monitoring & Detection
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">24/7 security operations center</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">AI-powered threat detection</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Real-time incident response</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Comprehensive audit logging</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-400" />
                  Access Control
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Multi-factor authentication (MFA)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Role-based access control (RBAC)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Privileged access management</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Regular access reviews</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Server className="w-6 h-6 text-blue-400" />
                  Infrastructure Security
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Secure cloud infrastructure</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Network segmentation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Regular security updates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Disaster recovery planning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Resources */}
      <section id="security-report" className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Security <span className="text-blue-600">Resources</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download our security documentation and reports to learn more about our security practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 hover:border-blue-400/50 transition-all duration-300 group shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">Security Report</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Comprehensive overview of our security measures and certifications
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
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">Compliance Guide</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Detailed guide to our compliance certifications and standards
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-600/50 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <a href="#">
                    Download Guide
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
                <h3 className="text-xl font-semibold text-black mb-3">Incident Response</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Our incident response procedures and contact information
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-600/50 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <a href="#">
                    View Procedures
                    <ArrowRight className="ml-2 w-4 h-4" />
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
