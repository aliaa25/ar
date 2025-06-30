//  'use client';
// import Image from 'next/image';

// const blogItems = [
//   { id: 1, title: 'design 1', author: 'Amy', image: '/design1.jpg' },
//   { id: 2, title: 'design 2', author: 'Alex', image: '/design2.jpg' },
//   { id: 3, title: 'design 3', author: 'Nora', image: '/design3.jpg' },
//   { id: 4, title: 'design 4', author: 'Khalid', image: '/design4.jpg' },
//   { id: 5, title: 'design 5', author: 'Sina', image: '/design5.jpg' },
//   { id: 6, title: 'design 6', author: 'Naomi', image: '/design6.jpg' },
// ];

// export default function BlogPage() {
//   return (
//     <main className="bg-[#0d4c3e] font-sans text-white">
//       {/* ---------- Hero Section ---------- */}
//       <section className="relative">
//         <div className="w-full h-[300px] sm:h-[400px] overflow-hidden">
//           <Image
//             src="/hero.jpg"
//             alt="Hero"
//             width={1920}
//             height={1080}
//             className="w-full h-full object-cover object-center"
//           />
//         </div>
//         <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center bg-black/40">
//           <div className="max-w-2xl text-white drop-shadow-lg">
//             <p className="uppercase text-xs tracking-widest mb-2">Inspiration</p>
//             <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
//               Explore Our Design Ideas
//             </h1>
//             <p className="text-sm mb-6">
//               Stay ahead with trending interior ideas and unique looks from our design experts.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ---------- Blog Grid Section ---------- */}
//       <section className="py-16 px-4 sm:px-6 bg-[#0d4c3e]">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-white text-2xl font-bold mb-8 text-center">Latest Designs</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {blogItems.map(({ id, title, author, image }) => (
//               <div
//                 key={id}
//                 className="bg-[#E5F2F8] text-[#0d4c3e] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
//               >
//                 <Image
//                   src={image}
//                   alt={title}
//                   width={400}
//                   height={250}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4 space-y-2">
//                   <h3 className="text-lg font-semibold capitalize">{title}</h3>
//                   <p className="text-sm text-gray-700">Click to edit the text box.</p>
//                   <p className="text-xs italic text-gray-500">By {author}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ---------- Start Your Design Section ---------- */}
//       <section className="bg-[#0d4c3e] text-white py-16 px-4 sm:px-6">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          
//           {/* Left Box Styled Like Blog Cards */}
//           <div className="bg-[#E5F2F8] text-[#0d4c3e] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
//             <div className="p-6 flex flex-col space-y-4 text-center">
//               <div className="mx-auto bg-[#0d4c3e] text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
//                 ★
//               </div>
//               <h3 className="text-xl font-bold">Start your design</h3>
//               <p className="text-sm text-gray-700">
//                 Sample text. Click to select the text box. Click again or double click to start editing the text.
//               </p>
//               <button className="mt-4 px-4 py-2 bg-[#0d4c3e] text-white rounded-full font-semibold hover:bg-[#08382f] transition">
//                 Learn More
//               </button>
//             </div>
//           </div>

//           {/* Right Image */}
//           <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
//             <Image
//               src="/bedroom.jpg" // Make sure this image exists in your public folder
//               alt="Modern Bedroom"
//               width={400}
//               height={250}
//               className="w-full h-40 object-cover"
//             />
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
// 'use client';
// import Image from 'next/image';

// const blogItems = [
//   { id: 1, title: 'design 1', author: 'Amy', image: '/design1.jpg' },
//   { id: 2, title: 'design 2', author: 'Alex', image: '/design2.jpg' },
//   { id: 3, title: 'design 3', author: 'Nora', image: '/design3.jpg' },
//   { id: 4, title: 'design 4', author: 'Khalid', image: '/design4.jpg' },
//   { id: 5, title: 'design 5', author: 'Sina', image: '/design5.jpg' },
//   { id: 6, title: 'design 6', author: 'Naomi', image: '/design6.jpg' },
// ];

