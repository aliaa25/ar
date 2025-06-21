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
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import usePostArFile from "@/hooks/usePostArFile";

const MobileResponsiveControlMenu = ({
  dimensionsText,
  dimContainerPos,
  showDimensionPopup,
  onRotate,
  onScale,
  onDuplicate,
  onDelete,
  handleShowDimensions,
  selectedModelId,
  selectedItem,
  setMenuPosition,
  setQrCodeData,
  setShowQRPopup,
  setShowMenu
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // hook لاستدعاء API لجلب ملف AR
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
    if (!selectedItem) {
      alert("Please select an item first.");
      return;
    }

    getArFile(selectedItem.name, {
      onSuccess: (data) => {
        const baseUrl = window.location.origin;
        const arViewerUrl = `${baseUrl}/ar-viewer?model=${encodeURIComponent(data.arFileUrl)}&name=${encodeURIComponent(selectedItem.name)}`;

        window.open(arViewerUrl, '_blank');
      },
      onError: (error) => {
        console.error("Failed to load AR model:", error);
        alert("Something went wrong while opening AR viewer.");
      }
    });
  };

  const handleClose = () => {
    setShowMenu(false);
    setMenuPosition(null);
  };

  if (!selectedModelId) return null;

  const buttonBaseClass = `
    flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium 
    transition-all duration-200 shadow-sm border text-sm
    ${isMobile ? 'min-h-[40px] text-xs' : 'min-h-[36px] text-sm'}
  `;

  const primaryButtonClass = `${buttonBaseClass} bg-mainbackground text-white border-mainbackground hover:bg-opacity-90`;
  const secondaryButtonClass = `${buttonBaseClass} bg-white text-gray-700 border-gray-300 hover:bg-gray-50`;
  const dangerButtonClass = `${buttonBaseClass} bg-red-500 text-white border-red-500 hover:bg-red-600`;

  return (
    <>
      {/* Desktop Menu */}
      {!isMobile && (
        <div className="control-menu-container bg-white rounded-xl shadow-lg border border-gray-200 p-4 min-w-[300px] z-50">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
            <h3 className="control-menu-title text-sm font-semibold text-gray-800">
              Control Tools
            </h3>
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close Menu"
            >
              <X size={16} className="text-gray-500" />
            </div>
          </div>

          <div className="control-menu-grid grid grid-cols-2 gap-2">
            <button onClick={() => onRotate('left')} className={secondaryButtonClass}>
              <RotateCcw size={16} />
              <span>Left</span>
            </button>
            <button onClick={() => onRotate('right')} className={secondaryButtonClass}>
              <RotateCw size={16} />
              <span>Right</span>
            </button>
            <button onClick={() => onScale('increase')} className={secondaryButtonClass}>
              <ZoomIn size={16} />
              <span>Zoom In</span>
            </button>
            <button onClick={() => onScale('decrease')} className={secondaryButtonClass}>
              <ZoomOut size={16} />
              <span>Zoom Out</span>
            </button>
            <button onClick={onDuplicate} className={secondaryButtonClass}>
              <Copy size={16} />
              <span>Duplicate</span>
            </button>
            <button onClick={handleShowDimensions} className={primaryButtonClass}>
              <Ruler size={16} />
              <span>Dimensions</span>
            </button>
          </div>

          <button onClick={handleViewInAR} className={primaryButtonClass + " w-full mt-3"}>
            <QrCode size={16} />
            <span>View in AR</span>
          </button>

          <button onClick={onDelete} className={dangerButtonClass + " w-full mt-2"}>
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <div
          className="control-menu-container bg-white rounded-t-2xl shadow-lg border border-gray-200 max-w-full z-50 fixed bottom-0 left-0 right-0"
          style={{ maxHeight: isCollapsed ? '48px' : 'auto', overflow: 'hidden' }}
        >
          <div
            className="w-full flex items-center justify-between p-3 border-b border-gray-100 cursor-pointer"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-expanded={!isCollapsed}
            aria-controls="mobile-control-menu-content"
          >
            <div className="flex items-center gap-2">
              <h3 className="control-menu-title text-sm font-semibold text-gray-800">
                Control Tools
              </h3>
              {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close Menu"
            >
              <X size={16} className="text-gray-500" />
            </div>
          </div>

          {!isCollapsed && (
            <div
              id="mobile-control-menu-content"
              className="p-3 overflow-y-auto max-h-[calc(100vh-60px)]"
            >
              <div className="control-menu-grid grid grid-cols-2 gap-2 mb-3">
                <button onClick={() => onRotate('left')} className={secondaryButtonClass}>
                  <RotateCcw size={14} />
                  <span>Left</span>
                </button>
                <button onClick={() => onRotate('right')} className={secondaryButtonClass}>
                  <RotateCw size={14} />
                  <span>Right</span>
                </button>
                <button onClick={() => onScale('increase')} className={secondaryButtonClass}>
                  <ZoomIn size={14} />
                  <span>Zoom In</span>
                </button>
                <button onClick={() => onScale('decrease')} className={secondaryButtonClass}>
                  <ZoomOut size={14} />
                  <span>Zoom Out</span>
                </button>
                <button onClick={onDuplicate} className={secondaryButtonClass}>
                  <Copy size={14} />
                  <span>Duplicate</span>
                </button>
                <button onClick={handleShowDimensions} className={primaryButtonClass}>
                  <Ruler size={14} />
                  <span>Dimensions</span>
                </button>
              </div>

              <div className="space-y-2">
                <button onClick={handleViewInAR} className={primaryButtonClass + " w-full"}>
                  <QrCode size={14} />
                  <span>View In AR</span>
                </button>
                <button onClick={onDelete} className={dangerButtonClass + " w-full"}>
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>
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
    </>
  );
};

export default MobileResponsiveControlMenu;
