import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Text, Float } from '@react-three/drei';
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
      
      {/* Career Icons */}
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.8}>
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.5}
          color="#EF4444"
          anchorX="center"
          anchorY="middle"
        >
          🎯
        </Text>
      </Float>
      
      <Float speed={0.9} rotationIntensity={0.2} floatIntensity={1}>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.4}
          color="#10B981"
          anchorX="center"
          anchorY="middle"
        >
          🚀
        </Text>
      </Float>
    </>
  );
}

export default function Hero3D() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full h-[500px] rounded-xl overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'linear-gradient(135deg, #EF4444 0%, #8B5CF6 50%, #10B981 100%)' }}
      >
        <OrbitControls enableZoom={false} enablePan={false} />
        <Scene />
      </Canvas>
    </motion.div>
  );
}