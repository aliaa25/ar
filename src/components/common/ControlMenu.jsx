"use client";

import { useRef, useEffect, useState } from "react";
import {
  Trash2, Copy, Maximize2, Minimize2, RotateCcw, RotateCw,
  QrCode, X, Menu, Ruler
} from "lucide-react";
import { FaTimes } from "react-icons/fa"; 
export default function ControlMenu({
  onRotate,
  onScale,
  onDuplicate,
  onDelete,
  handleShowDimensions,
  selectedModelId,
  dimContainerPos,
  showDimensionPopup,
  dimensionsText,
 mutateGetArFile,
  selectedItem,

  setShowMenu
}) {
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [qrCodeData, setQRCodeData] = useState(null);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const onClose = () => {
    setShowMenu?.(false);
    setIsMenuExpanded(false);
  };

  if (!selectedModelId) return null;

  // const handleARView = () => {
  //   if (!selectedItem) {
  //     alert(`Selected item not found.\nID: ${selectedModelId}`);
  //     return;
  //   }
  //   setIsGeneratingQR(true);

  //   mutate(selectedItem?.name, {
  //     onSuccess: (data) => {
  //       const baseUrl = window.location.origin;
  //       const arViewerUrl = `${baseUrl}/ar-viewer?model=${encodeURIComponent(data.arFileUrl)}&name=${encodeURIComponent(selectedItem.name)}`;
  //       setQRCodeData({
  //         modelName: selectedItem.name,
  //         qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(arViewerUrl)}&size=250x250`,
  //         arFileUrl: data.arFileUrl,
  //         arViewerUrl
  //       });
  //       setShowQRPopup(true);
  //       setIsGeneratingQR(false);
  //     },
  //     onError: (error) => {
  //       console.error("Error generating QR code:", error);
  //       setIsGeneratingQR(false);
  //     }
  //   });
  // };

const handleARView = () => {
  setIsGeneratingQR(true);

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
        const arViewerUrl = `${window.location.origin}/ar-viewer?model=${encodeURIComponent(arFileUrl)}&name=${encodeURIComponent(modelName)}`;

        setQRCodeData({
          modelName,
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(arViewerUrl)}&size=250x250`,
          arFileUrl,
          arViewerUrl
        });

        setShowQRPopup(true);
        setIsGeneratingQR(false);
        return;
      } else {
        alert("No arFile found in localStorage.");
      }
    } catch (err) {
      console.error("Invalid uploadFile format in localStorage:", err);
      alert("Invalid upload file in storage.");
    }

    setIsGeneratingQR(false);
    return;
  }

  // 2. العادي لو في selectedItem
  if (!selectedItem) {
    alert(`Selected item not found.\nID: ${selectedModelId}`);
    setIsGeneratingQR(false);
    return;
  }

  const modelName = selectedItem.name;
  const baseUrl = window.location.origin;

  const handleSuccess = (arFileUrl) => {
    const arViewerUrl = `${baseUrl}/ar-viewer?model=${encodeURIComponent(arFileUrl)}&name=${encodeURIComponent(modelName)}`;
    setQRCodeData({
      modelName,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(arViewerUrl)}&size=250x250`,
      arFileUrl,
      arViewerUrl
    });
    setShowQRPopup(true);
    setIsGeneratingQR(false);
  };

  if (selectedItem.arFileUrl) {
    handleSuccess(selectedItem.arFileUrl);
  } else {
    mutateGetArFile(modelName, {
      onSuccess: (data) => handleSuccess(data.arFile),
      onError: (err) => {
        console.error("Error fetching AR file:", err);
        alert("Failed to load AR file.");
        setIsGeneratingQR(false);
      }
    });
  }
};




  const closeQRPopup = () => {
    setShowQRPopup(false);
    setQRCodeData(null);
  };

  const handleCopyLink = () => {
    if (qrCodeData?.arViewerUrl) {
      navigator.clipboard.writeText(qrCodeData.arViewerUrl)
        .then(() => alert("AR Viewer link copied to clipboard! 📱"))
        .catch(() => alert("Failed to copy link."));
    }
  };

  const handleOpenInBrowser = () => {
    if (qrCodeData?.arViewerUrl) {
      window.open(qrCodeData.arViewerUrl, '_blank');
    }
  };

  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeQRPopup();
        if (!showQRPopup) onClose();
      }
    };
    document.addEventListener('keydown', escHandler);
    return () => document.removeEventListener('keydown', escHandler);
  }, [showQRPopup]);

  return (
    <>
      {/* Toggle Floating Button */}
      <div
  className="fixed top-1/2 transform -translate-y-1/2 z-50"
  style={{ left: "25%",top: "30%" }}
>
        <button
          onClick={() => setIsMenuExpanded(!isMenuExpanded)}
          className={`bg-gradient-to-br from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 ${
            isMenuExpanded ? 'rotate-90' : 'rotate-0'
          }`}
          style={{
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4), 0 0 20px rgba(147, 51, 234, 0.3)'
          }}
        >
          <Menu size={18} />
        </button>

        {/* Expanded Floating Menu */}
       <div
  className={`absolute left-0 top-16 bg-white/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-4 min-w-[280px] transition-all duration-500 transform origin-top-left ${
    isMenuExpanded 
      ? 'opacity-100 scale-100 translate-y-0' 
      : 'opacity-0 scale-75 -translate-y-4 pointer-events-none'
  }`}
