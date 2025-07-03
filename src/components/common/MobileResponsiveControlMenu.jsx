// import React, { useState, useEffect } from 'react';
// import { 
//   RotateCcw, 
//   RotateCw, 
//   ZoomIn, 
//   ZoomOut, 
//   Copy, 
//   Trash2, 
//   Ruler, 
//   QrCode,
//   X,
//   Settings,
//   Wrench,
//   ArrowUp,
//   ArrowDown,
//   ArrowLeft,
//   ArrowRight,
//   Menu
// } from 'lucide-react';
// import usePostArFile from "@/hooks/usePostArFile";
// const MobileResponsiveControlMenu = ({
//   dimensionsText = { width: "Width: 100cm", height: "Height: 50cm", depth: "Depth: 30cm" },
//   dimContainerPos,
//   showDimensionPopup = false,
//   onRotate = (direction) => console.log('Rotate:', direction),
//   onScale = (type) => console.log('Scale:', type),
//   onDuplicate = () => console.log('Duplicate'),
//   onDelete = () => console.log('Delete'),
//   onMove = (direction) => console.log('Move:', direction),
//   handleShowDimensions = () => console.log('Show dimensions'),
//   selectedModelId = "demo-model",
//   selectedItem = { name: "Demo Item" },
//   setMenuPosition = () => {},
//   setQrCodeData = () => {},
//   setShowQRPopup = () => {},
//   setShowMenu = () => {}
// }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // hook to call API for fetching AR file
//   const { mutate: getArFile, isLoading: isLoadingAR } = usePostArFile();

//   useEffect(() => {
//     const checkIsMobile = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//     };

//     checkIsMobile();
//     window.addEventListener('resize', checkIsMobile);

//     return () => window.removeEventListener('resize', checkIsMobile);
//   }, []);

//   const handleViewInAR = () => {
//     if (!selectedItem) {
//       alert("Please select an item first.");
//       return;
//     }

//     getArFile(selectedItem.name, {
//       onSuccess: (data) => {
//         const baseUrl = window.location.origin;
//         const arViewerUrl = `${baseUrl}/ar-viewer?model=${encodeURIComponent(data.arFileUrl)}&name=${encodeURIComponent(selectedItem.name)}`;

//         window.open(arViewerUrl, '_blank');
//       },
//       onError: (error) => {
//         console.error("Failed to load AR model:", error);
//         alert("Something went wrong while opening AR viewer.");
//       }
//     });
//   };

//   const handleClose = () => {
//     setShowMenu(false);
//     setMenuPosition(null);
//     setIsMenuOpen(false);
//   };

//   const toggleMobileMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   if (!selectedModelId) return null;

//   const buttonClass = `
//     w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg font-medium 
//     transition-all duration-200 hover:bg-gray-50 border border-gray-200
//     text-sm text-gray-700 shadow-sm
//   `;

//   const primaryButtonClass = `
//     w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg font-medium 
//     transition-all duration-200 hover:bg-opacity-90 
//     text-sm bg-blue-600 text-white shadow-sm
//   `;

//   const dangerButtonClass = `
//     w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg font-medium 
//     transition-all duration-200 hover:bg-red-600 
//     text-sm bg-red-500 text-white shadow-sm
//   `;

//   return (
//     <>
//       {/* Mobile Menu */}
//       {isMobile && (
//         <>
//           {/* Mobile Menu Toggle Button */}
//           <div className="fixed left-3 top-1/2 transform -translate-y-1/2 z-50">
//             <button
//               onClick={toggleMobileMenu}
//               className="bg-white shadow-lg border border-gray-200 p-2 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
//               aria-label="Toggle Menu"
//             >
//               <Menu size={20} className="text-gray-700" />
//             </button>
//           </div>

//           {/* Sliding Menu */}
//           <div className={`
//             fixed left-0 top-1/2 transform -translate-y-1/2 z-50
//             bg-white/20 bg-opacity-90 backdrop-blur-md rounded-r-2xl shadow-2xl border border-gray-200 border-opacity-30
//             transition-all duration-300 ease-out
//             ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
//           `}>
//             {/* Menu Header */}
//             <div className="flex items-center justify-between p-3 border-b border-gray-100 border-opacity-30 bg-gradient-to-r from-blue-50 from-opacity-40 to-purple-50 to-opacity-40 rounded-tr-2xl">
//               <h3 className="text-xs font-semibold text-gray-800">Tools</h3>
//               <button
//                 onClick={handleClose}
//                 className="p-1 hover:bg-white rounded-full transition-colors"
//                 aria-label="Close Menu"
//               >
//                 <X size={14} className="text-gray-500" />
//               </button>
//             </div>

