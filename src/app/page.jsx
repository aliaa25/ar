
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // ✅ Needed for animation
import Hero3DSection from "../components/common/mainPage/SectionHome"
import WhyChooseFancy from "../components/common/mainPage/ReasonsSection"
import HeroVideoSection from '../components/common/mainPage/HeroSection';
import MeetTheTeam from '../components/common/mainPage/MeetTheTeam';
import TransformSection from "../components/common/mainPage/TransformSection";
const BubblesBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    {[...Array(25)].map((_, i) => (
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
);

const HomeContent = () => {
  return (
    <main className="bg-[#0d4c3e] font-sans text-white">
      <BubblesBackground />
      {/* ---------- Hero Section ---------- */}
      <section className="relative">
        <HeroVideoSection />
      </section>
      <Hero3DSection />
      {/* ---------- Reasons Section ---------- */}
      <WhyChooseFancy />

      {/* ---------- MeetTheTeam Section ---------- */}
      <MeetTheTeam />

      {/* ---------- Transformations Section---------- */}
  
    <TransformSection/>
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
