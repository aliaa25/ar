// "use client";
// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import FurnitureItem from "@/components/common/FurnitureItem";
// import useUploadModel from "@/hooks/useUploadModel";
// import useGetArFile from "@/hooks/useGetArFile";

// export default function FurnitureMenu({
//   items = [],
//   onAddItem,
//   mutate,
//   setMenuPosition,
//   setSelectedItem,
// }) {
//   const [filterText, setFilterText] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const furnitureFileInputRef = useRef(null);

//   const uploadMutation = useUploadModel();
//   const getArFileMutation = useGetArFile();

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   const onUploadClick = () => {
//     setSuccessMessage("");
//     setErrorMessage("");

//     if (!selectedFile) {
//       alert("Please select a file first");
//       return;
//     }

//     uploadMutation.mutate(selectedFile, {
//       onSuccess: (data) => {
//         const modelName = data.modelName;

//         getArFileMutation.mutate(modelName, {
//           onSuccess: (arData) => {
//             setSuccessMessage("File uploaded and AR file fetched successfully.");
//             if (onAddItem) onAddItem(arData.arFile);
//             console.log("uploadFile" , arData)
      
//             localStorage.setItem("uploadFile", JSON.stringify({ arFile: arData.arFile }));

//           },
//           onError: () => {
//             setErrorMessage("File uploaded but failed to fetch AR file.");
//           },
//         });
//       },
//       onError: () => {
//         setErrorMessage("Upload failed. Please try again.");
//       },
//     });
//   };

//   const handleItemClick = (item) => {
//     mutate(item.name, {
//       onSuccess: (data) => {
//         if (onAddItem) onAddItem(data.arFileUrl);
//         if (setMenuPosition) setMenuPosition({ x: 0, y: 0 });
//         if (setSelectedItem)
//           setSelectedItem({
//             ...item,
//             arFileUrl: data?.arFileUrl,
//           });
//       },
//     });
//   };

//   const filteredItems = items
//     .filter((item) =>
//       item.name.toLowerCase().includes(filterText.toLowerCase())
//     )
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

//       <div className="max-h-[77vh] overflow-y-auto bg-white custom-scrollbar p-6 sm:p-8 rounded-2xl shadow-xl">
//         {/* زر الرفع */}
//         <div className="my-3 flex justify-center">
//           <motion.div whileHover={{ scale: 1.1 }}>
//             <Button
//               onClick={() => {
//                 if (!selectedFile) {
//                   furnitureFileInputRef.current?.click();
//                 } else {
//                   onUploadClick();
//                 }
//               }}
//               className="bg-mainbackground text-white px-6 sm:px-16 md:px-14 py-3 rounded hover:bg-mainbackground/10 transition text-sm sm:text-base"
//             >
//               {uploadMutation.isLoading ? "Uploading..." : "Upload Furniture"}
//             </Button>
//           </motion.div>

//           <input
//             id="fileUpload"
//             type="file"
//             accept=".glb,.gltf"
//             onChange={handleFileChange}
//             ref={furnitureFileInputRef}
//             style={{ display: "none" }}
//           />
//         </div>

//         {/* عرض رسالة النجاح أو الخطأ */}
//         {successMessage && (
//           <p className="text-green-600 text-center mb-3">{successMessage}</p>
//         )}
//         {errorMessage && (
//           <p className="text-red-600 text-center mb-3">{errorMessage}</p>
//         )}

//         {/* العناصر */}
//         <div className="flex flex-col items-center gap-6 p-9">
//           {filteredItems.map((item, index) => (
//             <FurnitureItem
//               key={item._id}
//               item={item}
//               index={index}
//               onClick={handleItemClick}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
/******* */







"use client";
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
  const [filterText, setFilterText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const furnitureFileInputRef = useRef(null);

  const uploadMutation = useUploadModel();
  const getArFileMutation = useGetArFile();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setSuccessMessage("");
      setErrorMessage("");
    }
  };

  const onUploadClick = () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    setSuccessMessage("");
    setErrorMessage("");

    uploadMutation.mutate(selectedFile, {
      onSuccess: (data) => {
        const modelName = data.modelName;

        getArFileMutation.mutate(modelName, {
          onSuccess: (arData) => {
            setSuccessMessage("File uploaded and AR file fetched successfully.");
            if (onAddItem) onAddItem(arData.arFile);
            localStorage.setItem("uploadFile", JSON.stringify({ arFile: arData.arFile }));

            // إعادة تعيين الحالة بعد نجاح الرفع
            setSelectedFile(null);
          },
          onError: () => {
            setErrorMessage("File uploaded but failed to fetch AR file.");
            setSelectedFile(null);
          },
        });
      },
      onError: () => {
        setErrorMessage("Upload failed. Please try again.");
        setSelectedFile(null);
      },
    });
  };

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

      <div className="max-h-[77vh] overflow-y-auto bg-white custom-scrollbar p-6 sm:p-8 rounded-2xl shadow-xl">
        {/* اختيار الملف + زرار الرفع */}
        <div className="my-3 flex items-center justify-center gap-3">
          {/* زر اختيار الملف */}
          <Button
            onClick={() => furnitureFileInputRef.current?.click()}
            className="bg-mainbackground text-white px-6 py-3 rounded hover:bg-mainbackground/90 transition text-sm sm:text-base"
          >
            Choose File
          </Button>

          {/* input مخفي */}
          <input
            type="file"
            accept=".glb,.gltf"
            ref={furnitureFileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {/* اسم الملف المختار */}
          {selectedFile && (
            <span
              className="text-gray-700 text-sm max-w-xs truncate"
              title={selectedFile.name}
            >
              {selectedFile.name}
            </span>
          )}

          {/* زرار رفع يظهر فقط لو في ملف مختار */}
          {selectedFile && (
            <Button
              onClick={onUploadClick}
              disabled={uploadMutation.isLoading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
            >
              {uploadMutation.isLoading ? "Uploading..." : "Submit"}
            </Button>
          )}
        </div>

        {/* رسائل النجاح والخطأ */}
        {successMessage && (
          <p className="text-green-600 text-center mb-3">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-center mb-3">{errorMessage}</p>
        )}

        {/* عرض عناصر الأثاث */}
        <div className="flex flex-col items-center gap-6 p-9">
          {filteredItems.map((item, index) => (
            <FurnitureItem
              key={item._id}
              item={item}
              index={index}
              onClick={() => {
                mutate(item.name, {
                  onSuccess: (data) => {
                    if (onAddItem) onAddItem(data.arFileUrl);
                    if (setMenuPosition) setMenuPosition({ x: 0, y: 0 });
                    if (setSelectedItem)
                      setSelectedItem({
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
    </div>
  );
}













// // 
// // "use client";"use client";"use client";
// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import FurnitureItem from "@/components/common/FurnitureItem";
// import useUploadModel from "@/hooks/useUploadModel";
// import useGetArFile from "@/hooks/useGetArFile";

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
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const furnitureFileInputRef = useRef(null);

//   const uploadMutation = useUploadModel();
//   const getArFileMutation = useGetArFile();

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   const onUploadClick = () => {
//     setSuccessMessage("");
//     setErrorMessage("");

//     if (!selectedFile) {
//       alert("Please select a file first");
//       return;
//     }

//     uploadMutation.mutate(selectedFile, {
//       onSuccess: (data) => {
//         setSuccessMessage("File uploaded successfully.");

//         const newItem = {
//           name: data.modelName,
//           arFileUrl: data.arFile,
//           local: true, // مهم!
//           _id: crypto.randomUUID(),
//         };

//         if (onAddItem) onAddItem(newItem);
//         setSelectedFile(null);
//       },
//       onError: () => {
//         setErrorMessage("Upload failed. Please try again.");
//       },
//     });
//   };

//   const handleItemClick = (item) => {
//     const modelName =
//       typeof item.name === "string"
//         ? item.name
//         : item?.name?.name || "";

//     if (!modelName) {
//       console.warn("Invalid model name", item);
//       return;
//     }

//     if (item.local && item.arFileUrl) {
//       // ✅ لو مرفوع دلوقتي ومعاه arFileUrl استخدميه مباشرة
//       if (onAddItem) onAddItem(item.arFileUrl);
//       if (setMenuPosition) setMenuPosition({ x: 0, y: 0 });
//       if (setSelectedItem) setSelectedItem(item);
//       return;
//     }

//     // 🟡 لو من الداتا بيز: استدعاء POST من mutate
//     if (mutate) {
//       mutate(modelName, {
//         onSuccess: (data) => {
//           if (onAddItem) onAddItem(data.arFileUrl);
//           if (setMenuPosition) setMenuPosition({ x: 0, y: 0 });
//           if (setSelectedItem)
//             setSelectedItem({
//               ...item,
//               arFileUrl: data.arFileUrl,
//             });
//         },
//         onError: () => {
//           alert("AR file not found for this model.");
//         },
//       });
//     }
//   };

//   const filteredItems = items
//     .filter((item) =>
//       item.name.toLowerCase().includes(filterText.toLowerCase())
//     )
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

//       <div className="max-h-[77vh] overflow-y-auto bg-white custom-scrollbar p-6 sm:p-8 rounded-2xl shadow-xl">
//         {/* Upload button */}
//         <div className="my-3 flex justify-center">
//           <motion.div whileHover={{ scale: 1.1 }}>
//             <Button
//               onClick={() => {
//                 if (!selectedFile) {
//                   furnitureFileInputRef.current?.click();
//                 } else {
//                   onUploadClick();
//                 }
//               }}
//               className="bg-mainbackground text-white px-6 sm:px-16 md:px-14 py-3 rounded hover:bg-mainbackground/10 transition text-sm sm:text-base"
//             >
//               {uploadMutation.isLoading ? "Uploading..." : "Upload Furniture"}
//             </Button>
//           </motion.div>

//           <input
//             id="fileUpload"
//             type="file"
//             accept=".glb,.gltf"
//             onChange={handleFileChange}
//             ref={furnitureFileInputRef}
//             style={{ display: "none" }}
//           />
//         </div>

//         {/* Messages */}
//         {successMessage && (
//           <p className="text-green-600 text-center mb-3">{successMessage}</p>
//         )}
//         {errorMessage && (
//           <p className="text-red-600 text-center mb-3">{errorMessage}</p>
//         )}

//         {/* Items */}
//         <div className="flex flex-col items-center gap-6 p-9">
//           {filteredItems.map((item, index) => (
//             <FurnitureItem
//               key={item._id}
//               item={item}
//               index={index}
//               onClick={handleItemClick}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
