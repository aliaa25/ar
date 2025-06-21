// 'use client';

// import React, { useState, useEffect } from "react";

// import { useRouter } from "next/navigation";

// const ThreeDViewer = () => {
//   const [modelSrc, setModelSrc] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       // تحميل مكتبة A-Frame في المتصفح فقط
//       import("aframe").catch(console.error);
//     }
//   }, []);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileURL = URL.createObjectURL(file);
//       setModelSrc(fileURL);
//       localStorage.setItem("modelSrc", fileURL);
//       router.push("/arPage");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-[50vh] bg-mainbackground p-4 w-full">
//       <h1 className="text-2xl font-bold text-secbackground mb-6">
//         Upload and Display 3D Model
//       </h1>
//       <label className="relative cursor-pointer bg-white border border-gray-300 rounded-lg shadow-sm px-6 py-3 text-gray-700 hover:bg-gray-50 transition-all">
//         <span className="font-medium">Choose a 3D Model</span>
//         <input
//           type="file"
//           accept=".gltf,.glb,.obj"
//           onChange={handleFileChange}
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
//         />
//       </label>
//     </div>
//   );
// };

// export default ThreeDViewer;





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
//       localStorage.setItem("modelSrc", fileURL);
//       router.push("/arPage");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Left Section */}
//       <motion.div
//         initial={{ x: -60, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="md:w-1/2 flex flex-col items-center justify-center bg-[#0d4c3e] text-white px-6 py-20"
//       >
//         <div className="text-center max-w-md">
//           <div className="text-3xl sm:text-4xl font-bold mb-4">
//             ⭐ Start your design
//           </div>
//           <p className="text-sm sm:text-base mb-6 text-white/80">
//             Upload a 3D model to preview your interior in AR instantly.
//           </p>

//           {/* Upload Button with Animation */}
//           <motion.label
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="inline-block relative cursor-pointer bg-white text-[#0d4c3e] font-semibold px-6 py-3 rounded-full shadow-lg transition-all hover:bg-gray-100"
//           >
//             upload 3D model
//             <input
//               type="file"
//               accept=".gltf,.glb,.obj"
//               onChange={handleFileChange}
//               className="absolute inset-0 opacity-0 cursor-pointer"
//             />
//           </motion.label>
//         </div>
//       </motion.div>

//       {/* Right Section */}
//       <div className="md:w-1/2 h-[300px] md:h-auto">
//         <img
//           src="/bedroom.jpg"
//           alt="Room"
//           className="w-full h-full object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default StartDesign;
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
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Left Section */}
//       <motion.div
//         initial={{ x: -60, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="md:w-1/2 flex flex-col items-center justify-center bg-[#0d4c3e] text-white px-6 py-20"
//       >
//         <div className="text-center max-w-md">
//           <div className="text-3xl sm:text-4xl font-bold mb-4">
//             ⭐ Start your design
//           </div>
//           <p className="text-sm sm:text-base mb-6 text-white/80">
//             Upload a 3D model to preview your interior in AR instantly.
//           </p>

//           {/* Animated Upload Button */}
//           <motion.label
//             whileHover={{
//               scale: 1.05,
//               boxShadow: '0 0 15px rgba(255, 255, 255, 0.6)',
//             }}
//             whileTap={{ scale: 0.95 }}
//             className="relative cursor-pointer bg-white text-[#0d4c3e] font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-100 inline-block overflow-hidden"
//           >
//             <span className="relative z-10">Upload 3D Model</span>
//             <input
//               type="file"
//               accept=".gltf,.glb,.obj"
//               onChange={handleFileChange}
//               className="absolute inset-0 opacity-0 cursor-pointer z-20"
//             />
//           </motion.label>
//         </div>
//       </motion.div>