// export default function BlogPage() {
//   return (
//     <main className="bg-white text-white font-sans">
//       {/* ---------- Hero Section ---------- */}
//       <section className="relative">
//         <div className="w-full h-[300px] sm:h-[400px] overflow-hidden">
//           <Image
//             src="/hero.jpg"
//             alt="Hero"
//             width={1920}
//             height={1080}
//             className="w-full h-full object-cover object-center"
//           />
//         </div>
//         <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center bg-black/40">
//           <div className="max-w-2xl drop-shadow-lg">
//             <p className="uppercase text-xs tracking-widest mb-2">Inspiration</p>
//             <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
//               Explore Our Design Ideas
//             </h1>
//             <p className="text-sm mb-6">
//               Stay ahead with trending interior ideas and unique looks from our design experts.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ---------- Blog Grid Section ---------- */}
//       <section className="py-16 px-4 sm:px-6 bg-[#E5F2F8]">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-[#0d4c3e] text-2xl font-bold mb-8 text-center">Latest Designs</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {blogItems.map(({ id, title, author, image }) => (
//               <div
//                 key={id}
//                 className="bg-[#0d4c3e] text-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
//               >
//                 <Image
//                   src={image}
//                   alt={title}
//                   width={400}
//                   height={250}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4 space-y-2">
//                   <h3 className="text-lg font-semibold capitalize">{title}</h3>
//                   <p className="text-sm text-white/80">Click to edit the text box.</p>
//                   <p className="text-xs italic text-white/60">By {author}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ---------- Start Your Design Section ---------- */}
//       <section className="py-16 px-4 sm:px-6 bg-[#E5F2F8]">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Text Box */}
//           <div className="bg-[#0d4c3e] text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
//             <div className="p-6 flex flex-col space-y-4 text-center">
//               <div className="mx-auto bg-white text-[#0d4c3e] w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
//                 ★
//               </div>
//               <h3 className="text-xl font-bold">Start your design</h3>
//               <p className="text-sm text-white/80">
//                 Sample text. Click to select the text box. Click again or double click to start editing the text.
//               </p>
//               <button className="mt-4 px-4 py-2 bg-white text-[#0d4c3e] rounded-full font-semibold hover:bg-gray-200 transition">
//                 Learn More
//               </button>
//             </div>
//           </div>

//           {/* Image */}
//           <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
//             <Image
//               src="/bedroom.jpg"
//               alt="Modern Bedroom"
//               width={600}
//               height={400}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
// 'use client';
// import Image from 'next/image';

// const blogItems = [
//   { id: 1, title: 'design 1', author: 'Amy', image: '/design1.jpg' },
//   { id: 2, title: 'design 2', author: 'Alex', image: '/design2.jpg' },
//   { id: 3, title: 'design 3', author: 'Nora', image: '/design3.jpg' },
//   { id: 4, title: 'design 4', author: 'Khalid', image: '/design4.jpg' },
//   { id: 5, title: 'design 5', author: 'Sina', image: '/design5.jpg' },
//   { id: 6, title: 'design 6', author: 'Naomi', image: '/design6.jpg' },
// ];

// export default function BlogPage() {
//   return (
//     <main className="bg-white text-white font-sans">
//       {/* ---------- Hero Section ---------- */}
//       <section className="relative">
//         <div className="w-full h-[300px] sm:h-[400px] overflow-hidden">
//           <Image
//             src="/hero.jpg"
//             alt="Hero"
//             width={1920}
//             height={1080}
//             className="w-full h-full object-cover object-center"
//           />
//         </div>
//         <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center bg-black/40">
//           <div className="max-w-2xl drop-shadow-lg">
//             <p className="uppercase text-xs tracking-widest mb-2">Inspiration</p>
//             <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
//               Explore Our Design Ideas
//             </h1>
//             <p className="text-sm mb-6">
//               Stay ahead with trending interior ideas and unique looks from our design experts.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ---------- Blog Grid Section ---------- */}
//       <section className="py-16 px-4 sm:px-6 bg-[#E5F2F8]">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-[#0d4c3e] text-2xl font-bold mb-8 text-center">Latest Designs</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {blogItems.map(({ id, title, author, image }) => (
//               <div
//                 key={id}
//                 className="bg-[#0d4c3e] text-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
//               >
//                 <Image
//                   src={image}
//                   alt={title}
//                   width={400}
//                   height={250}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4 space-y-2">
//                   <h3 className="text-lg font-semibold capitalize">{title}</h3>
//                   <p className="text-sm text-white/80">Click to edit the text box.</p>
//                   <p className="text-xs italic text-white/60">By {author}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ---------- Start Your Design Section (Full Width) ---------- */}
//       <section className="py-16 px-4 sm:px-6 bg-[#E5F2F8]">
//         <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Text Box */}
//           <div className="bg-[#0d4c3e] text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between mx-auto w-full max-w-6xl px-6 md:px-0">
//             <div className="p-6 flex flex-col space-y-4 text-center">
//               <div className="mx-auto bg-white text-[#0d4c3e] w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
//                 ★
//               </div>
//               <h3 className="text-xl font-bold">Start your design</h3>
//               <p className="text-sm text-white/80">
//                 Sample text. Click to select the text box. Click again or double click to start editing the text.
//               </p>
//               <button className="mt-4 px-4 py-2 bg-white text-[#0d4c3e] rounded-full font-semibold hover:bg-gray-200 transition">
//                 Learn More
//               </button>
//             </div>
//           </div>

