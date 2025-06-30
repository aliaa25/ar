'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const StartDesign = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('aframe').catch(console.error);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      localStorage.setItem('modelSrc', fileURL);
      router.push('/arPage');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Section */}
      <div className="md:w-1/2 h-screen relative bg-[#0d4c3e] text-white flex items-center justify-center px-8 py-20 overflow-hidden">
        {/* Glowing blurred background elements */}
        <div className="absolute top-[-80px] left-[-60px] w-[300px] h-[300px] bg-white/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-100px] right-[-60px] w-[250px] h-[250px] bg-white/10 rounded-full blur-[100px] animate-pulse delay-700" />

        {/* Floating decorative circles */}
        <ul className="absolute inset-0 z-0">
          {[...Array(10)].map((_, i) => (
            <li
              key={i}
              className="absolute w-4 h-4 bg-white/10 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${6 + i % 5}s`,
              }}
            />
          ))}
        </ul>

        {/* Main content */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-md z-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-lg">
            ⭐ Start your design
          </h1>
          <p className="text-sm sm:text-base mb-6 text-white/80 leading-relaxed">
            Upload your 3D model to instantly visualize your space with stunning AR.
          </p>

          {/* Animated Upload Button */}
          <motion.label
            whileHover={{
              scale: 1.06,
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.7)',
            }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block bg-white text-[#0d4c3e] font-semibold px-6 py-3 rounded-full shadow-xl overflow-hidden cursor-pointer transition-all duration-300"
          >
            <span className="relative z-10">Upload 3D Model</span>
            <input
              type="file"
              accept=".gltf,.glb,.obj"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
            />

            {/* Shine Effect */}
            <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-10 rotate-12 animate-shine" />
          </motion.label>
        </motion.div>
      </div>

      {/* Right Image Section */}
      <motion.div
        initial={{ scale: 1.02, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="md:w-1/2 h-screen relative overflow-hidden"
      >
        <img
          src="/5.png"
          alt="Room"
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-[6000ms] ease-in-out hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default StartDesign;
