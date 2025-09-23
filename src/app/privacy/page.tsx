"use client";
import React from "react";
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, Database, Users, Globe, AlertCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
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
              <Lock className="w-4 h-4" />
              Data Protection & Privacy
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Privacy{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Your privacy is our priority. This policy explains how we collect, use, and protect your personal information when you use our cybersecurity services.
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <Eye className="w-4 h-4" />
              <span>Last updated: September 23, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="prose prose-lg max-w-none">
            
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-600" />
                1. Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Personal Information</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Company information and job title</li>
                <li>Account credentials and authentication data</li>
                <li>Payment and billing information</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Technical Information</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>IP addresses and device identifiers</li>
                <li>Browser type and version</li>
                <li>Operating system information</li>
                <li>Usage patterns and service interactions</li>
                <li>Security logs and monitoring data</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Database className="w-8 h-8 text-blue-600" />
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to provide, maintain, and improve our cybersecurity services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Deliver and maintain our security services</li>
                <li>Process transactions and manage your account</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Monitor and analyze service performance</li>
                <li>Detect and prevent security threats</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Send important service updates and notifications</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8 text-blue-600" />
                3. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Service Providers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share information with trusted third-party service providers who assist us in operating our services, such as cloud hosting providers, payment processors, and security monitoring services.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Legal Requirements</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may disclose information when required by law, court order, or government request, or to protect our rights, property, or safety, or that of our users.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Business Transfers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Lock className="w-8 h-8 text-blue-600" />
                4. Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement comprehensive security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>End-to-end encryption for data transmission</li>
                <li>Secure data storage with encryption at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection practices</li>
                <li>Incident response and breach notification procedures</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                5. Your Rights and Choices
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Restriction:</strong> Request limitation of processing</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                To exercise these rights, please contact us at privacy@odin.com.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. We may retain certain information for longer periods to comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">7. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-12">
              <h3 className="text-xl font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Contact Us
              </h3>
              <p className="text-blue-800 mb-3">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <p className="text-blue-800">
                Email: privacy@odin.com<br />
                Phone: +1 (555) 123-4567<br />
                Address: 123 Security Street, Cyber City, CC 12345<br />
                Data Protection Officer: dpo@odin.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
