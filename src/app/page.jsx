 
// 'use client';
// import Link from 'next/link';

// import React, { useEffect, useState } from 'react';
// import StartButton from '../components/ui/StartButton';




// const HomeContent = () => {
//   return (
//     <main className="bg-[#0d4c3e] font-sans text-white">
//       {/* ---------- Hero Section ---------- */}
//       <section className="relative">
//         <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             preload="auto"
//             className="w-full h-full object-cover object-center"
//           >
//             <source src="/1.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>

//         <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
//           <div className="max-w-2xl text-white drop-shadow-lg">
//             <p className="uppercase text-xs sm:text-sm tracking-widest mb-2">Interior Design</p>
//             <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
//               Flexible Solutions for<br />Your Home Design
//             </h1>
//             <p className="text-sm sm:text-base mb-6">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent malesuada facilisis maximus.
//             </p>

//             {/* Start Now Button */}
//             <div className="flex justify-center">
//           <StartButton/>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ---------- Reasons Section ---------- */}
//       <section className="py-14 px-4 sm:px-6 md:px-10 bg-[#0d4c3e] text-white">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           <h2 className="text-2xl sm:text-3xl font-bold mb-6 col-span-full">
//             Reasons to choose Wardiere Inc.
//           </h2>

//           {[ 
//             {
//               tag: '#AR',
//               title: 'Augmented Reality',
//               text: 'Our AR technology allows customers to preview their furniture in a virtual room.',
//             },
//             {
//               tag: '#AI',
//               title: 'Artificial Intelligence',
//               text: 'Our AI algorithm recommends designs based on your style and room layout.',
//             },
//             {
//               tag: '#Free',
//               title: 'Design Consultations',
//               text: 'Get expert advice and design consultations free of charge.',
//             },
//           ].map(({ tag, title, text }, i) => (
//             <div
//               key={i}
//               className="bg-[#E5F2F8] text-[#0d4c3e] px-6 py-8 rounded-xl transition-transform duration-300 transform hover:scale-[1.03] hover:shadow-xl h-full"
//             >
//               <p className="font-semibold text-sm mb-2">{tag}</p>
//               <h3 className="font-bold text-lg mb-1">{title}</h3>
//               <p className="text-sm">{text}</p>
//             </div>
//           ))}
//         </div>

//         <div className="mt-10 max-w-6xl mx-auto flex justify-center md:justify-end">
//           <button className="group relative flex items-center gap-3 bg-white text-[#0d4c3e] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 hover:pl-10 hover:shadow-md">
//             <span className="transition-all duration-300">Sign up</span>
//             <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
//               ➜
//             </span>
//           </button>
//         </div>
//       </section>