//           {/* Image */}
//           <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-6xl mx-auto">
//             <Image
//               src="/bedroom.jpg"
//               alt="Modern Bedroom"
//               width={600}
//               height={400}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
// 'use client';
// import Image from 'next/image';

// const blogItems = [
//   { id: 1, title: 'design 1', author: 'Amy', image: '/design1.jpg' },
//   { id: 2, title: 'design 2', author: 'Alex', image: '/design2.jpg' },
//   { id: 3, title: 'design 3', author: 'Nora', image: '/design3.jpg' },
//   { id: 4, title: 'design 4', author: 'Khalid', image: '/design4.jpg' },
//   { id: 5, title: 'design 5', author: 'Sina', image: '/design5.jpg' },
//   { id: 6, title: 'design 6', author: 'Naomi', image: '/design6.jpg' },
// ];

// export default function BlogPage() {
//   return (
//     <main className="font-sans bg-white text-gray-800">
//       {/* ---------- Hero Section ---------- */}
//       <section className="bg-[#0d4c3e] text-white py-12 px-6">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
//           <Image
//             src="/design5.jpg"
//             alt="Hero"
//             width={600}
//             height={400}
//             className="rounded-xl w-full h-auto object-cover"
//           />
//           <div className="space-y-4">
//             <h1 className="text-3xl sm:text-4xl font-bold">2024 home decor trends</h1>
//             <p className="text-sm sm:text-base text-white/90">
//               Sample text. Click to select the text box. Click again or double click to start editing the text. Duis aute
//               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Suspendisse
//               sem arcu, convallis non pretium sit amet, tincidunt sit amet lectus. Duis aute irure dolor in reprehenderit
//               in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ---------- Blog Grid Section (With Colored Paragraphs) ---------- */}
//       <section className="py-16 px-6 bg-[#f5f5f5]">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {blogItems.map(({ id, title, author, image }) => (
//             <div key={id} className="rounded-xl shadow hover:shadow-lg transition-all overflow-hidden bg-white">
//               <Image
//                 src={image}
//                 alt={title}
//                 width={400}
//                 height={250}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="bg-[#0d4c3e] text-white p-4 space-y-2">
//                 <h3 className="text-lg font-semibold capitalize">{title}</h3>
//                 <p className="text-sm text-white/90">Sample text. Click to select the text box.</p>
//                 <p className="text-xs italic text-white/60">By {author}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ---------- Final CTA Section ---------- */}
//       <section className="w-full h-[500px] grid grid-cols-1 md:grid-cols-2">
//         {/* Left Side */}
//         <div className="bg-[#0d4c3e] text-white flex flex-col justify-center items-center p-8 space-y-4">
//           <div className="bg-white text-[#0d4c3e] w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg">
//             ★
//           </div>
//           <h2 className="text-2xl font-bold text-center">Start your design</h2>
//           <p className="text-sm text-white/80 text-center max-w-sm">
//             Sample text. Click to select the text box. Click again or double click to start editing the text.
//           </p>
//           <button className="mt-4 px-6 py-2 bg-white text-[#0d4c3e] rounded-full font-semibold hover:bg-gray-200 transition">
//             Learn More
//           </button>
//         </div>

//         {/* Right Side */}
//         <div className="w-full h-full">
//           <Image
//             src="/bedroom.jpg"
//             alt="Modern Bedroom"
//             width={800}
//             height={500}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </section>
//     </main>
//   );
// }
// 'use client';
// import Image from 'next/image';

