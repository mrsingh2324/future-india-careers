import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function AnimatedSphere({ position, color, size = 1 }: { position: [number, number, number], color: string, size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} position={position} args={[size, 32, 32]}>
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </Sphere>
    </Float>
  );
}

function AnimatedBox({ position, color, size = 1 }: { position: [number, number, number], color: string, size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1}>
      <Box ref={meshRef} position={position} args={[size, size, size]}>
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </Box>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[-5, 5, 5]} intensity={0.8} />
      
      {/* Floating Elements */}
      <AnimatedSphere position={[2, 1, 0]} color="#EF4444" size={0.8} />
      <AnimatedSphere position={[-2, -1, 1]} color="#10B981" size={0.6} />
      <AnimatedSphere position={[1, -2, -1]} color="#F59E0B" size={0.7} />
      
      <AnimatedBox position={[-1, 1, 0]} color="#8B5CF6" size={0.7} />
      <AnimatedBox position={[1.5, -1, 0.5]} color="#06B6D4" size={0.5} />
      
      {/* Additional floating elements for visual interest */}
      <AnimatedSphere position={[0, 2, -1]} color="#EC4899" size={0.4} />
      <AnimatedBox position={[2.5, 0, -0.5]} color="#14B8A6" size={0.4} />
    </>
  );
}

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-[500px] rounded-xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-xl font-semibold">Interactive Experience Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onError={() => setHasError(true)}
      style={{
        border: 'none'
      }}
    >
      {children}
    </div>
  );
}

export default function Hero3D() {
  return (
    <ErrorBoundary>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full h-[500px] rounded-xl overflow-hidden relative"
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'linear-gradient(135deg, #EF4444 0%, #8B5CF6 50%, #10B981 100%)' }}
          onError={() => console.log('Canvas error occurred')}
        >
          <OrbitControls enableZoom={false} enablePan={false} />
          <Scene />
        </Canvas>
        
        {/* HTML Overlay for Icons */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            className="text-6xl"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🎯
          </motion.div>
        </div>
        
        <div className="absolute bottom-16 right-16 pointer-events-none">
          <motion.div
            className="text-4xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            🚀
          </motion.div>
        </div>
      </motion.div>
    </ErrorBoundary>
  );
}