//             {/* Menu Content */}
//             <div className="p-2 space-y-1 min-w-[140px]">
//               {/* Quick Actions Row */}
//               <div className="grid grid-cols-2 gap-1 mb-2">
//                 <button 
//                   onClick={() => onRotate('left')}
//                   className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
//                   aria-label="Rotate Left"
//                 >
//                   <RotateCcw size={16} className="text-gray-600 mb-1" />
//                   <span className="text-xs text-gray-600">Rotate L</span>
//                 </button>
//                 <button 
//                   onClick={() => onRotate('right')}
//                   className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
//                   aria-label="Rotate Right"
//                 >
//                   <RotateCw size={16} className="text-gray-600 mb-1" />
//                   <span className="text-xs text-gray-600">Rotate R</span>
//                 </button>
//               </div>

//               {/* Scale Controls */}
//               <div className="grid grid-cols-2 gap-1 mb-2">
//                 <button 
//                   onClick={() => onScale('increase')}
//                   className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
//                   aria-label="Zoom In"
//                 >
//                   <ZoomIn size={16} className="text-gray-600 mb-1" />
//                   <span className="text-xs text-gray-600">Zoom +</span>
//                 </button>
//                 <button 
//                   onClick={() => onScale('decrease')}
//                   className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
//                   aria-label="Zoom Out"
//                 >
//                   <ZoomOut size={16} className="text-gray-600 mb-1" />
//                   <span className="text-xs text-gray-600">Zoom -</span>
//                 </button>
//               </div>

//               {/* Movement Controls */}
//               <div className="grid grid-cols-3 gap-1 mb-2">
//                 <div></div>
//                 <button 
//                   onClick={() => onMove('forward')}
//                   className="flex justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
//                   aria-label="Move Up"
//                 >
//                   <ArrowUp size={14} className="text-gray-600" />
//                 </button>
//                 <div></div>
//                 <button 
//                   onClick={() => onMove('left')}
//                   className="flex justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
//                   aria-label="Move Left"
//                 >
//                   <ArrowLeft size={14} className="text-gray-600" />
//                 </button>
//                 <button 
//                   onClick={() => onMove('backward')}
//                   className="flex justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
//                   aria-label="Move Down"
//                 >
//                   <ArrowDown size={14} className="text-gray-600" />
//                 </button>
//                 <button 
//                   onClick={() => onMove('right')}
//                   className="flex justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
//                   aria-label="Move Right"
//                 >
//                   <ArrowRight size={14} className="text-gray-600" />
//                 </button>
//               </div>

//               {/* Divider */}
//               <div className="border-t border-gray-100 my-2"></div>

//               {/* Primary Actions */}
//               <button 
//                 onClick={() => handleShowDimensions()}
//                 className="w-full flex items-center gap-2 p-2 rounded-lg bg-blue-500 bg-opacity-80 text-white hover:bg-blue-600 hover:bg-opacity-90 transition-colors"
//               >
//                 <Ruler size={14} />
//                 <span className="text-xs font-medium">Dimensions</span>
//               </button>

//               <button 
//                 onClick={() => handleViewInAR()}
//                 className="w-full flex items-center gap-2 p-2 rounded-lg bg-purple-500 bg-opacity-80 text-white hover:bg-purple-600 hover:bg-opacity-90 transition-colors"
//                 disabled={isLoadingAR}
//               >
//                 <QrCode size={14} />
//                 <span className="text-xs font-medium">View AR</span>
//               </button>

//               <button 
//                 onClick={() => onDuplicate()}
//                 className="w-full flex items-center gap-2 p-2 rounded-lg bg-green-500 bg-opacity-80 text-white hover:bg-green-600 hover:bg-opacity-90 transition-colors"
//               >
//                 <Copy size={14} />
//                 <span className="text-xs font-medium">Duplicate</span>
//               </button>