>

          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200/50">
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Controls
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
            >
              <X size={16} />
            </button>
          </div>

          {/* Grid of Actions */}
          <div className="grid grid-cols-2 gap-3">
            <MobileIconBtn icon={<Trash2 />} label="Delete" onClick={() => onDelete("delete")} color="red" />
            <MobileIconBtn icon={<Copy />} label="Copy" onClick={() => onDuplicate("duplicate")} color="blue" />
            <MobileIconBtn icon={<Maximize2 />} label="Enlarge" onClick={() => onScale("increase")} color="green" />
            <MobileIconBtn icon={<Minimize2 />} label="Shrink" onClick={() => onScale("decrease")} color="orange" />
            <MobileIconBtn icon={<RotateCcw />} label="Rotate L" onClick={() => onRotate("left")} color="indigo" />
            <MobileIconBtn icon={<RotateCw />} label="Rotate R" onClick={() => onRotate("right")} color="indigo" />
            <MobileIconBtn icon={<Ruler />} label="Dimensions" onClick={() => handleShowDimensions(selectedModelId)} color="teal" />
            <button
              className={`flex flex-col items-center justify-center rounded-xl p-3 transition-all duration-300 transform hover:scale-105 ${
                isGeneratingQR || !selectedModelId
                  ? 'opacity-50 cursor-not-allowed bg-gray-100'
                  : 'bg-pink-50 text-pink-600 hover:bg-pink-100 hover:shadow-lg'
              }`}
              onClick={handleARView}
              disabled={isGeneratingQR || !selectedModelId}
              title="AR View"
            >
              {isGeneratingQR ? (
                <div className="text-lg animate-spin">⏳</div>
              ) : (
                <QrCode className="text-lg mb-1" />
              )}
              <span className="text-xs font-medium">
                {isGeneratingQR ? "Creating..." : "AR View"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Dimensions Popup */}
      {showDimensionPopup && dimContainerPos && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60"
          style={{
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            padding: "16px 20px",
            borderRadius: "16px",
            boxShadow: "0px 15px 35px rgba(0,0,0,0.2)",
            textAlign: "center",
            minWidth: "200px",
            border: "1px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div style={mobilePopupLineStyle}>{dimensionsText.width}</div>
          <div style={mobilePopupLineStyle}>{dimensionsText.height}</div>
          <div>{dimensionsText.depth}</div>
        </div>
      )}

      {/* QR Code Popup */}
      {showQRPopup && qrCodeData && (
        <QRPopup 
          qrCodeData={qrCodeData}
          closeQRPopup={closeQRPopup}
          handleCopyLink={handleCopyLink}
          handleOpenInBrowser={handleOpenInBrowser}
        />
      )}
    </>
  );
}

// Mobile Button UI
function MobileIconBtn({ icon, label, onClick, color = "gray" }) {
  const colorClasses = {
    red: 'bg-red-50 text-red-600 hover:bg-red-100',
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    green: 'bg-green-50 text-green-600 hover:bg-green-100',
    orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
    indigo: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
    teal: 'bg-teal-50 text-teal-600 hover:bg-teal-100',
    pink: 'bg-pink-50 text-pink-600 hover:bg-pink-100',
    gray: 'bg-gray-50 text-gray-600 hover:bg-gray-100'
  };

  return (
    <button
      className={`flex flex-col items-center justify-center rounded-xl p-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${colorClasses[color]}`}
      onClick={onClick}
      title={label}
    >
      <div className="text-lg mb-1">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

// QR Code Popup
function QRPopup({ qrCodeData, closeQRPopup, handleCopyLink, handleOpenInBrowser }) {
  return (
    <div
       className="fixed inset-0 flex justify-center items-center z-50"
      onClick={closeQRPopup}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative flex flex-col items-center animate-pulse-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeQRPopup}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors duration-300 focus:outline-none"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">AR Viewer</h2>
        <div className="text-lg font-semibold text-gray-700 mb-6 text-center">
          {qrCodeData.modelName || "3D Model"}
        </div>

        <div className="relative mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 blur-lg opacity-30 rounded-lg"></div>
          <div className="relative border-3 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-1">
            <div className="bg-white rounded-md p-2">
              <img src={qrCodeData.qrCodeUrl} alt="AR QR Code" className="w-40 h-40 object-contain" />
            </div>
          </div>
        </div>

        <div className="text-center text-gray-700 text-sm mb-6 px-2 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="font-semibold mb-2">📱 For Mobile Use:</p>
          <p>Scan the code with your phone camera to open the AR page</p>
          <p className="text-xs mt-2 text-purple-600">✨ Requires WebXR-compatible browser (Chrome, Edge)</p>
        </div>

        <div className="flex flex-col gap-3 mb-10 px-2 w-full">
          <button
            onClick={handleOpenInBrowser}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-6 py-3 font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 focus:outline-none shadow-lg transform hover:scale-105"
          >
            🚀 Open AR Viewer Now
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleCopyLink}
              className="flex-1 bg-blue-600 text-white rounded-full px-4 py-2 font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none shadow-md"
            >
              📋 Copy Link
            </button>
            <button
              onClick={closeQRPopup}
              className="flex-1 bg-gray-300 text-gray-800 rounded-full px-4 py-2 font-semibold hover:bg-gray-400 transition-colors duration-300 focus:outline-none shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mobilePopupLineStyle = {
  borderBottom: "2px solid #e2e8f0",
  paddingBottom: "10px",
  marginBottom: "12px",
  fontSize: "0.875rem",
  fontWeight: "600",
  color: "#475569",
  textAlign: "center"
};
