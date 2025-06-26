"use client";
import { useState, useEffect, useRef } from 'react';
import { X, Eye, EyeOff, Maximize2, Minimize2 } from 'lucide-react';

const DimensionsDisplay = ({ 
  selectedModelId, 
  models, 
  isVisible, 
  onClose 
}) => {
  const [dimensions, setDimensions] = useState({
    width: "",
    height: "",
    depth: "",
  });
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [showBoundingBox, setShowBoundingBox] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const animationRef = useRef();

  const projectToScreen = (vec, camera) => {
    const projected = vec.clone().project(camera);
    const x = (projected.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-projected.y * 0.5 + 0.5) * window.innerHeight;
    return { x, y };
  };

  const clearAllBoundingBoxes = () => {
    models.forEach((model) => {
      const modelEl = document.getElementById(model.id);
      if (modelEl && modelEl.hasAttribute("bounding-box-helper")) {
        modelEl.removeAttribute("bounding-box-helper");
      }
    });
  };

  const toggleBoundingBox = () => {
    if (!selectedModelId) return;

    const modelEl = document.getElementById(selectedModelId);
    if (!modelEl) return;

    if (showBoundingBox) {
      modelEl.removeAttribute("bounding-box-helper");
    } else {
      clearAllBoundingBoxes();
      modelEl.setAttribute("bounding-box-helper", "");
    }
    setShowBoundingBox(!showBoundingBox);
  };

  const updateDimensionsAndPosition = () => {
    if (!isVisible || !selectedModelId) return;

    const modelEl = document.getElementById(selectedModelId);
    const cameraEl = document.querySelector("a-camera");
    const cameraObj = cameraEl && cameraEl.getObject3D("camera");

    if (modelEl && cameraObj) {
      const box = new THREE.Box3().setFromObject(modelEl.object3D);
      
      const topCenter = new THREE.Vector3(
        (box.min.x + box.max.x) / 2,
        box.max.y,
        (box.min.z + box.max.z) / 2
      );

      const screenPos = projectToScreen(topCenter, cameraObj);

      setPosition({ 
        left: Math.max(10, Math.min(screenPos.x - 100, window.innerWidth - 220)), 
        top: Math.max(10, screenPos.y - 80) 
      });

      const mesh = modelEl.getObject3D("mesh");
      if (mesh) {
        const meshBox = new THREE.Box3().setFromObject(mesh);
        const min = meshBox.min;
        const max = meshBox.max;
        
        setDimensions({
          width: (max.x - min.x).toFixed(2),
          height: (max.y - min.y).toFixed(2),
          depth: (max.z - min.z).toFixed(2),
        });
      }
    }
  };

  useEffect(() => {
    if (isVisible && selectedModelId) {
      const modelEl = document.getElementById(selectedModelId);
      if (modelEl && showBoundingBox) {
        clearAllBoundingBoxes();
        modelEl.setAttribute("bounding-box-helper", "");
      }

      const animate = () => {
        updateDimensionsAndPosition();
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else {
      clearAllBoundingBoxes();
    }
  }, [isVisible, selectedModelId, showBoundingBox, models]);

  useEffect(() => {
    if (!selectedModelId) {
      clearAllBoundingBoxes();
    }
  }, [selectedModelId]);

  if (!isVisible || !selectedModelId) return null;

  return (
    <div 
      className="fixed z-50 pointer-events-none"
      style={{ 
        left: `${position.left}px`, 
        top: `${position.top}px`,
        transform: 'translateX(-50%)'
      }}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 pointer-events-auto min-w-[200px] max-w-[250px]">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Maximize2 className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-800">Dimensions</span>
          </div>
          <div className="flex items-center space-x-1">
            {/* Toggle minimize */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? (
                <Maximize2 className="w-3 h-3 text-gray-600" />
              ) : (
                <Minimize2 className="w-3 h-3 text-gray-600" />
              )}
            </button>
            
            {/* Toggle bounding box */}
            <button
              onClick={toggleBoundingBox}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
              title={showBoundingBox ? "Hide bounding box" : "Show bounding box"}
            >
              {showBoundingBox ? (
                <Eye className="w-3 h-3 text-green-600" />
              ) : (
                <EyeOff className="w-3 h-3 text-gray-400" />
              )}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-red-100 transition-colors"
              title="Close"
            >
              <X className="w-3 h-3 text-red-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className="p-4 space-y-3">
            {/* Width */}
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-700">Width</span>
              <span className="text-sm font-bold text-blue-800 bg-white px-2 py-1 rounded">
                {dimensions.width} m
              </span>
            </div>

            {/* Height */}
            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-700">Height</span>
              <span className="text-sm font-bold text-green-800 bg-white px-2 py-1 rounded">
                {dimensions.height} m
              </span>
            </div>

            {/* Depth */}
            <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-purple-700">Depth</span>
              <span className="text-sm font-bold text-purple-800 bg-white px-2 py-1 rounded">
                {dimensions.depth} m
              </span>
            </div>

            {/* Extra info */}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Bounding Box</span>
                <span className={`w-2 h-2 rounded-full ${showBoundingBox ? 'bg-green-400' : 'bg-gray-300'}`}></span>
              </div>
            </div>
          </div>
        )}

        {/* Minimized View */}
        {isMinimized && (
          <div className="p-2 text-center">
            <div className="text-xs text-gray-600">
              {dimensions.width} × {dimensions.height} × {dimensions.depth} m
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DimensionsDisplay;
