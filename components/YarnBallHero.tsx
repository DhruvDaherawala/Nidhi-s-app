"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls, Stage, Float } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/3d/BAG 1.glb");
  return <primitive object={scene} />;
}

export default function YarnBallHero() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }} style={{ touchAction: 'none' }}>
        <PresentationControls
          speed={1.2}
          global={true}
          zoom={0.3}
          azimuth={[-Math.PI / 2, Math.PI / 2]}
          polar={[0, Math.PI / 2]}
        >
          <directionalLight position={[5, 5, 10]} intensity={5} />
          

        
          <Stage environment="city" intensity={1}>
            <Float
                speed={1.2} 
                rotationIntensity={0.5} 
                floatIntensity={0} 
            >
                <Model />
            </Float>
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
}

// Preload to avoid loading delay
useGLTF.preload("/3d/BAG 1.glb");