//       {/* ---------- Testimonial Section ---------- */}
//       <section className="bg-[#0d4c3e] py-16 px-4 sm:px-6">
//         <div className="bg-[#E5F2F8] max-w-6xl mx-auto rounded-xl px-4 sm:px-6 py-10 sm:py-12">
//           <h2 className="text-xl sm:text-2xl font-bold text-[#0d4c3e] text-center mb-10">Customer Testimonial</h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {[ 
//               {
//                 name: 'Olivia Wilson',
//                 role: 'Founder of Roodle',
//                 comment: 'Awesome tool!',
//                 feedback: 'Lorem ipsum praesent ac massa quisque sodales quis erat euismod.',
//               },
//               {
//                 name: 'Matt Zhang',
//                 role: 'UI/UX Lead',
//                 comment: 'Super cool!',
//                 feedback: "I use this every day — it's insanely useful and smooth.",
//               },
//               {
//                 name: 'Hannah Morales',
//                 role: 'COO at BeeView',
//                 comment: 'Loved it!',
//                 feedback: 'A must-have tool for creatives and developers. Just wow.',
//               },
//             ].map(({ name, role, comment, feedback }, i) => (
//               <div
//                 key={i}
//                 className="bg-[#0d4c3e] text-white rounded-xl p-6 min-h-[300px] flex flex-col justify-between shadow-lg hover:scale-105 transition-transform duration-300"
//               >
//                 <div>
//                   <div className="text-3xl text-white mb-2">“</div>
//                   <p className="text-lg font-bold">{comment}</p>
//                   <p className="text-sm mt-2 mb-4 leading-relaxed text-white/80">{feedback}</p>
//                   <div className="flex text-yellow-400 text-lg">★★★★★</div>
//                 </div>
//                 <div className="flex items-center gap-3 mt-4">
//                   <img src="/olivia.jpeg" alt={name} className="w-10 h-10 rounded-full object-cover" />
//                   <div>
//                     <p className="font-bold text-sm">{name}</p>
//                     <p className="text-xs text-white/60">{role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ---------- Contact Section with Main Color Card ---------- */}
//       <section className="bg-[#0d4c3e] py-16 px-4">
//         <div className="bg-[#E5F2F8] max-w-6xl mx-auto rounded-xl px-4 sm:px-6 py-12">
//           <h2 className="text-[#0d4c3e] text-lg sm:text-xl font-bold mb-10 flex items-center gap-2">
//             <span className="w-4 h-4 bg-[#0d4c3e] rounded-sm"></span>
//             Contact Us
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
//             {/* Layered Image Stack */}
//             <div className="relative w-fit mx-auto group">
//               <img
//                 src="/blue bedroom.jpeg"
//                 alt="Back"
//                 className="absolute top-0 left-0 w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] object-cover rounded-xl shadow-md transform rotate-[-10deg] -translate-x-14 translate-y-12 opacity-70 scale-90 transition-all duration-700 ease-in-out z-0 
//                 group-hover:translate-x-2 group-hover:translate-y-4 group-hover:rotate-[-3deg] group-hover:opacity-100 group-hover:scale-100"
//               />
//               <img
//                 src="/blue.jpeg"
//                 alt="Middle"
//                 className="absolute top-0 left-0 w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] object-cover rounded-xl shadow-lg transform rotate-[-5deg] -translate-x-6 translate-y-6 opacity-80 scale-95 transition-all duration-700 ease-in-out 
//                 z-10 group-hover:z-30 group-hover:translate-x-0 group-hover:-translate-y-4 group-hover:rotate-[0deg] group-hover:scale-[1.05] group-hover:opacity-100"
//               />
//               <img
//                 src="/blue bedroom.jpeg"
//                 alt="Front"
//                 className="relative w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] object-cover rounded-xl shadow-2xl transform rotate-[2deg] transition-all duration-700 ease-in-out 
//                 z-20 group-hover:z-10 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:brightness-90"
//               />
//             </div>

//             {/* 💚 Contact Card with Main Color */}
//             <div className="relative w-full max-w-md mx-auto bg-[#0d4c3e] rounded-2xl p-6 sm:p-8 text-white shadow-2xl space-y-5 border border-[#ffffff22] flex flex-col items-center justify-center h-[340px]">
//               <div className="text-center space-y-4">
//                 <h3 className="text-lg font-semibold">Let's get in touch</h3>
//                 {[ 
//                   { icon: '📞', text: '2834-45-75' },
//                   { icon: '✉️', text: 'hello@jferltj' },
//                   { icon: '📍', text: 'home.str .djf' },
//                   { icon: '🌐', text: 'www.ekfj.com' },
//                 ].map(({ icon, text }, i) => (
//                   <div key={i} className="flex items-center gap-3 justify-center text-sm border-b border-white/20  last:border-b-0 pb-2">
//                     <span className="text-lg">{icon}</span>
//                     <p>{text}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// const Home = () => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return <HomeContent />;
// };

// export default Home;
// 'use client';

// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import StartButton from '../components/ui/StartButton';
// import Signupbutton from '../components/ui/Signupbutton'

// const HomeContent = () => {
//   return (
//     <main className="bg-[#0d4c3e] font-sans text-white">
//       {/* ---------- Hero Section ---------- */}
//       <section className="relative">
//         <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             preload="auto"
//             className="w-full h-full object-cover object-center"
//           >
//             <source src="/1.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>

//         <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
//           <div className="max-w-2xl text-white drop-shadow-lg">
//             <p className="uppercase text-xs sm:text-sm tracking-widest mb-2">Interior Design</p>
//             <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
//               Flexible Solutions for<br />Your Home Design
//             </h1>
//             <p className="text-sm sm:text-base mb-6">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent malesuada facilisis maximus.
//             </p>

