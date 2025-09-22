"use client";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";

export function SatelliteTransmission() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation variables
    let animationId: number;
    let time = 0;

    const draw = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set background
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      for (let i = 0; i < 100; i++) {
        const x = (i * 7.3) % canvas.width;
        const y = (i * 11.7) % canvas.height;
        const opacity = Math.sin(time * 0.001 + i) * 0.5 + 0.5;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
        ctx.fillRect(x, y, 1, 1);
      }

      // Ground station (bottom)
      const groundStationX = canvas.width / 2;
      const groundStationY = canvas.height - 60;
      
      // Ground station base
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(groundStationX - 30, groundStationY - 20, 60, 40);
      
      // Ground station antenna
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(groundStationX - 5, groundStationY - 50, 10, 30);
      
      // Antenna dish
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(groundStationX, groundStationY - 50, 15, 0, Math.PI * 2);
      ctx.fill();

      // Satellite (top)
      const satelliteX = canvas.width / 2 + Math.sin(time * 0.001) * 50;
      const satelliteY = 80;
      
      // Satellite body
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(satelliteX - 20, satelliteY - 10, 40, 20);
      
      // Satellite solar panels
      ctx.fillStyle = "#374151";
      ctx.fillRect(satelliteX - 30, satelliteY - 5, 20, 10);
      ctx.fillRect(satelliteX + 10, satelliteY - 5, 20, 10);
      
      // Satellite antenna
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(satelliteX - 2, satelliteY - 20, 4, 10);

      // Transmission beam
      const beamOpacity = Math.sin(time * 0.005) * 0.3 + 0.7;
      const gradient = ctx.createLinearGradient(groundStationX, groundStationY - 50, satelliteX, satelliteY);
      gradient.addColorStop(0, `rgba(239, 68, 68, ${beamOpacity})`);
      gradient.addColorStop(0.5, `rgba(239, 68, 68, ${beamOpacity * 0.5})`);
      gradient.addColorStop(1, `rgba(239, 68, 68, ${beamOpacity * 0.2})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(groundStationX, groundStationY - 50);
      ctx.lineTo(satelliteX, satelliteY);
      ctx.stroke();

      // Data packets flowing up
      for (let i = 0; i < 3; i++) {
        const packetY = groundStationY - 50 + (time * 0.1 + i * 100) % (satelliteY - groundStationY + 100);
        const packetX = groundStationX + Math.sin(time * 0.002 + i) * 10;
        
        ctx.fillStyle = "#06b6d4";
        ctx.fillRect(packetX - 3, packetY - 3, 6, 6);
      }

      // Data packets flowing down
      for (let i = 0; i < 2; i++) {
        const packetY = satelliteY + (time * 0.08 + i * 80) % (groundStationY - satelliteY);
        const packetX = satelliteX + Math.sin(time * 0.0015 + i) * 8;
        
        ctx.fillStyle = "#10b981";
        ctx.fillRect(packetX - 3, packetY - 3, 6, 6);
      }

      time += 16;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "#0a0a0a" }}
      />
      
      {/* Overlay text */}
      <div className="absolute top-4 left-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-sm font-medium text-[#e1e1e1]"
        >
          Secure Data Transmission:
        </motion.div>
      </div>
      
      <div className="absolute top-4 right-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-sm font-medium text-[#e1e1e1]"
        >
          Satellite
        </motion.div>
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-xs text-[#e1e1e1]"
        >
          Ground Station
        </motion.div>
      </div>
    </div>
  );
}


