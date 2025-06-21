"use client"
import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import useGetProducts from "@/hooks/useGetProducts";
import usePostArFile from "@/hooks/usePostArFile";
import ControlButtonsPanel from "./ControlButtonsPanel";
import DimensionsPopup from "./DimensionsPopup";
import QRPopup from "./QRPopup";

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
  products,
}) {
  if (!position) return null;

  const menuRef = useRef(null);
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [qrCodeData, setQRCodeData] = useState(null);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  const { data: productsData, isLoading: isLoadingProducts, error: productsError } = useGetProducts();
  const { mutate: getArFile, isLoading: isLoadingAR } = usePostArFile();

  const findProductById = (modelId) => {
    if (!productsData || productsData.length === 0) return null;
    return productsData.find(product => {
      if (product.id === modelId || product.name === modelId) return true;
      if (String(product.id) === String(modelId) || String(product.name) === String(modelId)) return true;
      if (Number(product.id) === Number(modelId)) return true;
      if (String(product.name).toLowerCase() === String(modelId).toLowerCase()) return true;
      return false;
    });
  };

  const handleARView = () => {
    if (selectedModelId === null || selectedModelId === undefined) {
      alert('Please select a model first');
      return;
    }
    if (!productsData || productsData.length === 0) {
      alert(isLoadingProducts ? 'Products are still loading. Please wait.' : 'No products found.');
      return;
    }
    const selectedProduct = findProductById(selectedModelId);
    if (!selectedProduct) {
      alert(`Selected product not found: ${selectedModelId}`);
      return;
    }
    setIsGeneratingQR(true);
    getArFile(selectedProduct.name, {
      onSuccess: (data) => {
        if (data && data.arFileUrl) {
          setQRCodeData({ qrCodeUrl: data.arFileUrl, modelName: selectedProduct.name, arFileUrl: data.arFileUrl });
          setShowQRPopup(true);
        } else {
          alert('Failed to generate AR file');
        }
        setIsGeneratingQR(false);
      },
      onError: (error) => {
        alert(`Error generating AR file: ${error.message || error}`);
        setIsGeneratingQR(false);
      }
    });
  };

  const closeQRPopup = () => {
    setShowQRPopup(false);
    setQRCodeData(null);
  };

  const handleCopyLink = () => {
    if (qrCodeData && qrCodeData.arFileUrl) {
      navigator.clipboard.writeText(qrCodeData.arFileUrl)
        .then(() => alert('Link copied!'))
        .catch(() => alert('Failed to copy link'));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && showQRPopup) closeQRPopup();
    };
    if (showQRPopup) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showQRPopup]);

  useEffect(() => {
    let animationFrameId;
    const updateMenuPosition = () => {
      if (selectedModelId === null || selectedModelId === undefined) return;
      const modelEl = document.getElementById(selectedModelId);
      const cameraEl = document.querySelector("a-camera");
      const cameraObj = cameraEl && cameraEl.getObject3D("camera");
      if (modelEl && cameraObj) {
        const box = new THREE.Box3().setFromObject(modelEl.object3D);
        const center = new THREE.Vector3();
        box.getCenter(center);
        center.project(cameraObj);
        let x = (center.x * 0.5 + 0.5) * window.innerWidth;
        let y = (-center.y * 0.5 + 0.5) * window.innerHeight;
        const margin = 20;
        x = Math.max(margin, Math.min(x, window.innerWidth - margin));
        y = Math.max(margin, Math.min(y, window.innerHeight - margin));
        if (menuRef.current) {
          const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menuRef.current;
          if (x + menuWidth / 2 > window.innerWidth - margin) x = window.innerWidth - margin - menuWidth / 2;
          if (x - menuWidth / 2 < margin) x = margin + menuWidth / 2;
          if (y + menuHeight / 2 > window.innerHeight - margin) y = window.innerHeight - margin - menuHeight / 2;
          if (y - menuHeight / 2 < margin) y = margin + menuHeight / 2;
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
      className="bg-white bg-opacity-90 rounded-lg shadow-lg grid grid-cols-6 gap-2 p-3"
      style={{ position: "fixed", width: "310px", height: "100px", top: position.top, left: position.left, zIndex: 100, backdropFilter: "blur(5px)" }}
    >
      <ControlButtonsPanel
        onRotate={onRotate}
        onScale={onScale}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
        handleShowDimensions={handleShowDimensions}
        handleARView={handleARView}
        isLoadingAR={isLoadingAR}
        isGeneratingQR={isGeneratingQR}
        selectedModelId={selectedModelId}
      />

      <DimensionsPopup
        show={showDimensionPopup}
        position={dimContainerPos}
        dimensionsText={dimensionsText}
      />

      <QRPopup
        show={showQRPopup}
        data={qrCodeData}
        onClose={closeQRPopup}
        onCopy={handleCopyLink}
      />
    </div>
  );
}
