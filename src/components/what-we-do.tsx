"use client";
import { SatelliteTransmission } from "@/components/ui/satellite-transmission";
import { motion } from "motion/react";

export function WhatWeDo() {
  return (
    <div className="py-32 dark:bg-black bg-white w-full min-h-screen">
      <div className="max-w-8xl mx-auto px-16 sm:px-24 lg:px-32 xl:px-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left side - About Us Content */}
          <div className="space-y-8 lg:pl-12 xl:pl-16">
            <div>
              <h2 className="font-bold text-3xl md:text-5xl dark:text-white text-black mb-6">
                Global{" "}
                <span className="text-neutral-400">
                  {"Security Operations".split("").map((word, idx) => (
                    <motion.span
                      key={idx}
                      className="inline-block"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.04 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </h2>
              <p className="text-lg text-neutral-500 leading-relaxed">
                Protect your infrastructure worldwide with our autonomous security operations platform. 
                Real-time threat detection and response across all continents.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-[#811bf6] rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">24/7 Monitoring</h3>
                  <p className="text-neutral-400">Continuous surveillance of your global infrastructure with AI-powered threat detection.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-[#811bf6] rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">Instant Response</h3>
                  <p className="text-neutral-400">Automated incident response and threat mitigation across all connected locations.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-[#811bf6] rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">Global Coverage</h3>
                  <p className="text-neutral-400">Security operations spanning 6 continents with local expertise and compliance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Satellite Transmission Animation */}
          <div className="relative">
            <div className="w-full h-[500px] lg:h-[600px] rounded-lg overflow-hidden border border-neutral-800">
              <SatelliteTransmission />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}