// const blogItems = [
//   { id: 1, title: 'design 1', author: 'Amy', image: '/design1.jpg' },
//   { id: 2, title: 'design 2', author: 'Alex', image: '/design2.jpg' },
//   { id: 3, title: 'design 3', author: 'Nora', image: '/design3.jpg' },
//   { id: 4, title: 'design 4', author: 'Khalid', image: '/design4.jpg' },
//   { id: 5, title: 'design 5', author: 'Sina', image: '/design5.jpg' },
//   { id: 6, title: 'design 6', author: 'Naomi', image: '/design6.jpg' },
// ];

// export default function BlogPage() {
//   return (
//     <main className="font-sans bg-white text-gray-800">
//       {/* ---------- Hero Section ---------- */}
//       <section className="bg-[#0d4c3e] text-white py-12 px-6">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
//           <Image
//             src="/design5.jpg"
//             alt="Hero"
//             width={600}
//             height={400}
//             className="rounded-xl w-full h-auto object-cover"
//           />
//           <div className="space-y-4">
//             <h1 className="text-3xl sm:text-4xl font-bold">2024 home decor trends</h1>
//             <p className="text-sm sm:text-base text-white/90">
//               Sample text. Click to select the text box. Click again or double click to start editing the text. Duis aute
//               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Suspendisse
//               sem arcu, convallis non pretium sit amet, tincidunt sit amet lectus. Duis aute irure dolor in reprehenderit
//               in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ---------- Blog Grid Section (Light Teal Background + Dark Paragraphs) ---------- */}
//       <section className="py-16 px-6 bg-[#E5F2F8]">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {blogItems.map(({ id, title, author, image }) => (
//             <div key={id} className="rounded-xl shadow hover:shadow-lg transition-all overflow-hidden bg-white">
//               <Image
//                 src={image}
//                 alt={title}
//                 width={400}
//                 height={250}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="bg-[#0d4c3e] text-white p-4 space-y-2">
//                 <h3 className="text-lg font-semibold capitalize">{title}</h3>
//                 <p className="text-sm text-white/90">Sample text. Click to select the text box.</p>
//                 <p className="text-xs italic text-white/60">By {author}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ---------- Final CTA Section ---------- */}
//       <section className="w-full h-[500px] grid grid-cols-1 md:grid-cols-2">
//         {/* Left Side */}
//         <div className="bg-[#0d4c3e] text-white flex flex-col justify-center items-center p-8 space-y-4">
//           <div className="bg-white text-[#0d4c3e] w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg">
//             ★
//           </div>
//           <h2 className="text-2xl font-bold text-center">Start your design</h2>
//           <p className="text-sm text-white/80 text-center max-w-sm">
//             Sample text. Click to select the text box. Click again or double click to start editing the text.
//           </p>
//           <button className="mt-4 px-6 py-2 bg-white text-[#0d4c3e] rounded-full font-semibold hover:bg-gray-200 transition">
//             Learn More
//           </button>
//         </div>

//         {/* Right Side */}
//         <div className="w-full h-full">
//           <Image
//             src="/bedroom.jpg"
//             alt="Modern Bedroom"
//             width={800}
//             height={500}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </section>
//     </main>
//   );
// }
// 'use client';
// import Image from 'next/image';

// const blogItems = [
//   { id: 1, title: 'design 1', author: 'Amy', image: '/1.jpg' },
//   { id: 2, title: 'design 2', author: 'Alex', image: '/2.jpg' },
//   { id: 3, title: 'design 3', author: 'Nora', image: '/3.jpg' },
//   { id: 4, title: 'design 4', author: 'Khalid', image: '/1.jpg' },
//   { id: 5, title: 'design 5', author: 'Sina', image: '/2.jpg' },
//   { id: 6, title: 'design 6', author: 'Naomi', image: '/3.jpg' },
// ];

