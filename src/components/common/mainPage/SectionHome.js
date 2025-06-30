"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero3DSection() {
  useEffect(() => {
    const loadModelViewer = () => {
      if (!document.querySelector('script[src*="model-viewer"]')) {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
        document.head.appendChild(script);
      }
    };

    loadModelViewer();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#274b3ee6] to-[#0b4738d6] py-20 px-4 text-white">
      {/* Background Bubbles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 bg-white rounded-full animate-bubble blur-md"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 5}s`,
              bottom: '-40px',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-4">
        {/* Left Text Column */}
        <motion.div
          className="text-left md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-6xl font-extrabold tracking-tight leading-snug drop-shadow-xl"
          >
            <span className="inline-block pr-1">Welcome to</span>
            <span className="bg-gradient-to-r from-green-400 to-emerald-800 bg-clip-text text-transparent">
              VIDAR
            </span>
          </motion.h2>

          <p className="text-lg text-white/80 font-bold">
            Your virtual interior design assistant. Upload your room, add furniture, and preview in 3D or AR!
          </p>
          <ul className="list-disc list-inside text-white/80 space-y-1">
            <li> Upload a 2D room image</li>
            <li> Choose furniture from our database</li>
            <li> Arrange and resize items in 3D</li>
            <li> Preview in Augmented Reality</li>
          </ul>

        </motion.div>

        {/* Right 3D Viewer Column */}
        <motion.div
          className="md:w-1/2 w-full rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <model-viewer
            src="/room2.glb"
            alt="VidAR Logo"
            camera-controls
            auto-rotate
            touch-action="pan-y"
            environment-image="neutral"
            style={{
              width: '100%',
              height: '500px',
              borderRadius: '12px',
            }}
          ></model-viewer>
        </motion.div>
      </div>
    </section>
  );
}
