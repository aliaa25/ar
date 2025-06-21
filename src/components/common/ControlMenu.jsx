"use client";
import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import {
    FaTrash, FaCopy, FaExpand, FaCompress, FaArrowUp, FaArrowDown,
    FaArrowLeft, FaArrowRight, FaUndo, FaRedo, FaQrcode, FaTimes
} from "react-icons/fa";
import { MdStraighten } from "react-icons/md";

export default function ControlMenu({
    onRotate,
    onScale,
    onDuplicate,
    onDelete,
    handleShowDimensions,
    position,
    selectedModelId,
    dimContainerPos,
    showDimensionPopup,
    dimensionsText,
    setMenuPosition,
    items,
    selectedItem,
    mutate,
    setShowMenu 
}) {
    const menuRef = useRef(null);
    const [showQRPopup, setShowQRPopup] = useState(false);
    const [qrCodeData, setQRCodeData] = useState(null);
    const [isGeneratingQR, setIsGeneratingQR] = useState(false);
    const onClose = () => {
        if (setShowMenu) {
            setShowMenu(false);
        }
    };

    if (!position) return null;

    const handleARView = () => {
        if (!selectedItem) {
            alert(`Selected item not found.\nID: ${selectedModelId}`);
            return;
        }
        setIsGeneratingQR(true);

        mutate(selectedItem?.name, {
            onSuccess: (data) => {
                const baseUrl = window.location.origin;
                const arViewerUrl = `${baseUrl}/ar-viewer?model=${encodeURIComponent(data.arFileUrl)}&name=${encodeURIComponent(selectedItem.name)}`;
                setQRCodeData({
                    modelName: selectedItem.name,
                    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(arViewerUrl)}&size=250x250`,
                    arFileUrl: data.arFileUrl,
                    arViewerUrl: arViewerUrl
                });

                setShowQRPopup(true);
                setIsGeneratingQR(false);
            },
            onError: (error) => {
                console.error("Error generating QR code:", error);
                setIsGeneratingQR(false);
            }
        });
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
                if (!showQRPopup) {
                    onClose();
                }
            }
        };
        document.addEventListener('keydown', escHandler);
        return () => document.removeEventListener('keydown', escHandler);
    }, [showQRPopup]);

    useEffect(() => {
        let animationFrameId;
        const updateMenuPosition = () => {
            if (!selectedModelId) return;
            const modelEl = document.getElementById(selectedModelId);
            const cameraEl = document.querySelector("a-camera");
            const cameraObj = cameraEl?.getObject3D("camera");
            if (modelEl && cameraObj) {
                const box = new THREE.Box3().setFromObject(modelEl.object3D);
                const center = new THREE.Vector3();
                box.getCenter(center);
                center.project(cameraObj);

                let x = (center.x * 0.5 + 0.5) * window.innerWidth;
                let y = (-center.y * 0.5 + 0.5) * window.innerHeight;
                y = y - 130;
                const margin = 20;
                x = Math.max(margin, Math.min(x, window.innerWidth - margin));
                y = Math.max(margin, Math.min(y, window.innerHeight - margin));

                if (menuRef.current) {
                    const { offsetWidth, offsetHeight } = menuRef.current;
                    x = Math.min(x, window.innerWidth - offsetWidth / 2 - margin);
                    x = Math.max(x, offsetWidth / 2 + margin);
                    y = Math.min(y, window.innerHeight - offsetHeight / 2 - margin);
                    y = Math.max(y, offsetHeight / 2 + margin);
                }

                setMenuPosition({ left: x, top: y });
            }

            animationFrameId = requestAnimationFrame(updateMenuPosition);
        };

        updateMenuPosition();
        return () => cancelAnimationFrame(animationFrameId);
    }, [selectedModelId, setMenuPosition]);

    return (
        <div
            ref={menuRef}
            className="bg-white bg-opacity-90 rounded-lg shadow-lg grid grid-cols-9 gap-2 p-3"
            style={{
                position: "fixed",
                width: "550px",
                height: "100px",
                top: position.top,
                left: position.left,
                zIndex: 100,
                backdropFilter: "blur(5px)",
            }}
        >
            <IconBtn icon={<FaTrash />} label="Delete" onClick={() => onDelete("delete")} color="red" />
            <IconBtn icon={<FaCopy />} label="Copy" onClick={() => onDuplicate("duplicate")} color="blue" />
            <IconBtn icon={<FaExpand />} label="Enlarge" onClick={() => onScale("increase")} color="green" />
            <IconBtn icon={<FaCompress />} label="Shrink" onClick={() => onScale("decrease")} color="orange" />
            <IconBtn icon={<FaUndo />} label="Rotate L" onClick={() => onRotate("left")} color="indigo" />
            <IconBtn icon={<FaRedo />} label="Rotate R" onClick={() => onRotate("right")} color="indigo" />
            <IconBtn icon={<MdStraighten />} label="Dimensions" onClick={() => handleShowDimensions(selectedModelId)} color="teal" />

            <button
                className={`flex flex-col items-center justify-center rounded-md p-1 transition-all duration-200 ${isGeneratingQR || !selectedModelId
                        ? 'opacity-50 cursor-not-allowed bg-gray-100'
                        : 'hover:text-pink-600 hover:bg-pink-50'
                    }`}
                onClick={handleARView}
                disabled={isGeneratingQR || !selectedModelId}
                title="AR View"
            >
                {isGeneratingQR ? (
                    <div className="text-xs animate-spin">⏳</div>
                ) : (
                    <FaQrcode className="text-xs" />
                )}
                <span className="text-xs">
                    {isGeneratingQR ? "Creating QR..." : "AR View"}
                </span>
            </button>
            <IconBtn 
                icon={<FaTimes />} 
                label="Close" 
                onClick={onClose} 
                color="gray"
            />

            {showDimensionPopup && dimContainerPos && (
                <div
                    style={{
                        position: "absolute",
                        left: dimContainerPos.left,
                        top: dimContainerPos.top,
                        transform: "translate(-500%, -50%)",
                        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
                        textAlign: "left",
                        opacity: "0.95",
                        zIndex: 200,
                        minWidth: "140px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <div style={popupLineStyle}>{dimensionsText.width}</div>
                    <div style={popupLineStyle}>{dimensionsText.height}</div>
                    <div>{dimensionsText.depth}</div>
                </div>
            )}

            {showQRPopup && qrCodeData && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 backdrop-blur-md"
                    onClick={closeQRPopup}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeQRPopup}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors duration-300 focus:outline-none"
                            aria-label="Close popup"
                        >
                            <FaTimes size={24} />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">
                                AR Viewer
                            </h2>
                        </div>

                        <div className="text-lg font-semibold text-gray-700 mb-6 text-center">
                            {qrCodeData.modelName || "3D Model"}
                        </div>

                        <div className="relative mb-4">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 blur-lg opacity-30 rounded-lg"></div>
                            <div className="relative border-3 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-1">
                                <div className="bg-white rounded-md p-2">
                                    <img
                                        src={qrCodeData.qrCodeUrl}
                                        alt="AR QR Code"
                                        className="w-40 h-40 object-contain"
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
        </div>
    );
}
function IconBtn({ icon, label, onClick, color = "gray" }) {
    const colorClasses = {
        red: 'text-red-600 bg-red-50',
        blue: 'text-blue-600 bg-blue-50',
        green: 'text-green-600 bg-green-50',
        orange: 'text-orange-600 bg-orange-50',
        indigo: 'text-indigo-600 bg-indigo-50',
        teal: 'text-teal-600 bg-teal-50',
        pink: 'text-pink-600 bg-pink-50',
        gray: 'text-gray-600 bg-gray-50'
    };

    return (
        <button
            className={`flex flex-col items-center justify-center focus:outline-none transition-all duration-200 hover:${colorClasses[color]} rounded-md p-1 text-gray-700 hover:shadow-md`}
            onClick={onClick}
            title={label}
        >
            <div className="text-sm mb-1">{icon}</div>
            <span className="text-xs font-medium">{label}</span>
        </button>
    );
}

const popupLineStyle = {
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "8px",
    marginBottom: "10px",
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "#475569",
    textAlign: "center"
};