// export default function BlogPage() {
//   return (
//     <main className="font-sans bg-white text-gray-800">
//       {/* ---------- Hero Section ---------- */}
//       <section className="bg-[#0d4c3e] text-white py-12 px-6">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
//           <Image
//             src="/bla.jpg"
//             alt="Hero"
//             width={600}
//             height={400}
//             className="rounded-xl w-full h-auto object-cover"
//           />
//           <div className="space-y-4">
//             <h1 className="text-3xl sm:text-4xl font-bold">2024 home decor trends</h1>
//             <p className="text-sm sm:text-base text-white/90">
//               Sample text. Click to select the text box. Click again or double click to start editing the text. Duis aute
//               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Suspendisse
//               sem arcu, convallis non pretium sit amet, tincidunt sit amet lectus. Duis aute irure dolor in reprehenderit
//               in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ---------- Blog Grid Section ---------- */}
//       <section className="py-16 px-6 bg-[#F1F9F7]">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {blogItems.map(({ id, title, author, image }) => (
//             <div
//               key={id}
//               className="rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.015] overflow-hidden"
//             >
//               <Image
//                 src={image}
//                 alt={title}
//                 width={400}
//                 height={250}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="bg-[#0d4c3e] text-white p-4 space-y-2">
//                 <h3 className="text-lg font-semibold capitalize">{title}</h3>
//                 <p className="text-sm text-white/90">Sample text. Click to select the text box.</p>
//                 <p className="text-xs italic text-white/60">By {author}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ---------- Final CTA Section ---------- */}
//       <section className="w-full h-[500px] grid grid-cols-1 md:grid-cols-2">
//         {/* Left Side */}
//         <div className="bg-[#0d4c3e] text-white flex flex-col justify-center items-center p-8 space-y-4">
//           <div className="bg-white text-[#0d4c3e] w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg">
//             ★
//           </div>
//           <h2 className="text-2xl font-bold text-center">Start your design</h2>
//           <p className="text-sm text-white/80 text-center max-w-sm">
//             Sample text. Click to select the text box. Click again or double click to start editing the text.
//           </p>
//           <button className="mt-4 px-6 py-2 bg-white text-[#0d4c3e] rounded-full font-semibold hover:bg-gray-200 transition">
//             Learn More
//           </button>
//         </div>

//         {/* Right Side */}
//         <div className="w-full h-full">
//           <Image
//             src="/1.jpg"
//             alt="Modern Bedroom"
//             width={800}
//             height={500}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </section>
//     </main>
//   );
// }
'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const blogItems = [
  { id: 1, title: 'design 1', author: 'Amy', image: '/1.jpg' },
  { id: 2, title: 'design 2', author: 'Alex', image: '/2.jpg' },
  { id: 3, title: 'design 3', author: 'Nora', image: '/3.jpg' },
  { id: 4, title: 'design 4', author: 'Khalid', image: '/1.jpg' },
  { id: 5, title: 'design 5', author: 'Sina', image: '/2.jpg' },
  { id: 6, title: 'design 6', author: 'Naomi', image: '/3.jpg' },
];

export default function BlogPage() {
  return (
    <main className="font-sans bg-white text-gray-800">
      {/* ---------- Hero Section ---------- */}
      <section className="bg-[#0d4c3e] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <Image
            src="/bla.jpg"
            alt="Hero"
            width={600}
            height={400}
            className="rounded-xl w-full h-auto object-cover"
          />
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold">2024 home decor trends</h1>
            <p className="text-sm sm:text-base text-white/90">
              Sample text. Click to select the text box. Click again or double click to start editing the text. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Suspendisse
              sem arcu, convallis non pretium sit amet, tincidunt sit amet lectus. Duis aute irure dolor in reprehenderit
              in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Blog Grid Section ---------- */}
      <section className="py-16 px-6 bg-[#F1F9F7]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogItems.map(({ id, title, author, image }) => (
            <div
              key={id}
              className="rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.015] overflow-hidden"
            >
              <Image
                src={image}
                alt={title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="bg-[#0d4c3e] text-white p-4 space-y-2">
                <h3 className="text-lg font-semibold capitalize">{title}</h3>
                <p className="text-sm text-white/90">Sample text. Click to select the text box.</p>
                <p className="text-xs italic text-white/60">By {author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Final CTA Section ---------- */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-[#0d4c3e] text-white flex flex-col justify-center items-center p-8 space-y-4">
          <div className="bg-white text-[#0d4c3e] w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg">
            ★
          </div>
          <h2 className="text-2xl font-bold text-center">Start your design</h2>
          <p className="text-sm text-white/80 text-center max-w-sm">
            Sample text. Click to select the text box. Click again or double click to start editing the text.
          </p>

          {/* Animated "Learn More" Button */}
          <motion.button
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mt-4 px-6 py-2 bg-white text-[#0d4c3e] rounded-full font-semibold flex items-center space-x-2 hover:shadow-md transition-all"
          >
            <span>Learn More</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ➜
            </motion.span>
          </motion.button>
        </div>

        {/* Right Side */}
        <div className="w-full h-[300px] md:h-auto">
          <Image
            src="/1.jpg"
            alt="Modern Bedroom"
            width={800}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}