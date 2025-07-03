"use client";

import React from "react";

import { motion } from "framer-motion";


import { BsArrowRight } from "react-icons/bs";

import { FaRegUser, FaImage, FaDownload, FaUpload } from "react-icons/fa";

const LearnUploadFurniture = () => {
  const steps = [
    {
      title: "Sign Up to Meshy",
      desc: "Go to meshy.ai and create your free account in seconds.",
      icon: <FaRegUser className="text-3xl text-[#0d4c3e]" />,
    },
    {
      title: "Upload Your 2D Image",
      desc: "Use the 'Image to 3D' feature and upload a well-lit image.",
      icon: <FaImage className="text-3xl text-[#0d4c3e]" />,
    },
    {
      title: "Download the 3D Model",
      desc: "Download your generated 3D model in .glb or .obj format.",
      icon: <FaDownload className="text-3xl text-[#0d4c3e]" />,
    },
    {
      title: "Upload to Our Platform",
      desc: "Use the 'Upload' button on our home page to preview it in AR.",
      icon: <FaUpload className="text-3xl text-[#0d4c3e]" />,
    },
  ];

  return (
    <section className="bg-[#0d4c3e] min-h-screen py-20 px-4 text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center space-y-16 animate-fade-in">
        {/* Title */}
        <div className="animate-slide-up animation-delay-200">
          {/* <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow tracking-wide">
            Convert Your 2D Image into a 3D Model
          </h1> */}
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-xl md:text-4xl font-extrabold text-white text-center py-4"
          >
            <motion.span
              animate={{ scale: [1, 1.05, 1], rotate: [0, 1.5, -1.5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="inline-block drop-shadow-lg"
            >
              Convert Your 2D Image into a 3D Model
            </motion.span>
          </motion.h2>

          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
            Follow this simple guide to transform your 2D images into realistic 3D models using{' '}
            <motion.a
              href="https://meshy.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-semibold text-yellow-300 hover:text-yellow-400 transition"
              animate={{ x: [0, 3, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Meshy.ai<span className="mt-2"><BsArrowRight /></span>
            </motion.a>

          </p>
        </div>

        {/* Video Section */}
        <div className="flex justify-center animate-slide-up animation-delay-400">
          <video
            controls
            width="800"
            className="rounded-xl border-2 border-white shadow-lg hover:scale-[1.01] transition-transform duration-300"
          >
            <source src="/meshy-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Steps Timeline with Line */}
        <div className="relative max-w-4xl mx-auto space-y-16 animate-slide-up animation-delay-600">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/20 transform -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative w-full flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
            >
              <div className="w-1/2 px-6">
                <motion.div
                  className="bg-white text-[#0d4c3e] rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 border-l-4 border-[#0d4c3e]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    {step.icon}
                    <div>
                      <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                      <p className="text-base leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
{/* 
        CTA
        <div className="bg-white text-[#0d4c3e] px-6 py-8 rounded-xl shadow-lg max-w-3xl mx-auto animate-slide-up animation-delay-800">
          <h3 className="text-2xl font-bold mb-4 text-center">Try it yourself!</h3>
          <p className="text-lg mb-4 text-center">
            Once you have your 3D model, upload it on our platform and explore it in AR!
          </p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="bg-[#0d4c3e] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#0b3d31] transition duration-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default LearnUploadFurniture;