//               <button 
//                 onClick={() => onDelete()}
//                 className="w-full flex items-center gap-2 p-2 rounded-lg bg-red-500 bg-opacity-80 text-white hover:bg-red-600 hover:bg-opacity-90 transition-colors"
//               >
//                 <Trash2 size={14} />
//                 <span className="text-xs font-medium">Delete</span>
//               </button>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Dimensions Popup */}
//       {showDimensionPopup && dimContainerPos && (
//         <div
//           className={`absolute bg-white border border-gray-300 rounded-lg p-3 shadow-lg z-50 ${
//             isMobile ? 'text-xs max-w-[200px]' : 'text-sm min-w-[150px]'
//           }`}
//           style={{
//             left: isMobile ? Math.min(dimContainerPos.left, window.innerWidth - 220) : dimContainerPos.left,
//             top: dimContainerPos.top,
//             transform: 'translateX(-50%)',
//           }}
//         >
//           <div className="space-y-1">
//             <div className="text-gray-700">{dimensionsText.width}</div>
//             <div className="text-gray-700">{dimensionsText.height}</div>
//             <div className="text-gray-700">{dimensionsText.depth}</div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes slideInLeft {
//           from {
//             transform: translateX(-100%) translateY(-50%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0) translateY(-50%);
//             opacity: 1;
//           }
//         }
        
//         @keyframes slideOutLeft {
//           from {
//             transform: translateX(0) translateY(-50%);
//             opacity: 1;
//           }
//           to {
//             transform: translateX(-100%) translateY(-50%);
//             opacity: 0;
//           }
//         }

//         /* Smooth transitions */
//         .transition-transform {
//           transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         /* Enhanced hover effects */
//         button:hover {
//           transform: translateY(-1px);
//         }

//         button:active {
//           transform: translateY(0);
//         }

//         /* Touch optimization */
//         @media (max-width: 768px) {
//           button {
//             min-height: 40px;
//             touch-action: manipulation;
//           }
//         }

//         /* Enhanced backdrop blur */
//         .backdrop-blur-md {
//           backdrop-filter: blur(8px);
//         }

//         /* Glass effect */
//         .bg-opacity-90 {
//           background-color: rgba(255, 255, 255, 0.9);
//         }

//         /* Backdrop blur effect */
//         .backdrop-blur {
//           backdrop-filter: blur(4px);
//         }
//       `}</style>
//     </>
//   );
// };

// export default MobileResponsiveControlMenu;


import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Copy, 
  Trash2, 
  Ruler, 
  QrCode,
  X,
  Settings,
  Wrench,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Menu
} from 'lucide-react';
import usePostArFile from "@/hooks/usePostArFile";

