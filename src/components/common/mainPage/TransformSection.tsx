'use client';

import React from "react";
import {
ReactCompareSlider,
ReactCompareSliderImage
} from "react-compare-slider";

import { motion } from "framer-motion";

const LabelOverlay = ({
text,
position = "left",
}: {
text: string;
position?: "left" | "right";
}) => (
<div
    style={{
    position: "absolute",
    top: "20px",
    [position]: "20px",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "white",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    zIndex: 10,
    }}
>
    {text}
</div>
);

const TransformSection = () => {
return (
    <motion.section
    className="bg-[#0d4c3e] py-16 px-4"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    >
    <div className="max-w-6xl mx-auto text-center text-white">
        <h2 className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-md">
        Room Transformations 
        </h2>

        <div className="w-24 h-1 bg-white mx-auto mb-6 animate-pulse rounded-full"></div>

        <p className="text-lg mb-10 text-gray-200 italic">
        Drag the arrow to see the difference before and after the conversion.
        </p>

        <div className="relative rounded-lg overflow-hidden border-2 border-white shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
        <ReactCompareSlider
            itemOne={
            <div style={{ position: "relative", height: "100%" }}>
                <LabelOverlay text="Before" position="left" />
                <ReactCompareSliderImage src="/before.jpg" alt="Before" />
            </div>
            }
            itemTwo={
            <div style={{ position: "relative", height: "100%" }}>
                <LabelOverlay text="After" position="right" />
                <ReactCompareSliderImage src="/After.jpg" alt="After" />
            </div>
            }
            style={{
            width: "100%",
            height: "500px",
            borderRadius: "12px",
            }}
        />
        </div>
    </div>
    </motion.section>
);
};

export default TransformSection;