//             {/* Start Now Button */}
//             <div className="flex justify-center">
//               <StartButton />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ---------- Reasons Section ---------- */}
//       <section className="py-14 px-4 sm:px-6 md:px-10 bg-[#0d4c3e] text-white">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           <h2 className="text-2xl sm:text-3xl font-bold mb-6 col-span-full">
//             Reasons to choose Wardiere Inc.
//           </h2>

//           {[
//             {
//               tag: '#AR',
//               title: 'Augmented Reality',
//               text: 'Our AR technology allows customers to preview their furniture in a virtual room.',
//             },
//             {
//               tag: '#AI',
//               title: 'Artificial Intelligence',
//               text: 'Our AI algorithm recommends designs based on your style and room layout.',
//             },
//             {
//               tag: '#Free',
//               title: 'Design Consultations',
//               text: 'Get expert advice and design consultations free of charge.',
//             },
//           ].map(({ tag, title, text }, i) => (
//             <div
//               key={i}
//               className="bg-[#E5F2F8] text-[#0d4c3e] px-6 py-8 rounded-xl transition-transform duration-300 transform hover:scale-[1.03] hover:shadow-xl h-full"
//             >
//               <p className="font-semibold text-sm mb-2">{tag}</p>
//               <h3 className="font-bold text-lg mb-1">{title}</h3>
//               <p className="text-sm">{text}</p>
//             </div>
//           ))}
//         </div>

//         <div className="mt-10 max-w-6xl mx-auto flex justify-center md:justify-end">
//           <Link href="/signup">
//             <button className="group relative flex items-center gap-3 bg-white text-[#0d4c3e] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 hover:pl-10 hover:shadow-md">
//               <span className="transition-all duration-300">Sign up</span>
//               <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
//                 ➜
//               </span>
//             </button>
//           </Link> */
//           <Signupbutton />
          
           
//         </div>
//       </section>

//       ---------- Testimonial Section ----------
//       <section className="bg-[#0d4c3e] py-16 px-4 sm:px-6">
//         <div className="bg-[#E5F2F8] max-w-6xl mx-auto rounded-xl px-4 sm:px-6 py-10 sm:py-12">
//           <h2 className="text-xl sm:text-2xl font-bold text-[#0d4c3e] text-center mb-10">Customer Testimonial</h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {[
//               {
//                 name: 'Olivia Wilson',
//                 role: 'Founder of Roodle',
//                 comment: 'Awesome tool!',
//                 feedback: 'Lorem ipsum praesent ac massa quisque sodales quis erat euismod.',
//               },
//               {
//                 name: 'Matt Zhang',
//                 role: 'UI/UX Lead',
//                 comment: 'Super cool!',
//                 feedback: "I use this every day — it's insanely useful and smooth.",
//               },
//               {
//                 name: 'Hannah Morales',
//                 role: 'COO at BeeView',
//                 comment: 'Loved it!',
//                 feedback: 'A must-have tool for creatives and developers. Just wow.',
//               },
//             ].map(({ name, role, comment, feedback }, i) => (
//               <div
//                 key={i}
//                 className="bg-[#0d4c3e] text-white rounded-xl p-6 min-h-[300px] flex flex-col justify-between shadow-lg hover:scale-105 transition-transform duration-300"
//               >
//                 <div>
//                   <div className="text-3xl text-white mb-2">“</div>
//                   <p className="text-lg font-bold">{comment}</p>
//                   <p className="text-sm mt-2 mb-4 leading-relaxed text-white/80">{feedback}</p>
//                   <div className="flex text-yellow-400 text-lg">★★★★★</div>
//                 </div>
//                 <div className="flex items-center gap-3 mt-4">
//                   <img src="/olivia.jpeg" alt={name} className="w-10 h-10 rounded-full object-cover" />
//                   <div>
//                     <p className="font-bold text-sm">{name}</p>
//                     <p className="text-xs text-white/60">{role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* ---------- Testimonial Section ----------}
 
          


