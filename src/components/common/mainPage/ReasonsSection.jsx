import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MdViewInAr } from "react-icons/md";
import { FaBrain } from "react-icons/fa";
import { RiToolsFill } from "react-icons/ri";

const features = [
    {
        icon: <MdViewInAr size={40} />,
        title: "Immersive AR",
        text: "Visualize furniture in your real space using cutting-edge AR tech.",
    },
    {
        icon: <FaBrain size={40} />,
        title: "Smart AI Design",
        text: "Get layout suggestions powered by AI to match your style.",
    },
    {
        icon: <RiToolsFill size={40} />,
        title: "Interactive Tools",
        text: "Free tools for measuring, editing, and consulting your design.",
    },
];
const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
};

export default function WhyChooseFancy() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section className="py-20 px-6 bg-gradient-to-br from-[#0d4c3e] to-[#092d25] text-white">
            <div className="max-w-6xl mx-auto" ref={ref}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
                    Why Choose VIDAR?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {features.map(({ icon, title, text }, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            variants={cardVariants}
                            className="bg-white/10 backdrop-blur-md text-white p-6 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.03] transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3 mb-4 text-white">
                                <div className="text-green-300">{icon}</div>
                                <h3 className="text-xl font-semibold">{title}</h3>
                            </div>


                            <p className="text-sm text-white/80">{text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
