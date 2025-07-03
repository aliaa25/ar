

// "use client";

// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import FurnitureItem from "@/components/common/FurnitureItem";
// import useUploadModel from "@/hooks/useUploadModel";
// import useGetArFile from "@/hooks/useGetArFile";


// import { useRouter } from "next/navigation";

// import { BsLightbulbFill } from "react-icons/bs";
// import toast from "react-hot-toast";

// export default function FurnitureMenu({
//   items = [],
//   onAddItem,
//   mutate,
//   setMenuPosition,
//   setSelectedItem,
// }) {
//   const [filterText, setFilterText] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const furnitureFileInputRef = useRef(null);

//   const uploadMutation = useUploadModel();
//   const getArFileMutation = useGetArFile();
//   const router = useRouter();
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   const onUploadClick = () => {
//     if (!selectedFile) {
//       toast.error("Please select a file first");
//       return;
//     }

//     uploadMutation.mutate(selectedFile, {
//       onSuccess: (data) => {
//         const modelName = data.modelName;

//         getArFileMutation.mutate(modelName, {
//           onSuccess: (arData) => {
//             toast.success("File uploaded and AR file fetched successfully.");
//             if (onAddItem) onAddItem(arData.arFile);
//             localStorage.setItem("uploadFile", JSON.stringify({ arFile: arData.arFile }));
//             setSelectedFile(null);
//           },
//           onError: () => {
//             toast.error("File uploaded but failed to fetch AR file.");
//             setSelectedFile(null);
//           },
//         });
//       },
//       onError: () => {
//         toast.error("Upload failed. Please try again.");
//         setSelectedFile(null);
//       },
//     });
//   };

//   const filteredItems = items
//     .filter((item) => item.name.toLowerCase().includes(filterText.toLowerCase()))
//     .sort((a, b) =>
//       sortOrder === "asc"
//         ? a.name.localeCompare(b.name)
//         : b.name.localeCompare(a.name)
//     );

//   return (
//     <div className="px-2">
//       {/* Search + Sort */}
//       <div className="flex flex-col items-center gap-6 max-w-[400px] mx-auto">
//         <input
//           type="text"
//           placeholder="Search furniture..."
//           value={filterText}
//           onChange={(e) => setFilterText(e.target.value)}
//           className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-sm"
//         />
//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm"
//         >
//           <option value="asc">Sort: A to Z</option>
//           <option value="desc">Sort: Z to A</option>
//         </select>
//       </div>
//   <div className="relative group w-fit mx-auto">
//       {/* لمبة بتنور وتطفي */}
//       <motion.div
//         onClick={() => router.push("/how-to-convert")}
//         className="cursor-pointer"
//         animate={{
//           color: ["#facc15", "#d97706", "#facc15"],
//         }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       >
//         <BsLightbulbFill className="text-3xl sm:text-4xl" />
//       </motion.div>

//       {/* Tooltip يظهر عند الـ Hover */}
//       <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none whitespace-nowrap z-50">
//         How to convert 2D image to 3D
//       </div>
//     </div>

//       <div className="max-h-[77vh] overflow-y-auto bg-white custom-scrollbar p-6 sm:p-8 rounded-2xl shadow-xl">
//         {/* Upload Section */}
//         <div className="max-w-md w-full mx-auto my-6 p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-4">
//           <h2 className="text-lg font-semibold text-gray-800 text-center">Upload 3D Model</h2>
//           <label
//             htmlFor="fileUpload"
//             className="cursor-pointer border border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition"
//           >
//             <p className="text-sm text-gray-600">
//               Click to select a <code>.glb</code> or <code>.gltf</code> file
//             </p>
//             <input
//               id="fileUpload"
//               type="file"
//               accept=".glb,.gltf"
//               ref={furnitureFileInputRef}
//               onChange={handleFileChange}
//               className="hidden"
//             />
//           </label>

//           {selectedFile && (
//             <div className="text-center text-sm text-gray-700 truncate" title={selectedFile.name}>
//               Selected: <span className="font-medium">{selectedFile.name}</span>
//             </div>
//           )}

//           <Button
//             onClick={onUploadClick}
//             disabled={!selectedFile || uploadMutation.isLoading}
//             className={`w-full py-3 rounded-xl text-sm font-medium transition ${!selectedFile
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-green-600 text-white hover:bg-green-700'
//               }`}
//           >
//             {uploadMutation.isLoading ? "Uploading..." : "Submit"}
//           </Button>
//         </div>

//         {/* Furniture List */}
//         <div className="flex flex-col items-center gap-6 p-9">
//           {filteredItems.map((item, index) => (
//             <FurnitureItem
//               key={item._id}
//               item={item}
//               index={index}
//               onClick={() => {
//                 mutate(item.name, {
//                   onSuccess: (data) => {
//                     if (onAddItem) onAddItem(data.arFileUrl);
//                     if (setMenuPosition) setMenuPosition({ x: 0, y: 0 });
//                     if (setSelectedItem)
//                       setSelectedItem({
//                         ...item,
//                         arFileUrl: data?.arFileUrl,
//                       });
//                   },
//                 });
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Fullscreen Loading Spinner */}
//       {(uploadMutation.isLoading || getArFileMutation.isLoading) && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
//         >
//           <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
//         </motion.div>
//       )}
//     </div>
//   );
// }







