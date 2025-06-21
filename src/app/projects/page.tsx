'use client';

// import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlus, FaSortAmountDown } from "react-icons/fa";

const projectImages = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/1.jpg",
  "/2.jpg",
];

export default function Projects() {

  return (
    <div className="bg-[#0D4C3E] min-h-screen pb-10">
      {/* Banner */}
      <div className="relative w-full h-[300px]">
        <Image
          src="/3.jpg"
          alt="Project Banner"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-6 right-10 text-white text-4xl font-semibold">
          Projects
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <div
          className="flex items-center gap-2 bg-[#0D4C3E] text-white px-4 py-2 rounded-md cursor-pointer"
          // onClick={handleAddNew}
        >
          <FaPlus />
          <span>Add New</span>
        </div>

        <div className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md cursor-pointer">
          <span>Most suitable</span>
          <FaSortAmountDown className="text-[#0D4C3E]" />
        </div>
      </div>

      {/* Latest Designs Section */}
      <div className="bg-white px-8 pt-6 pb-10">
        <h2 className="text-[#0D4C3E] font-bold text-lg mb-4">Your latest designs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {projectImages.map((src, index) => (
            <div key={index} className="w-full">
              <div className="aspect-square relative">
                <Image
                  src={src}
                  alt={`Design ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <p className="text-center text-sm mt-2 text-[#0D4C3E]">lorem</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
