
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';

// const StartDesign = () => {
//   const router = useRouter();

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       import('aframe').catch(console.error);
//     }
//   }, []);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileURL = URL.createObjectURL(file);
//       localStorage.setItem('modelSrc', fileURL);
//       router.push('/arPage');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
//       {/* Left Section */}
//       <div className="md:w-1/2 h-screen relative bg-[#0d4c3e] text-white flex items-center justify-center px-8 py-20 overflow-hidden">
//         {/* Glowing blurred background elements */}
//         <div className="absolute top-[-80px] left-[-60px] w-[300px] h-[300px] bg-white/10 rounded-full blur-[120px] animate-pulse" />
//         <div className="absolute bottom-[-100px] right-[-60px] w-[250px] h-[250px] bg-white/10 rounded-full blur-[100px] animate-pulse delay-700" />

//         {/* Floating decorative circles */}
//         <ul className="absolute inset-0 z-0">
//           {[...Array(10)].map((_, i) => (
//             <li
//               key={i}
//               className="absolute w-4 h-4 bg-white/10 rounded-full animate-float"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 animationDelay: `${i * 0.7}s`,
//                 animationDuration: `${6 + i % 5}s`,
//               }}
//             />
//           ))}
//         </ul>

//         {/* Main content */}
//         <motion.div
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1 }}
//           className="text-center max-w-md z-10"
//         >
//           <h1 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-lg">
//             ⭐ Start your design
//           </h1>
//           <p className="text-sm sm:text-base mb-6 text-white/80 leading-relaxed">
//             Upload your 3D model to instantly visualize your space with stunning AR.
//           </p>

//           {/* Animated Upload Button */}
//           <motion.label
//             whileHover={{
//               scale: 1.06,
//               boxShadow: '0 0 20px rgba(255, 255, 255, 0.7)',
//             }}
//             whileTap={{ scale: 0.95 }}
//             className="relative inline-block bg-white text-[#0d4c3e] font-semibold px-6 py-3 rounded-full shadow-xl overflow-hidden cursor-pointer transition-all duration-300"
//           >
//             <span className="relative z-10">Upload 3D Model</span>
//             <input
//               type="file"
//               accept=".gltf,.glb,.obj"
//               onChange={handleFileChange}
//               className="absolute inset-0 opacity-0 cursor-pointer z-20"
//             />

//             {/* Shine Effect */}
//             <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-10 rotate-12 animate-shine" />
//           </motion.label>
//         </motion.div>
//       </div>

//       {/* Right Image Section */}
//       <motion.div
//         initial={{ scale: 1.02, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ delay: 0.5, duration: 1.2 }}
//         className="md:w-1/2 h-screen relative overflow-hidden"
//       >
//         <img
//           src="/5.png"
//           alt="Room"
//           className="w-full h-full object-cover object-center scale-100 transition-transform duration-[6000ms] ease-in-out hover:scale-105"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />
//       </motion.div>
//     </div>

//   );
// };

// export default StartDesign;
// // // RoomSelector.tsx// RoomSelector.tsx// RoomSelector.tsx// RoomSelector.tsx// RoomSelector.tsx (Viewer for model-viewer rooms only)
// RoomSelector.tsx (Viewer for model-viewer rooms only with routing to custom page)
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

const rooms = [
  { id: 1, name: 'Modern Bedroom', src: '/room1.glb' },
  { id: 2, name: 'Classic Living Room', src: '/room2.glb' },
  { id: 3, name: 'Office Space', src: '/room3.glb' },
  { id: 4, name: 'Small Studio', src: '/room4.glb' },
  { id: 999, name: 'Customizable Room', src: 'custom-aframe-room' },
];

export default function RoomSelector() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!document.querySelector('script[src*="model-viewer"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  const handleSelect = (src) => {
    setSelectedRoom(src);
    setTimeout(() => {
      document.getElementById('main-viewer')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleConfirm = () => {
    if (selectedRoom) {
      if (selectedRoom === 'custom-aframe-room') {
        localStorage.setItem('useCustomRoom', 'true');
        localStorage.removeItem('modelSrc');
      } else {
        localStorage.setItem('modelSrc', selectedRoom);
        localStorage.removeItem('useCustomRoom');
      }
      router.push('/arPage');
    }
  };

  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-3xl md:text-5xl font-extrabold text-center py-4"
      >
        <motion.span
          animate={{ scale: [1, 1.05, 1], rotate: [0, 1.5, -1.5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#3a8575] via-[#0fdeb5] to-[#abd523] drop-shadow-lg"
        >
          Design Your Dream Room in 3D
        </motion.span>
      </motion.h2>

      <div className="flex flex-col gap-8 items-center justify-center py-6">
        {/* Selected Room Preview */}
        {selectedRoom && (
          <>
            <motion.div
              id="main-viewer"
              className="w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl relative bg-white/5"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {selectedRoom === 'custom-aframe-room' ? (
                <div className="w-full h-[500px] bg-gradient-to-br from-[#399a548d] to-[#0c4f16af] flex items-center justify-center text-white text-2xl font-semibold">
                  Preview for Custom Room (4 walls + floor)
                </div>
              ) : (
                <model-viewer
                  src={selectedRoom}
                  alt="Selected Room"
                  camera-controls
                  auto-rotate
                  touch-action="pan-y"
                  environment-image="neutral"
                  style={{
                    width: '100%',
                    height: '500px',
                    borderRadius: '12px',
                    zIndex: 10,
                  }}
                ></model-viewer>
              )}
            </motion.div>

            <motion.div
              className="text-center mt-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={handleConfirm}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 25px rgba(255, 255, 255, 0.7)',
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 20px rgba(255,255,255,0.2)',
                    '0 0 30px rgba(255,255,255,0.4)',
                    '0 0 20px rgba(255,255,255,0.2)',
                  ],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="px-6 py-3 bg-[#0d4c3e] text-white rounded-full transition-all duration-300 hover:bg-[#0a3f34] focus:outline-none"
              >
                Start in AR
              </motion.button>
            </motion.div>
          </>
        )}

        {/* Room Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl p-4">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              className="relative rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10 border border-white/30 shadow-lg group hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-500"
              initial={{ opacity: 0, x: 60 * (index % 2 === 0 ? 1 : -1) }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 + index * 0.2 }}
            >
              {/* Bubbles */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-8 h-8 bg-white/20 rounded-full animate-bubble blur-md"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${8 + Math.random() * 5}s`,
                      bottom: '-40px',
                    }}
                  />
                ))}
              </div>

              {/* Model preview */}
              {room.src !== 'custom-aframe-room' ? (
                <model-viewer
                  src={room.src}
                  alt={room.name}
                  camera-controls
                  auto-rotate
                  touch-action="pan-y"
                  environment-image="neutral"
                  style={{
                    width: '100%',
                    height: '300px',
                    background: 'transparent',
                    position: 'relative',
                    zIndex: 10,
                  }}
                ></model-viewer>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center h-[300px] bg-gradient-to-br from-[#399a548d] to-[#0c4f16af]"
                >
                  <span className="text-2xl font-semibold text-white/70 drop-shadow-md tracking-wide">
                    Your Custom Room
                  </span>
                </motion.div>
              )}

              {/* Hover overlay */}
              <div
                className="absolute inset-0 z-20 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer backdrop-blur-sm"
                onClick={() => handleSelect(room.src)}
              >
                <motion.div
                  whileHover={{ rotate: 90, scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaPlus className="text-white text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