//       {/* ---------- Contact Section with Main Color Card ---------- */}
//       <section className="bg-[#0d4c3e] py-16 px-4">
//         <div className="bg-[#E5F2F8] max-w-6xl mx-auto rounded-xl px-4 sm:px-6 py-12">
//           <h2 className="text-[#0d4c3e] text-lg sm:text-xl font-bold mb-10 flex items-center gap-2">
//             <span className="w-4 h-4 bg-[#0d4c3e] rounded-sm"></span>
//             Contact Us
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
//             {/* Layered Image Stack */}
//             <div className="relative w-fit mx-auto group">
//               <img
//                 src="/1.jpg"
//                 alt="Back"
//                 className="absolute top-0 left-0 w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] object-cover rounded-xl shadow-md transform rotate-[-10deg] -translate-x-14 translate-y-12 opacity-70 scale-90 transition-all duration-700 ease-in-out z-0 
//                 group-hover:translate-x-2 group-hover:translate-y-4 group-hover:rotate-[-3deg] group-hover:opacity-100 group-hover:scale-100"
//               />
//               <img
//                 src="/2.jpg"
//                 alt="Middle"
//                 className="absolute top-0 left-0 w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] object-cover rounded-xl shadow-lg transform rotate-[-5deg] -translate-x-6 translate-y-6 opacity-80 scale-95 transition-all duration-700 ease-in-out 
//                 z-10 group-hover:z-30 group-hover:translate-x-0 group-hover:-translate-y-4 group-hover:rotate-[0deg] group-hover:scale-[1.05] group-hover:opacity-100"
//               />
//               <img
//                 src="/3.jpg"
//                 alt="Front"
//                 className="relative w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] object-cover rounded-xl shadow-2xl transform rotate-[2deg] transition-all duration-700 ease-in-out 
//                 z-20 group-hover:z-10 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:brightness-90"
//               />
//             </div>

//             {/* 💚 Contact Card with Main Color */}
//             <div className="relative w-full max-w-md mx-auto bg-[#0d4c3e] rounded-2xl p-6 sm:p-8 text-white shadow-2xl space-y-5 border border-[#ffffff22] flex flex-col items-center justify-center h-[340px]">
//               <div className="text-center space-y-4">
//                 <h3 className="text-lg font-semibold">Let's get in touch</h3>
//                 {[
//                   { icon: '📞', text: '2834-45-75' },
//                   { icon: '✉️', text: 'hello@jferltj' },
//                   { icon: '📍', text: 'home.str .djf' },
//                   { icon: '🌐', text: 'www.ekfj.com' },
//                 ].map(({ icon, text }, i) => (
//                   <div key={i} className="flex items-center gap-3 justify-center text-sm border-b border-white/20  last:border-b-0 pb-2">
//                     <span className="text-lg">{icon}</span>
//                     <p>{text}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// const Home = () => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return <HomeContent />;
// };

// export default Home;
// 'use client';

// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion'; // ✅ Needed for animation
// import StartButton from '../components/ui/StartButton';
// import Signupbutton from '../components/ui/Signupbutton';
// import Learnhowto from '../components/ui/Learnhowto'

// const HomeContent = () => {
//   return (
//     <main className="bg-[#0d4c3e] font-sans text-white">
//       {/* ---------- Hero Section ---------- */}
//       <section className="relative">
//         <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             preload="auto"
//             className="w-full h-full object-cover object-center"
//           >
//             <source src="/1.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>

//         <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
//           <div className="max-w-2xl text-white drop-shadow-lg">
//             <p className="uppercase text-xs sm:text-sm tracking-widest mb-2">Interior Design</p>
//             <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
//               Flexible Solutions for<br />Your Home Design
//             </h1>
//             <p className="text-sm sm:text-base mb-6">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent malesuada facilisis maximus.
//             </p>

//             {/* Start Now Button */}
//             <div className="flex justify-center">
//               <StartButton />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ---------- Reasons Section ---------- */}
//       <section className="py-14 px-4 sm:px-6 md:px-10 bg-[#0d4c3e] text-white">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           <h2 className="text-2xl sm:text-3xl font-bold mb-6 col-span-full">
//             Reasons to choose Wardiere Inc.
//           </h2>

