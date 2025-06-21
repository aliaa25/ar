"use client"
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FurnitureItem({ item, index, onClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
    
      onClick={() => onClick(item)}
      className="w-full max-w-[300px] cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-28 object-contain rounded-md"
      />
      <p className="text-center text-gray-800 mt-2 text-sm sm:text-base font-medium">
        {item.name}
      </p>
    </motion.div>
  );
}
