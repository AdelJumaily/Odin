"use client";
import React from "react";
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { Shield, FileText, Calendar, Users, AlertTriangle } from "lucide-react";

export default function TermsOfServicePage() {
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
              <FileText className="w-4 h-4" />
              Legal Documentation
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Terms of{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Please read these terms carefully before using our services. By accessing or using Odin's platform, you agree to be bound by these terms.
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Last updated: September 23, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="prose prose-lg max-w-none">
            
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-600" />
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using Odin's cybersecurity services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                2. Description of Service
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Odin provides enterprise-grade cybersecurity solutions including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Threat detection and monitoring services</li>
                <li>Security consulting and advisory services</li>
                <li>Incident response and recovery services</li>
                <li>Security training and education programs</li>
                <li>Compliance and risk assessment services</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-blue-600" />
                3. User Responsibilities
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a user of our services, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate and complete information when registering for our services</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use our services only for lawful purposes and in accordance with these terms</li>
                <li>Not attempt to gain unauthorized access to our systems or other users' data</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Report any security incidents or vulnerabilities promptly</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Service Availability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we strive to maintain high service availability, Odin does not guarantee uninterrupted access to our services. We reserve the right to modify, suspend, or discontinue any part of our services with reasonable notice.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Data Protection and Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these terms by reference. We implement industry-standard security measures to protect your data.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content, trademarks, and intellectual property rights in our services are owned by Odin or our licensors. You may not copy, modify, distribute, or create derivative works without our express written permission.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the maximum extent permitted by law, Odin shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Either party may terminate this agreement at any time with written notice. Upon termination, your right to use our services will cease immediately, and we may delete your account and data in accordance with our data retention policies.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Odin operates, without regard to conflict of law principles.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">10. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our service. Continued use of our services after such changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-12">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Contact Information</h3>
              <p className="text-blue-800">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-blue-800 mt-2">
                Email: legal@odin.com<br />
                Phone: +1 (555) 123-4567<br />
                Address: 123 Security Street, Cyber City, CC 12345
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