//           {[
//             {
//               tag: '#AR',
//               title: 'Augmented Reality',
//               text: 'Our AR technology allows customers to preview their furniture in a virtual room.',
//             },
//             {
//               tag: '#AI',
//               title: 'Artificial Intelligence',
//               text: 'Our AI algorithm recommends designs based on your style and room layout.',
//             },
//             {
//               tag: '#Free',
//               title: 'Design Consultations',
//               text: 'Get expert advice and design consultations free of charge.',
//             },
//           ].map(({ tag, title, text }, i) => (
//             <div
//               key={i}
//               className="bg-[#E5F2F8] text-[#0d4c3e] px-6 py-8 rounded-xl transition-transform duration-300 transform hover:scale-[1.03] hover:shadow-xl h-full"
//             >
//               <p className="font-semibold text-sm mb-2">{tag}</p>
//               <h3 className="font-bold text-lg mb-1">{title}</h3>
//               <p className="text-sm">{text}</p>
//             </div>
//           ))}
//         </div>

//         <div className="mt-10 max-w-6xl mx-auto flex justify-center md:justify-end">
//           <Signupbutton />
//         </div>
//         <div className="mt-10 max-w-6xl mx-auto flex justify-center md:justify-start">
//           <Learnhowto />
//         </div>
//       </section>

//       {/* ---------- Testimonial Section ---------- */}
//       <section className="bg-[#0d4c3e] py-16 px-4 sm:px-6">
//         <div className="bg-[#E5F2F8] max-w-6xl mx-auto rounded-xl px-4 sm:px-6 py-10 sm:py-12">
//           <h2 className="text-xl sm:text-2xl font-bold text-[#0d4c3e] text-center mb-10">Customer Testimonial</h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {[
//               {
//                 name: 'Olivia Wilson',
//                 role: 'Founder of Roodle',
//                 comment: 'Awesome tool!',
//                 feedback: 'Lorem ipsum praesent ac massa quisque sodales quis erat euismod.',
//               },
//               {
//                 name: 'Matt Zhang',
//                 role: 'UI/UX Lead',
//                 comment: 'Super cool!',
//                 feedback: "I use this every day — it's insanely useful and smooth.",
//               },
//               {
//                 name: 'Hannah Morales',
//                 role: 'COO at BeeView',
//                 comment: 'Loved it!',
//                 feedback: 'A must-have tool for creatives and developers. Just wow.',
//               },
//             ].map(({ name, role, comment, feedback }, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: i * 0.2 }}
//                 viewport={{ once: true }}
//                 className="bg-[#0d4c3e] text-white rounded-xl p-6 min-h-[300px] flex flex-col justify-between shadow-lg hover:scale-105 transition-transform duration-300"
//               >
//                 <div>
//                   <div className="text-3xl text-white mb-2">“</div>
//                   <p className="text-lg font-bold">{comment}</p>
//                   <p className="text-sm mt-2 mb-4 leading-relaxed text-white/80">{feedback}</p>
//                   <div className="flex text-yellow-400 text-lg">★★★★★</div>
//                 </div>
//                 <div className="flex items-center gap-3 mt-4">
//                   <img src="/olivia.jpeg" alt={name} className="w-10 h-10 rounded-full object-cover" />
//                   <div>
//                     <p className="font-bold text-sm">{name}</p>
//                     <p className="text-xs text-white/60">{role}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ---------- Contact Section with Main Color Card ---------- */}
//       <section className="bg-[#0d4c3e] py-16 px-4">
//         <div className="bg-[#E5F2F8] max-w-6xl mx-auto rounded-xl px-4 sm:px-6 py-12">
//           <h2 className="text-[#0d4c3e] text-lg sm:text-xl font-bold mb-10 flex items-center gap-2">
//             <span className="w-4 h-4 bg-[#0d4c3e] rounded-sm"></span>
//             Contact Us
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
//             {/* Layered Image Stack */}
//             <div className="relative w-fit mx-auto group">
//               <img
//                 src="/1.jpg"
//                 alt="Back"
//                 className="absolute top-0 left-0 w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] object-cover rounded-xl shadow-md transform rotate-[-10deg] -translate-x-14 translate-y-12 opacity-70 scale-90 transition-all duration-700 ease-in-out z-0 
//                 group-hover:translate-x-2 group-hover:translate-y-4 group-hover:rotate-[-3deg] group-hover:opacity-100 group-hover:scale-100"
//               />
//               <img
//                 src="/2.jpg"
//                 alt="Middle"
//                 className="absolute top-0 left-0 w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] object-cover rounded-xl shadow-lg transform rotate-[-5deg] -translate-x-6 translate-y-6 opacity-80 scale-95 transition-all duration-700 ease-in-out 
//                 z-10 group-hover:z-30 group-hover:translate-x-0 group-hover:-translate-y-4 group-hover:rotate-[0deg] group-hover:scale-[1.05] group-hover:opacity-100"
//               />
//               <img
//                 src="/3.jpg"
//                 alt="Front"
//                 className="relative w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] object-cover rounded-xl shadow-2xl transform rotate-[2deg] transition-all duration-700 ease-in-out 
//                 z-20 group-hover:z-10 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:brightness-90"
//               />
//             </div>

