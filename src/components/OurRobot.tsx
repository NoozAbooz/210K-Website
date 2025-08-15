import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Html } from '@react-three/drei';
import { Bot, Settings, Zap, ChevronDown } from 'lucide-react';
import * as THREE from 'three';

// Season data configuration
const seasonData = {
  'push-back': {
    name: 'VRC Push Back',
    year: '2025-2026',
    modelPath: '/models/PB/MOA.glb',
    modelScale: [0.02, 0.02, 0.02] as [number, number, number],
    modelPosition: [0, 0, 0] as [number, number, number],
    images: {
      left: { src: '/models/PB/1.png', alt: 'Face View', title: 'Face View' },
      right: { src: '/models/PB/2.png', alt: 'Back View', title: 'Back View' }
    },
    specs: {
      dimensions: '14.5" × 13.5" × 14"',
      weight: 'very fat',
      driveSystem: '6-motor 450RPM 3.25" Omnis',
      motors: '2x11w Intake'
    }
  },
  'high-stakes': {
    name: 'VRC High Stakes',
    year: '2024-2025',
    modelPath: '/models/HiS/Mecha.glb',
    modelScale: [0.15, 0.15, 0.15] as [number, number, number],
    modelPosition: [0, 0, 0] as [number, number, number],
    images: {
      left: { src: '/models/HiS/1.png', alt: 'Face View', title: 'Face View' },
      right: { src: '/models/HiS/2.png', alt: 'Back View', title: 'Back View' }
    },
    specs: {
      dimensions: '15" × 13.5" × 18"',
      weight: 'heavy enough to bend hs axle after it fell off the table',
      driveSystem: '6-motor 450RPM 3.25" Omnis',
      motors: '11w 600RPM Intake | 2x5.5w 66RPM lady brown'
    }
  }
};

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
function RobotModel({ modelPath, scale, position }: { 
  modelPath: string; 
  scale: [number, number, number]; 
  position: [number, number, number]; 
}) {
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
      scale={scale}
      position={position}
    />
  );
}

// Season dropdown component
function SeasonDropdown({ selectedSeason, onSeasonChange }: { 
  selectedSeason: string; 
  onSeasonChange: (season: string) => void; 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {seasonData[selectedSeason as keyof typeof seasonData]?.name} - {seasonData[selectedSeason as keyof typeof seasonData]?.year}
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {Object.entries(seasonData).map(([key, season]) => (
              <button
                key={key}
                onClick={() => {
                  onSeasonChange(key);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  selectedSeason === key 
                    ? 'bg-blue-100 text-blue-900' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {season.name} - {season.year}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function OurRobot() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState('push-back');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  const currentSeason = seasonData[selectedSeason as keyof typeof seasonData];

  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <section id="our-robot" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <SeasonDropdown 
              selectedSeason={selectedSeason} 
              onSeasonChange={setSelectedSeason} 
            />
          </div>
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
                <h3 className="text-xl font-semibold text-gray-800">Chassis CAD</h3>
              </div>
              
              <div className="flex-1 w-full rounded-xl overflow-hidden bg-[#2a2a2a] relative">
                <Canvas
                  camera={{ position: [0, 6000, 5000], fov: 60 }}
                  onCreated={() => setIsLoading(false)}
                  key={selectedSeason} // Force re-render when season changes
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
                    <RobotModel 
                      modelPath={currentSeason.modelPath} 
                      scale={currentSeason.modelScale} 
                      position={currentSeason.modelPosition} 
                    />
                  </Suspense>
                  
                  <OrbitControls 
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={2}
                    maxDistance={15}
                    autoRotate={false}
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
                <div className="rounded-lg overflow-hidden mb-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => openLightbox(currentSeason.images.left.src)}>
                  <img
                    src={currentSeason.images.left.src}
                    alt={currentSeason.images.left.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{currentSeason.images.left.title}</h4>
                {/* <p className="text-sm text-gray-600">
                  Main drive system and manipulator arm configuration
                </p> */}
              </div>

              {/* Right Image */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="rounded-lg overflow-hidden mb-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => openLightbox(currentSeason.images.right.src)}>
                  <img
                    src={currentSeason.images.right.src}
                    alt={currentSeason.images.right.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{currentSeason.images.right.title}</h4>
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
                 <span className="block font-medium">{currentSeason.specs.dimensions}</span>
               </div>
               <div>
                 <span className="text-gray-600">Weight:</span>
                 <span className="block font-medium">{currentSeason.specs.weight}</span>
               </div>
               <div>
                 <span className="text-gray-600">Drive System:</span>
                 <span className="block font-medium">{currentSeason.specs.driveSystem}</span>
               </div>
               <div>
                 <span className="text-gray-600">Motors:</span>
                 <span className="block font-medium">{currentSeason.specs.motors}</span>
               </div>
             </div>
           </div>
         </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={lightboxImage}
              alt="Enlarged view"
              className="max-w-[95vw] max-h-[95vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
