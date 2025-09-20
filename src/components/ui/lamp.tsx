"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--slate-900), var(--slate-700), var(--slate-900))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-hidden rounded-full z-0 bg-slate-900 w-[30rem] -translate-y-1/2 translate-x-1/2"
        />
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--slate-900), var(--slate-700), var(--slate-900))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900"
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-tr from-slate-900 via-slate-900/50 to-slate-900" />
      </div>

      <div className="relative z-20 flex -translate-y-1/2 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

