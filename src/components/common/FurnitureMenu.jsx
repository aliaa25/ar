
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import FurnitureItem from "@/components/common/FurnitureItem"


export default function FurnitureMenu({
  items,
  onAddItem,
  onUploadClick,
  furnitureFileInputRef,
  mutate,
  handleFurnitureUpload,
  setMenuPosition,
  setSelectedItem,
}) {
  const [filterText, setFilterText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
 

  const handleItemClick = (item) => {
    mutate(item.name, {
      onSuccess: (data) => {
        onAddItem(data.arFileUrl);
        setMenuPosition({ x: 0, y: 0 });
        setSelectedItem({
          ...item,
          arFileUrl: data?.arFileUrl,
        });

        console.log("✅ Item selected and AR URL set:", {
          ...item,
          arFileUrl: data?.arFileUrl,
        });
      },
    });
  };

  // فلترة وترتيب
  const filteredItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div className="px-2">
      {/* Search + Sort */}
      <div className="flex flex-col items-center gap-6 max-w-[400px] mx-auto">
        <input
          type="text"
          placeholder="Search furniture..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-sm"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="asc">Sort: A to Z</option>
          <option value="desc">Sort: Z to A</option>
        </select>
      </div>

      <div className="max-h-[77vh] overflow-y-auto bg-white custom-scrollbar  p-6 sm:p-8 rounded-2xl shadow-xl">
        {/* زر الرفع */}
        <div className="my-3 flex justify-center">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              onClick={onUploadClick}
              className="bg-mainbackground text-white px-6 sm:px-16 md:px-14 py-3 rounded hover:bg-mainbackground/10 transition text-sm sm:text-base"
            >
              Upload Furniture
            </Button>
          </motion.div>
          <input
            type="file"
            accept=".glb,.gltf"
            onChange={handleFurnitureUpload}
            ref={furnitureFileInputRef}
            style={{ display: "none" }}
          />
        </div>

        {/* العناصر */}
        <div className="flex flex-col items-center gap-6  p-9 ">
          {filteredItems.map((item, index) => (
            <FurnitureItem
              key={item._id}
              item={item}
              index={index}
              onClick={handleItemClick}
              
            />
          ))}


        </div>
      </div>
    </div>

  );
}
