"use client";

import { SatelliteTransmission } from "@/components/ui/satellite-transmission";
import { motion } from "motion/react";

export function WhatWeDo() {
  const titleWords = ["Security", "Operations"];

  return (
    <section className="w-full min-h-screen py-24 md:py-32 dark:bg-black bg-white">
      {/* Add big horizontal padding here to push content off the left edge */}
      <div className="container mx-auto px-16 sm:px-24 lg:px-32 xl:px-40">
        <div className="grid min-h-[70vh] items-center gap-12 lg:gap-16 lg:grid-cols-2">
          {/* LEFT: text (inherits the container padding) */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-6 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight dark:text-white text-black">
                Global{" "}
                <span className="text-neutral-400">
                  {titleWords.map((w, i) => (
                    <motion.span
                      key={w}
                      className="inline-block"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.12 }}
                    >
                      {w}
                      {i < titleWords.length - 1 ? " " : ""}
                    </motion.span>
                  ))}
                </span>
              </h2>

              <p className="text-lg leading-relaxed text-neutral-500">
                Protect your infrastructure worldwide with our autonomous security
                operations platform. Real-time threat detection and response across
                all continents.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-[#811bf6]" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">24/7 Monitoring</h3>
                  <p className="text-neutral-400">
                    Continuous surveillance of your global infrastructure with AI-powered threat detection.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-[#811bf6]" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Instant Response</h3>
                  <p className="text-neutral-400">
                    Automated incident response and threat mitigation across all connected locations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-[#811bf6]" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Global Coverage</h3>
                  <p className="text-neutral-400">
                    Security operations spanning 6 continents with local expertise and compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="h-[480px] md:h-[560px] lg:h-[600px] w-full rounded-xl overflow-hidden border border-neutral-800 bg-black/40">
              <SatelliteTransmission />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
