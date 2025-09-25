"use client";
import React, { Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Shadow } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Function to create dashboard texture
function createDashboardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  // Background
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, 512, 512);
  
  // Header
  ctx.fillStyle = '#8b5cf6';
  ctx.fillRect(0, 0, 512, 60);
  
  // Header text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('VALKYRIE DASHBOARD', 256, 35);
  
  // Status indicators
  ctx.fillStyle = '#10b981';
  ctx.fillRect(20, 80, 12, 12);
  ctx.fillStyle = '#ffffff';
  ctx.font = '14px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('System Online', 40, 90);
  
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(20, 100, 12, 12);
  ctx.fillText('Files Processing', 40, 110);
  
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(20, 120, 12, 12);
  ctx.fillText('Security Alerts', 40, 130);
  
  // Metrics section
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(20, 150, 472, 120);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px Arial';
  ctx.fillText('SYSTEM METRICS', 30, 170);
  
  // Metric bars
  const metrics = [
    { label: 'CPU Usage', value: 0.75, color: '#8b5cf6' },
    { label: 'Memory', value: 0.60, color: '#3b82f6' },
    { label: 'Storage', value: 0.45, color: '#10b981' },
    { label: 'Network', value: 0.85, color: '#f59e0b' }
  ];
  
  metrics.forEach((metric, i) => {
    const y = 190 + i * 20;
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.fillText(metric.label, 30, y);
    
    ctx.fillStyle = '#374151';
    ctx.fillRect(120, y - 8, 200, 8);
    
    ctx.fillStyle = metric.color;
    ctx.fillRect(120, y - 8, 200 * metric.value, 8);
    
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.round(metric.value * 100)}%`, 330, y);
    ctx.textAlign = 'left';
  });
  
  // File activity section
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(20, 290, 472, 100);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px Arial';
  ctx.fillText('FILE ACTIVITY', 30, 310);
  
  ctx.fillStyle = '#8b5cf6';
  ctx.fillRect(30, 320, 8, 8);
  ctx.fillStyle = '#ffffff';
  ctx.font = '12px Arial';
  ctx.fillText('Uploads: 1,247 files', 45, 328);
  
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(30, 340, 8, 8);
  ctx.fillText('Downloads: 892 files', 45, 348);
  
  ctx.fillStyle = '#10b981';
  ctx.fillRect(30, 360, 8, 8);
  ctx.fillText('Processed: 2,139 files', 45, 368);
  
  // Footer
  ctx.fillStyle = '#374151';
  ctx.fillRect(0, 450, 512, 62);
  
  ctx.fillStyle = '#9ca3af';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Last Updated: ' + new Date().toLocaleTimeString(), 256, 470);
  ctx.fillText('Valkyrie Enterprise v2.1.4', 256, 490);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function DataCenterModel() {
  const dashboardTexture = useMemo(() => createDashboardTexture(), []);
  
  // Create a simple server rack representation if the GLTF model fails to load
  return (
    <group>
      {/* Server Rack Structure */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2, 4, 1]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Server Units */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[0, 1.5 - i * 0.4, 0.6]} castShadow>
          <boxGeometry args={[1.8, 0.3, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}
      
      {/* Dashboard Screen */}
      <mesh position={[0, 0, 0.6]} castShadow>
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshBasicMaterial map={dashboardTexture} />
      </mesh>
      
      {/* LED Indicators */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={`led-${i}`} position={[0.7, 1 - i * 0.5, 0.6]} castShadow>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#00ff00" : "#ff0000"} />
        </mesh>
      ))}
      
      {/* Floor shadow */}
      <Shadow 
        position={[0, -2.8, 0]} 
        scale={[3, 3, 3]} 
        opacity={0.4}
        color="#000000"
      />
    </group>
  );
}

export function DataCenterRack() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3, 1.5, 4], fov: 50 }}
        style={{ background: 'transparent' }}
        shadows
      >
        <Suspense fallback={null}>
          {/* Ambient light for general illumination */}
          <ambientLight intensity={0.6} />
          
          {/* Main spotlight from above */}
          <spotLight
            position={[0, 8, 0]}
            angle={0.4}
            penumbra={0.3}
            intensity={3}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={20}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
            color="#ffffff"
          />
          
          {/* Front fill light */}
          <directionalLight
            position={[0, 2, 5]}
            intensity={1.5}
            color="#ffffff"
            castShadow
          />
          
          {/* Purple accent light */}
          <pointLight 
            position={[-3, 4, 3]} 
            intensity={1.2} 
            color="#8b5cf6" 
            castShadow
          />
          
          {/* Blue accent light */}
          <pointLight 
            position={[3, 4, -3]} 
            intensity={1.0} 
            color="#3b82f6" 
            castShadow
          />
          
          {/* Additional side light */}
          <pointLight 
            position={[-4, 2, 0]} 
            intensity={0.8} 
            color="#ffffff" 
            castShadow
          />
          
          {/* Rim light */}
          <pointLight 
            position={[4, 2, 0]} 
            intensity={0.8} 
            color="#ffffff" 
            castShadow
          />
          
          <DataCenterModel />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2.5}
            minPolarAngle={Math.PI / 3}
            enableDamping
            dampingFactor={0.05}
            target={[0, -0.5, 0]}
          />
          
          {/* Floor plane for shadows */}
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -2, 0]} 
            receiveShadow
          >
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              transparent 
              opacity={0.1}
            />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