//             {/* Contact Card */}
//             <div className="relative w-full max-w-md mx-auto bg-[#0d4c3e] rounded-2xl p-6 sm:p-8 text-white shadow-2xl space-y-5 border border-[#ffffff22] flex flex-col items-center justify-center h-[340px]">
//               <div className="text-center space-y-4">
//                 <h3 className="text-lg font-semibold">Let's get in touch</h3>
//                 {[
//                   { icon: '📞', text: '2834-45-75' },
//                   { icon: '✉️', text: 'hello@jferltj' },
//                   { icon: '📍', text: 'home.str .djf' },
//                   { icon: '🌐', text: 'www.ekfj.com' },
//                 ].map(({ icon, text }, i) => (
//                   <div key={i} className="flex items-center gap-3 justify-center text-sm border-b border-white/20  last:border-b-0 pb-2">
//                     <span className="text-lg">{icon}</span>
//                     <p>{text}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// const Home = () => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return <HomeContent />;
// };

// export default Home;
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // ✅ Needed for animation
import StartButton from '../components/ui/StartButton';
import Signupbutton from '../components/ui/Signupbutton';
import Learnhowto from '../components/ui/Learnhowto'

const HomeContent = () => {
  return (
    <main className="bg-[#0d4c3e] font-sans text-white">
      {/* ---------- Hero Section ---------- */}
      <section className="relative">
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center"
          >
            <source src="/1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-2xl text-white drop-shadow-lg">
            <p className="uppercase text-xs sm:text-sm tracking-widest mb-2">Interior Design</p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              Flexible Solutions for<br />Your Home Design
            </h1>
            <p className="text-sm sm:text-base mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent malesuada facilisis maximus.
            </p>

            {/* Start Now Button */}
            <div className="flex justify-center">
              <StartButton />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Reasons Section ---------- */}
      <section className="py-14 px-4 sm:px-6 md:px-10 bg-[#0d4c3e] text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 col-span-full">
            Reasons to choose Wardiere Inc.
          </h2>

          {[
            {
              tag: '#AR',
              title: 'Augmented Reality',
              text: 'Our AR technology allows customers to preview their furniture in a virtual room.',
            },
            {
              tag: '#AI',
              title: 'Artificial Intelligence',
              text: 'Our AI algorithm recommends designs based on your style and room layout.',
            },
            {
              tag: '#Free',
              title: 'Design Consultations',
              text: 'Get expert advice and design consultations free of charge.',
            },
          ].map(({ tag, title, text }, i) => (
            <div
              key={i}
              className="bg-white text-[#0d4c3e] px-6 py-8 rounded-xl transition-transform duration-300 transform hover:scale-[1.03] hover:shadow-xl h-full"
            >
              <p className="font-semibold text-sm mb-2">{tag}</p>
              <h3 className="font-bold text-lg mb-1">{title}</h3>
              <p className="text-sm">{text}</p>
            </div>
          ))}
        </div>

        {/* SIGN UP + LEARN HOW TO INLINE */}
        <div className="mt-10 max-w-6xl mx-auto flex flex-col md:flex-row justify-center md:justify-between gap-4 md:gap-6">
          <Signupbutton />
          <Learnhowto />
        </div>
      </section>

      {/* ---------- Testimonial Section ---------- */}
      <section className="bg-[#0d4c3e] py-16 px-4 sm:px-6">
        <div className="bg-white max-w-6xl mx-auto rounded-xl px-4 sm:px-6 py-10 sm:py-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0d4c3e] text-center mb-10">Customer Testimonial</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Olivia Wilson',
                role: 'Founder of Roodle',
                comment: 'Awesome tool!',
                feedback: 'Lorem ipsum praesent ac massa quisque sodales quis erat euismod.',
              },
              {
                name: 'Matt Zhang',
                role: 'UI/UX Lead',
                comment: 'Super cool!',
                feedback: "I use this every day — it's insanely useful and smooth.",
              },
              {
                name: 'Hannah Morales',
                role: 'COO at BeeView',
                comment: 'Loved it!',
                feedback: 'A must-have tool for creatives and developers. Just wow.',
              },
            ].map(({ name, role, comment, feedback }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#0d4c3e] text-white rounded-xl p-6 min-h-[300px] flex flex-col justify-between shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <div>
                  <div className="text-3xl text-white mb-2">“</div>
                  <p className="text-lg font-bold">{comment}</p>
                  <p className="text-sm mt-2 mb-4 leading-relaxed text-white/80">{feedback}</p>
                  <div className="flex text-yellow-400 text-lg">★★★★★</div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <img src="/olivia.jpeg" alt={name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm">{name}</p>
                    <p className="text-xs text-white/60">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Contact Section with Main Color Card ---------- */}
      <section className="bg-[#0d4c3e] py-16 px-4">
        <div className="bg-white max-w-6xl mx-auto rounded-xl px-4 sm:px-6 py-12">
          <h2 className="text-[#0d4c3e] text-lg sm:text-xl font-bold mb-10 flex items-center gap-2">
            <span className="w-4 h-4 bg-[#0d4c3e] rounded-sm"></span>
            Contact Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Layered Image Stack */}
            <div className="relative w-fit mx-auto group">
              <img
                src="/1.jpg"
                alt="Back"
                className="absolute top-0 left-0 w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] object-cover rounded-xl shadow-md transform rotate-[-10deg] -translate-x-14 translate-y-12 opacity-70 scale-90 transition-all duration-700 ease-in-out z-0 
                group-hover:translate-x-2 group-hover:translate-y-4 group-hover:rotate-[-3deg] group-hover:opacity-100 group-hover:scale-100"
              />
              <img
                src="/2.jpg"
                alt="Middle"
                className="absolute top-0 left-0 w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] object-cover rounded-xl shadow-lg transform rotate-[-5deg] -translate-x-6 translate-y-6 opacity-80 scale-95 transition-all duration-700 ease-in-out 
                z-10 group-hover:z-30 group-hover:translate-x-0 group-hover:-translate-y-4 group-hover:rotate-[0deg] group-hover:scale-[1.05] group-hover:opacity-100"
              />
              <img
                src="/3.jpg"
                alt="Front"
                className="relative w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] object-cover rounded-xl shadow-2xl transform rotate-[2deg] transition-all duration-700 ease-in-out 
                z-20 group-hover:z-10 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:brightness-90"
              />
            </div>

            {/* Contact Card */}
            <div className="relative w-full max-w-md mx-auto bg-[#0d4c3e] rounded-2xl p-6 sm:p-8 text-white shadow-2xl space-y-5 border border-[#ffffff22] flex flex-col items-center justify-center h-[340px]">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Let's get in touch</h3>
                {[
                  { icon: '📞', text: '2834-45-75' },
                  { icon: '✉️', text: 'hello@jferltj' },
                  { icon: '📍', text: 'home.str .djf' },
                  { icon: '🌐', text: 'www.ekfj.com' },
                ].map(({ icon, text }, i) => (
                  <div key={i} className="flex items-center gap-3 justify-center text-sm border-b border-white/20 last:border-b-0 pb-2">
                    <span className="text-lg">{icon}</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <HomeContent />;
};

export default Home;