//       {/* Right Section */}
//       <div className="md:w-1/2 h-[300px] md:h-auto">
//         <img
//           src="/5.png"
//           alt="Room"
//           className="w-full h-full object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default StartDesign;
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
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Left Section */}
//       <motion.div
//         initial={{ x: -60, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="md:w-1/2 h-screen flex flex-col items-center justify-center bg-[#0d4c3e] text-white px-6 py-20 relative overflow-hidden"
//       >
//         {/* Optional Background Glow or Icon */}
//         <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl z-0"></div>

//         <div className="text-center max-w-md z-10">
//           <div className="text-3xl sm:text-4xl font-bold mb-4">
//             ⭐ Start your design
//           </div>
//           <p className="text-sm sm:text-base mb-6 text-white/80">
//             Upload a 3D model to preview your interior in AR instantly.
//           </p>

//           {/* Animated Upload Button */}
//           <motion.label
//             whileHover={{
//               scale: 1.05,
//               boxShadow: '0 0 15px rgba(255, 255, 255, 0.6)',
//             }}
//             whileTap={{ scale: 0.95 }}
//             className="relative cursor-pointer bg-white text-[#0d4c3e] font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-100 inline-block overflow-hidden"
//           >
//             <span className="relative z-10">Upload 3D Model</span>
//             <input
//               type="file"
//               accept=".gltf,.glb,.obj"
//               onChange={handleFileChange}
//               className="absolute inset-0 opacity-0 cursor-pointer z-20"
//             />
//           </motion.label>
//         </div>
//       </motion.div>

//       {/* Right Section */}
//       <div className="md:w-1/2 h-screen">
//         <img
//           src="/5.png"
//           alt="Room"
//           className="w-full h-full object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default StartDesign;
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
//       {/* Left Section with animations */}
//       <div className="md:w-1/2 h-screen relative bg-[#0d4c3e] text-white flex items-center justify-center px-6 py-20 overflow-hidden">

//         {/* Glowing blurred background element */}
//         <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-[-100px] right-[-50px] w-[200px] h-[200px] bg-white/10 rounded-full blur-2xl animate-pulse delay-500"></div>

//         {/* Floating circles animation */}
//         <ul className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
//           {[...Array(8)].map((_, i) => (
//             <li
//               key={i}
//               className="absolute list-none w-6 h-6 bg-white/10 rounded-full animate-float"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 animationDelay: `${i * 1.2}s`,
//                 animationDuration: `${4 + i}s`,
//               }}
//             ></li>
//           ))}
//         </ul>

//         {/* Main content */}
//         <motion.div
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1 }}
//           className="text-center max-w-md z-10"
//         >
//           <h1 className="text-3xl sm:text-4xl font-bold mb-4">⭐ Start your design</h1>
//           <p className="text-sm sm:text-base mb-6 text-white/80">
//             Upload a 3D model to preview your interior in AR instantly.
//           </p>

//           {/* Animated Upload Button */}
//           <motion.label
//             whileHover={{
//               scale: 1.05,
//               boxShadow: '0 0 15px rgba(255, 255, 255, 0.6)',
//             }}
//             whileTap={{ scale: 0.95 }}
//             className="relative cursor-pointer bg-white text-[#0d4c3e] font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-100 inline-block overflow-hidden"
//           >
//             <span className="relative z-10">Upload 3D Model</span>
//             <input
//               type="file"
//               accept=".gltf,.glb,.obj"
//               onChange={handleFileChange}
//               className="absolute inset-0 opacity-0 cursor-pointer z-20"
//             />
//           </motion.label>
//         </motion.div>
//       </div>

//       {/* Right Image Section with shimmer */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5, duration: 1.5 }}
//         className="md:w-1/2 h-screen relative"
//       >
//         <img
//           src="/5.png"
//           alt="Room"
//           className="w-full h-full object-cover object-center brightness-95 hover:brightness-100 transition-all duration-700 ease-in-out"
//         />
//         {/* Shimmer Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none"></div>
//       </motion.div>
//     </div>
//   );
// };

// export default StartDesign;
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