"use client";
import { useRouter } from "next/navigation";

import { BsLightbulbFill } from "react-icons/bs";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import FurnitureItem from "@/components/common/FurnitureItem";
import useUploadModel from "@/hooks/useUploadModel";
import useGetArFile from "@/hooks/useGetArFile";
export default function FurnitureMenu({
  items = [],
  onAddItem,
  mutate,
  setMenuPosition,
  setSelectedItem,
}) {
  const router = useRouter();
  const [filterText, setFilterText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFile, setSelectedFile] = useState(null);

  const furnitureFileInputRef = useRef(null);
  const uploadMutation = useUploadModel();
  const getArFileMutation = useGetArFile();

  const filteredItems = items
    .filter((item) => item.name.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onUploadClick = () => {
    if (!selectedFile) return;

    uploadMutation.mutate(selectedFile, {
      onSuccess: (data) => {
        getArFileMutation.mutate(data.modelName, {
          onSuccess: (arData) => {
            onAddItem?.(arData.arFile);
            localStorage.setItem("uploadFile", JSON.stringify({ arFile: arData.arFile }));
            setSelectedFile(null);
          },
        });
      },
      onError: () => setSelectedFile(null),
    });
  };

  return (
    <div className="px-2 relative">

      {/* 🔍 Search + Sort */}
      <div className="flex flex-col items-center gap-6 max-w-[400px] mx-auto mb-4">
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



      {/* 📦 Upload Section */}
      <div className="max-h-[77vh] overflow-y-auto bg-white custom-scrollbar p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="max-w-md w-full mx-auto my-6 p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-800 text-center flex justify-center items-center gap-2">
            Upload 3D Model

            {/* 💡 Hint Icon */}
            <div className="relative group">
              <motion.div
                onClick={() => router.push("/how-to-convert")}
                className="cursor-pointer"
                animate={{ color: ["#facc15", "#d97706", "#facc15"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <BsLightbulbFill className="text-2xl sm:text-3xl" />
              </motion.div>

              {/* Tooltip عند الـ Hover */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none whitespace-nowrap z-50">
                How to convert 2D image to 3D
              </div>
            </div>
          </h2>


          <label
            htmlFor="fileUpload"
            className="cursor-pointer border border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition"
          >
            <p className="text-sm text-gray-600">
              Click to select a <code>.glb</code> or <code>.gltf</code> file
            </p>
            <input
              id="fileUpload"
              type="file"
              accept=".glb,.gltf"
              ref={furnitureFileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {selectedFile && (
            <div className="text-center text-sm text-gray-700 truncate" title={selectedFile.name}>
              Selected: <span className="font-medium">{selectedFile.name}</span>
            </div>
          )}

          <Button
            onClick={onUploadClick}
            disabled={!selectedFile || uploadMutation.isLoading}
            className={`w-full py-3 rounded-xl text-sm font-medium transition ${!selectedFile
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
              }`}
          >
            {uploadMutation.isLoading ? "Uploading..." : "Submit"}
          </Button>
        </div>

        {/* 🪑 Furniture Items */}
        <div className="flex flex-col items-center gap-6 p-9">
          {filteredItems.map((item, index) => (
            <FurnitureItem
              key={item._id}
              item={item}
              index={index}
              onClick={() => {
                mutate(item.name, {
                  onSuccess: (data) => {
                    onAddItem?.(data.arFileUrl);
                    setMenuPosition?.({ x: 0, y: 0 });
                    setSelectedItem?.({
                      ...item,
                      arFileUrl: data?.arFileUrl,
                    });
                  },
                });
              }}
            />
          ))}
        </div>
      </div>

      {/* ⏳ Fullscreen Loading */}
      {(uploadMutation.isLoading || getArFileMutation.isLoading) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
        >
          <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}
    </div>
  );
}
