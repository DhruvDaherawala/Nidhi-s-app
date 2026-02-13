'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Html, Center, Float } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';

function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url);

    // Auto-center and normalize size would be good, usually handled by Stage or manually
    // For now, simple primitive
    return <primitive object={scene} />;
}

function Loader() {
    return (
        <Html center>
            <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <div className="text-primary font-bold text-sm">Loading 3D...</div>
            </div>
        </Html>
    );
}

export default function Product3DViewer({ modelUrl }: { modelUrl?: string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-full h-[500px] bg-muted/20 rounded-xl" />;

    if (!modelUrl) {
        return (
            <div className="w-full h-[500px] bg-muted/20 rounded-xl flex items-center justify-center text-muted-foreground border-2 border-dashed border-border/50">
                <div className="text-center p-6">
                    <span className="text-6xl block mb-4 animate-bounce">🧊</span>
                    <h3 className="text-xl font-bold mb-2">3D Model Coming Soon</h3>
                    <p className="text-sm">We are crafting the digital twin of this masterpiece.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-[500px] bg-gradient-to-br from-background via-white to-secondary/10 rounded-xl overflow-hidden cursor-move border border-border shadow-inner relative group">

            <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Drag to Rotate • Scroll to Zoom
            </div>

            <Canvas shadows dpr={[1, 2]} camera={{ fov: 45, position: [0, 0, 8] }}>
                <Suspense fallback={<Loader />}>
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Stage
                            environment="city"
                            intensity={0.6}
                            shadows={{
                                type: 'contact',
                                resolution: 1024,
                                scale: 10,
                                blur: 2,
                                opacity: 0.5,
                                color: '#4a3b32'
                            }}
                            adjustCamera={1.2}
                        >
                            <Model url={modelUrl} />
                        </Stage>
                    </Float>
                </Suspense>
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={2}
                    enablePan={false}
                    minDistance={2}
                    maxDistance={10}
                    makeDefault
                />
            </Canvas>
        </div>
    );
}
