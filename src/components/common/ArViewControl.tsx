"use client";

import { useState, useEffect, useCallback } from "react";
import { QrCode } from "lucide-react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";

interface ArViewControlProps {
  selectedItem: { name: string } | null;
  mutate: (
    modelName: string,
    options: {
      onSuccess: (data: { arFile: string }) => void;
      onError: (error: Error) => void;
    }
  ) => void;
  setShowMenu?: (show: boolean) => void;
}

export default function ArViewControl({
  selectedItem,
  mutate,
  setShowMenu,
}: ArViewControlProps) {
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [qrCodeData, setQRCodeData] = useState<{
    modelName: string;
    qrCodeUrl: string;
    arFileUrl: string;
    arViewerUrl: string;
  } | null>(null);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  const closeQRPopup = useCallback(() => {
    setShowQRPopup(false);
    setQRCodeData(null);
    setShowMenu?.(false);
  }, [setShowMenu]);

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeQRPopup();
      }
    };
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [closeQRPopup]);

  if (!selectedItem) return null;

  const handleARView = () => {
    setIsGeneratingQR(true);

    mutate(selectedItem.name, {
      onSuccess: (data) => {
        const baseUrl = window.location.origin;
        const arViewerUrl = `${baseUrl}/ar-viewer?model=${encodeURIComponent(
          data.arFile
        )}&name=${encodeURIComponent(selectedItem.name)}`;
        setQRCodeData({
          modelName: selectedItem.name,
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
            arViewerUrl
          )}&size=250x250`,
          arFileUrl: data.arFile,
          arViewerUrl,
        });
        setShowQRPopup(true);
        setIsGeneratingQR(false);
      },
      onError: (error) => {
        console.error("Error generating QR code:", error);
        setIsGeneratingQR(false);
      },
    });
  };

  const handleCopyLink = () => {
    if (qrCodeData?.arViewerUrl) {
      navigator.clipboard
        .writeText(qrCodeData.arViewerUrl)
        .then(() => alert("AR Viewer link copied to clipboard! 📱"))
        .catch(() => alert("Failed to copy link."));
    }
  };

  const handleOpenInBrowser = () => {
    if (qrCodeData?.arViewerUrl) {
      window.open(qrCodeData.arViewerUrl, "_blank");
    }
  };

  return (
    <>
      <button
        onClick={handleARView}
        disabled={isGeneratingQR}
        title="AR View"
        className={`flex flex-col items-center justify-center rounded-xl p-3 transition-all duration-300 transform hover:scale-105 ${
          isGeneratingQR
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "bg-pink-50 text-pink-600 hover:bg-pink-100 hover:shadow-lg"
        }`}
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

      {showQRPopup && qrCodeData && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50"
          onClick={closeQRPopup}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeQRPopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors duration-300 focus:outline-none"
              aria-label="Close QR popup"
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
                  <Image
                    src={qrCodeData.qrCodeUrl}
                    alt="AR QR Code"
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="text-center text-gray-700 text-sm mb-6 px-2 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="font-semibold mb-2">📱 For Mobile Use:</p>
              <p>Scan the code with your phone camera to open the AR page</p>
              <p className="text-xs mt-2 text-purple-600">
                ✨ Requires WebXR-compatible browser (Chrome, Edge)
              </p>
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
      )}
    </>
  );
}
