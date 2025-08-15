import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Html } from '@react-three/drei';
import { Bot, Settings, Zap } from 'lucide-react';
import * as THREE from 'three';

// Component to show loading progress
function Loader() {
  return (
    <Html center>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading 3D Model...</p>
      </div>
    </Html>
  );
}

// Robot model component that loads external .obj file
function RobotModel({ modelPath }: { modelPath: string }) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Load the 3D model
  const { scene } = useGLTF(modelPath);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation animation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();

  return (
    <primitive 
      ref={meshRef} 
      object={clonedScene} 
      scale={[0.15, 0.15, 0.15]} // Adjust scale as needed for your model
      position={[0, 0, 0]} // Adjust position as needed
    />
  );
}

export function OurRobot() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Path to your .obj model file
  // You can place your model in the public folder and reference it here
  const modelPath = '/models/simplify_HiSChassis.glb'; // Update this path to your actual model file

  return (
    <section id="our-robot" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">VRC High Stakes - 2024-2025</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Our Robot
            </span>
          </h2>
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our competition robot! Explore the 3D model and discover the engineering 
            behind our innovative design that competes in VRC challenges.
          </p> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* 3D Model Viewer */}
          <div className="space-y-6 h-full">
            <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col">
              <div className="flex items-center space-x-3 mb-4">
                <Bot className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">CAD - v2.0</h3>
              </div>
              
              <div className="flex-1 w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                <Canvas
                  camera={{ position: [0, 6000, 5000], fov: 60 }}
                  onCreated={() => setIsLoading(false)}
                >
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={0.8} />
                  <pointLight position={[-10, -10, -10]} intensity={0.4} />
                  <spotLight 
                    position={[0, 10, 0]} 
                    intensity={0.5} 
                    angle={0.3} 
                    penumbra={0.5} 
                  />
                  
                  <Suspense fallback={<Loader />}>
                    <RobotModel modelPath={modelPath} />
                  </Suspense>
                  
                  <OrbitControls 
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={2}
                    maxDistance={15}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                  />
                  <Environment preset="city" />
                </Canvas>
                
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Initializing 3D Viewer...</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p className="flex items-center space-x-2 mb-2">
                  <Settings className="h-4 w-4" />
                  <span>Drag to rotate • Scroll to zoom • Right-click to pan</span>
                </p>
              </div>
            </div>
          </div>

          {/* Side-by-side Images */}
          <div className="space-y-6 h-full">
           
            <div className="grid grid-cols-2 gap-4">
              {/* Left Image */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="rounded-lg overflow-hidden mb-3">
                  <img
                    src="/models/1.png"
                    alt="Face Views"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Front View</h4>
                {/* <p className="text-sm text-gray-600">
                  Main drive system and manipulator arm configuration
                </p> */}
              </div>

              {/* Right Image */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="rounded-lg overflow-hidden mb-3">
                  <img
                    src="/models/2.png"
                    alt="Back View"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Side View</h4>
                {/* <p className="text-sm text-gray-600">
                  Height profile and mechanism layout details
                </p> */}
              </div>
            </div>

           {/* Robot Stats */}
           <div className="bg-white rounded-xl shadow-lg p-6">
             <h4 className="font-semibold text-gray-800 mb-4">Technical Specifications</h4>
             <div className="grid grid-cols-2 gap-4 text-sm">
               <div>
                 <span className="text-gray-600">Dimensions:</span>
                 <span className="block font-medium">18" × 18" × 18"</span>
               </div>
               <div>
                 <span className="text-gray-600">Weight:</span>
                 <span className="block font-medium">18 lbs</span>
               </div>
               <div>
                 <span className="text-gray-600">Drive System:</span>
                 <span className="block font-medium">6-motor 450RPM 3.25" Omnis</span>
               </div>
               <div>
                 <span className="text-gray-600">Motors:</span>
                 <span className="block font-medium">8 V5 Motors</span>
               </div>
             </div>
           </div>
         </div>
        </div>
      </div>
    </section>
  );
}
