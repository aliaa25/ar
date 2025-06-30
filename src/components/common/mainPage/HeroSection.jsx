"use client";
import { motion } from "framer-motion";
import StartButton from "../../ui/StartButton";

const sentence = "Flexible Solutions for Your Home Design";

const letterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};


export default function HeroVideoSection() {
  return (
    <section className="relative">
      {/* 🎥 Video Background */}
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

      {/* ✨ Floating Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-2xl text-white drop-shadow-lg">
          <p className="uppercase text-xs sm:text-sm tracking-widest mb-2 ">
            Interior Design
          </p>

          {/* 👇 Title with animated letters */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 flex flex-wrap justify-center">
            {sentence.split("").map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterAnimation}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          <p className="text-sm sm:text-base mb-6 text-white">
            Explore, design, and visualize your dream room in 3D or AR with VidAR.
          </p>

          <div className="flex justify-center">
            <StartButton />
          </div>
        </div>
      </div>
    </section>
  );
}