const MobileResponsiveControlMenu = ({
  dimensionsText = { width: "Width: 100cm", height: "Height: 50cm", depth: "Depth: 30cm" },
  dimContainerPos,
  showDimensionPopup = false,
  onRotate = (direction) => console.log('Rotate:', direction),
  onScale = (type) => console.log('Scale:', type),
  onDuplicate = () => console.log('Duplicate'),
  onDelete = () => console.log('Delete'),
  onMove = (direction) => console.log('Move:', direction),
  handleShowDimensions = () => console.log('Show dimensions'),
  selectedModelId = "demo-model",
  selectedItem = { name: "Demo Item" },
  setMenuPosition = () => {},
  setQrCodeData = () => {},
  setShowQRPopup = () => {},
  setShowMenu = () => {},
  mutateGetArFile // إضافة هذا المتغير للاستخدام في اللوجيك الجديد
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGeneratingAR, setIsGeneratingAR] = useState(false);

  // hook to call API for fetching AR file
  const { mutate: getArFile, isLoading: isLoadingAR } = usePostArFile();

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleViewInAR = () => {
    setIsGeneratingAR(true);

    // 1. fallback only إذا مفيش selectedItem
    const storedUpload = localStorage.getItem("uploadFile");

    if (!selectedItem && storedUpload) {
      try {
        let arFileUrl;

        if (storedUpload.startsWith("{")) {
          const parsed = JSON.parse(storedUpload);
          arFileUrl = parsed?.arFile;
        } else {
          arFileUrl = storedUpload;
        }

        if (arFileUrl) {
          const modelName = arFileUrl.split("/").pop()?.split(".")[0] || "UploadedModel";
          const baseUrl = window.location.origin;
          const arViewerUrl = `${baseUrl}/ar-viewer?model=${encodeURIComponent(arFileUrl)}&name=${encodeURIComponent(modelName)}`;

          // فتح الصفحة مباشرة بدل QR code
          window.open(arViewerUrl, '_blank');
          setIsGeneratingAR(false);
          return;
        } else {
          alert("No arFile found in localStorage.");
        }
      } catch (err) {
        console.error("Invalid uploadFile format in localStorage:", err);
        alert("Invalid upload file in storage.");
      }

      setIsGeneratingAR(false);
      return;
    }

    // 2. العادي لو في selectedItem
    if (!selectedItem) {
      alert(`Selected item not found.\nID: ${selectedModelId}`);
      setIsGeneratingAR(false);
      return;
    }

    const modelName = selectedItem.name;
    const baseUrl = window.location.origin;

    const handleSuccess = (arFileUrl) => {
      const arViewerUrl = `${baseUrl}/ar-viewer?model=${encodeURIComponent(arFileUrl)}&name=${encodeURIComponent(modelName)}`;
      
      // فتح الصفحة مباشرة بدل QR code
      window.open(arViewerUrl, '_blank');
      setIsGeneratingAR(false);
    };

    if (selectedItem.arFileUrl) {
      handleSuccess(selectedItem.arFileUrl);
    } else {
      // استخدام mutateGetArFile إذا كان متاح، وإلا استخدام getArFile
      const mutateFunction = mutateGetArFile || getArFile;
      
      mutateFunction(modelName, {
        onSuccess: (data) => {
          const arFileUrl = data.arFile || data.arFileUrl;
          handleSuccess(arFileUrl);
        },
        onError: (err) => {
          console.error("Error fetching AR file:", err);
          alert("Failed to load AR file.");
          setIsGeneratingAR(false);
        }
      });
    }
  };

  const handleClose = () => {
    setShowMenu(false);
    setMenuPosition(null);
    setIsMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!selectedModelId) return null;

  const buttonClass = `
    w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg font-medium 
    transition-all duration-200 hover:bg-gray-50 border border-gray-200
    text-sm text-gray-700 shadow-sm
  `;

  const primaryButtonClass = `
    w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg font-medium 
    transition-all duration-200 hover:bg-opacity-90 
    text-sm bg-blue-600 text-white shadow-sm
  `;

  const dangerButtonClass = `
    w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg font-medium 
    transition-all duration-200 hover:bg-red-600 
    text-sm bg-red-500 text-white shadow-sm
  `;

  return (
    <>
      {/* Mobile Menu */}
      {isMobile && (
        <>
          {/* Mobile Menu Toggle Button */}
          <div className="fixed left-3 top-1/2 transform -translate-y-1/2 z-50">
            <button
              onClick={toggleMobileMenu}
              className="bg-white shadow-lg border border-gray-200 p-2 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
              aria-label="Toggle Menu"
            >
              <Menu size={20} className="text-gray-700" />
            </button>
          </div>

          {/* Sliding Menu */}
          <div className={`
            fixed left-0 top-1/2 transform -translate-y-1/2 z-50
            bg-white/20 bg-opacity-90 backdrop-blur-md rounded-r-2xl shadow-2xl border border-gray-200 border-opacity-30
            transition-all duration-300 ease-out
            ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          `}>
            {/* Menu Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-100 border-opacity-30 bg-gradient-to-r from-blue-50 from-opacity-40 to-purple-50 to-opacity-40 rounded-tr-2xl">
              <h3 className="text-xs font-semibold text-gray-800">Tools</h3>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-white rounded-full transition-colors"
                aria-label="Close Menu"
              >
                <X size={14} className="text-gray-500" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="p-2 space-y-1 min-w-[140px]">
              {/* Quick Actions Row */}
              <div className="grid grid-cols-2 gap-1 mb-2">
                <button 
                  onClick={() => onRotate('left')}
                  className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
                  aria-label="Rotate Left"
                >
                  <RotateCcw size={16} className="text-gray-600 mb-1" />
                  <span className="text-xs text-gray-600">Rotate L</span>
                </button>
                <button 
                  onClick={() => onRotate('right')}
                  className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
                  aria-label="Rotate Right"
                >
                  <RotateCw size={16} className="text-gray-600 mb-1" />
                  <span className="text-xs text-gray-600">Rotate R</span>
                </button>
              </div>

              {/* Scale Controls */}
              <div className="grid grid-cols-2 gap-1 mb-2">
                <button 
                  onClick={() => onScale('increase')}
                  className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
                  aria-label="Zoom In"
                >
                  <ZoomIn size={16} className="text-gray-600 mb-1" />
                  <span className="text-xs text-gray-600">Zoom +</span>
                </button>
                <button 
                  onClick={() => onScale('decrease')}
                  className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
                  aria-label="Zoom Out"
                >
                  <ZoomOut size={16} className="text-gray-600 mb-1" />
                  <span className="text-xs text-gray-600">Zoom -</span>
                </button>
              </div>

              {/* Movement Controls */}
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div></div>
                <button 
                  onClick={() => onMove('forward')}
                  className="flex justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
                  aria-label="Move Up"
                >
                  <ArrowUp size={14} className="text-gray-600" />
                </button>
                <div></div>
                <button 
                  onClick={() => onMove('left')}
                  className="flex justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
                  aria-label="Move Left"
                >
                  <ArrowLeft size={14} className="text-gray-600" />
                </button>
                <button 
                  onClick={() => onMove('backward')}
                  className="flex justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
                  aria-label="Move Down"
                >
                  <ArrowDown size={14} className="text-gray-600" />
                </button>
                <button 
                  onClick={() => onMove('right')}
                  className="flex justify-center p-2 rounded-lg hover:bg-white hover:bg-opacity-40 transition-colors"
                  aria-label="Move Right"
                >
                  <ArrowRight size={14} className="text-gray-600" />
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-2"></div>

              {/* Primary Actions */}
              <button 
                onClick={() => handleShowDimensions()}
                className="w-full flex items-center gap-2 p-2 rounded-lg bg-blue-500 bg-opacity-80 text-white hover:bg-blue-600 hover:bg-opacity-90 transition-colors"
              >
                <Ruler size={14} />
                <span className="text-xs font-medium">Dimensions</span>
              </button>

              <button 
                onClick={() => handleViewInAR()}
                className={`w-full flex items-center gap-2 p-2 rounded-lg transition-colors ${
                  isGeneratingAR || isLoadingAR 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-purple-500 bg-opacity-80 text-white hover:bg-purple-600 hover:bg-opacity-90'
                }`}
                disabled={isGeneratingAR || isLoadingAR}
              >
                <QrCode size={14} />
                <span className="text-xs font-medium">
                  {isGeneratingAR || isLoadingAR ? 'Loading...' : 'View AR'}
                </span>
              </button>

              <button 
                onClick={() => onDuplicate()}
                className="w-full flex items-center gap-2 p-2 rounded-lg bg-green-500 bg-opacity-80 text-white hover:bg-green-600 hover:bg-opacity-90 transition-colors"
              >
                <Copy size={14} />
                <span className="text-xs font-medium">Duplicate</span>
              </button>

              <button 
                onClick={() => onDelete()}
                className="w-full flex items-center gap-2 p-2 rounded-lg bg-red-500 bg-opacity-80 text-white hover:bg-red-600 hover:bg-opacity-90 transition-colors"
              >
                <Trash2 size={14} />
                <span className="text-xs font-medium">Delete</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Dimensions Popup */}
      {showDimensionPopup && dimContainerPos && (
        <div
          className={`absolute bg-white border border-gray-300 rounded-lg p-3 shadow-lg z-50 ${
            isMobile ? 'text-xs max-w-[200px]' : 'text-sm min-w-[150px]'
          }`}
          style={{
            left: isMobile ? Math.min(dimContainerPos.left, window.innerWidth - 220) : dimContainerPos.left,
            top: dimContainerPos.top,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="space-y-1">
            <div className="text-gray-700">{dimensionsText.width}</div>
            <div className="text-gray-700">{dimensionsText.height}</div>
            <div className="text-gray-700">{dimensionsText.depth}</div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%) translateY(-50%);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(-50%);
            opacity: 1;
          }
        }
        
        @keyframes slideOutLeft {
          from {
            transform: translateX(0) translateY(-50%);
            opacity: 1;
          }
          to {
            transform: translateX(-100%) translateY(-50%);
            opacity: 0;
          }
        }

        /* Smooth transitions */
        .transition-transform {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced hover effects */
        button:hover {
          transform: translateY(-1px);
        }

        button:active {
          transform: translateY(0);
        }

        /* Touch optimization */
        @media (max-width: 768px) {
          button {
            min-height: 40px;
            touch-action: manipulation;
          }
        }

        /* Enhanced backdrop blur */
        .backdrop-blur-md {
          backdrop-filter: blur(8px);
        }

        /* Glass effect */
        .bg-opacity-90 {
          background-color: rgba(255, 255, 255, 0.9);
        }

        /* Backdrop blur effect */
        .backdrop-blur {
          backdrop-filter: blur(4px);
        }
      `}</style>
    </>
  );
};

export default MobileResponsiveControlMenu;


