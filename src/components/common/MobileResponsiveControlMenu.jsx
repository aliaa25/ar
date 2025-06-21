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
  Wrench
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
  const [showMobileControlMenu, setShowMobileControlMenu] = useState(false);

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileControlMenu && !event.target.closest('.mobile-control-menu')) {
        setShowMobileControlMenu(false);
      }
    };

    if (isMobile && showMobileControlMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobile, showMobileControlMenu]);

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
    setShowMobileControlMenu(false);
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
    text-sm bg-mainbackground text-white shadow-sm
  `;

  const dangerButtonClass = `
    w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg font-medium 
    transition-all duration-200 hover:bg-red-600 
    text-sm bg-red-500 text-white shadow-sm
  `;

  return (
    <>
      {/* Desktop Menu - الشكل الأصلي */}
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
            <button onClick={() => onRotate('left')} className={buttonClass}>
              <RotateCcw size={16} />
              <span>Left</span>
            </button>
            <button onClick={() => onRotate('right')} className={buttonClass}>
              <RotateCw size={16} />
              <span>Right</span>
            </button>
            <button onClick={() => onScale('increase')} className={buttonClass}>
              <ZoomIn size={16} />
              <span>Zoom In</span>
            </button>
            <button onClick={() => onScale('decrease')} className={buttonClass}>
              <ZoomOut size={16} />
              <span>Zoom Out</span>
            </button>
            <button onClick={onDuplicate} className={buttonClass}>
              <Copy size={16} />
              <span>Duplicate</span>
            </button>
            <button onClick={handleShowDimensions} className={primaryButtonClass.replace('w-full', '')}>
              <Ruler size={16} />
              <span>Dimensions</span>
            </button>
          </div>

          <button onClick={handleViewInAR} className={primaryButtonClass + " mt-3"}>
            <QrCode size={16} />
            <span>View in AR</span>
          </button>

          <button onClick={onDelete} className={dangerButtonClass + " mt-2"}>
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      )}

      {/* Mobile Control Menu Toggle Button - في الجانب الأيسر */}
      {isMobile && (
        <div className="fixed left-4 bottom-4 z-50">
          <button
            onClick={() => setShowMobileControlMenu(true)}
            className="bg-mainbackground hover:bg-opacity-90 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center touch-manipulation"
            style={{ 
              width: '56px', 
              height: '56px',
              minWidth: '56px', 
              minHeight: '56px'
            }}
            aria-label="Control Tools"
          >
            <Settings size={24} strokeWidth={2} />
          </button>
        </div>
      )}

      {/* Mobile Control Menu Overlay - sliding from left */}
      {isMobile && showMobileControlMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMobileControlMenu(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-start pointer-events-none">
            <div className="mobile-control-menu h-full w-80 max-w-[85vw] bg-white overflow-hidden animate-slide-left flex flex-col pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                  <Wrench size={20} className="text-mainbackground" />
                  <h3 className="text-lg font-semibold text-gray-800">Control Tools</h3>
                </div>
                <button
                  onClick={() => setShowMobileControlMenu(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close Menu"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              
              {/* Control Menu Content - الأزرار تحت بعض */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Transform</h4>
                  
                  <button onClick={() => onRotate('left')} className={buttonClass}>
                    <RotateCcw size={20} />
                    <span>Rotate Left</span>
                  </button>
                  
                  <button onClick={() => onRotate('right')} className={buttonClass}>
                    <RotateCw size={20} />
                    <span>Rotate Right</span>
                  </button>
                  
                  <button onClick={() => onScale('increase')} className={buttonClass}>
                    <ZoomIn size={20} />
                    <span>Zoom In</span>
                  </button>
                  
                  <button onClick={() => onScale('decrease')} className={buttonClass}>
                    <ZoomOut size={20} />
                    <span>Zoom Out</span>
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Actions</h4>
                  
                  <button onClick={onDuplicate} className={buttonClass}>
                    <Copy size={20} />
                    <span>Duplicate</span>
                  </button>
                  
                  <button onClick={handleShowDimensions} className={primaryButtonClass}>
                    <Ruler size={20} />
                    <span>Show Dimensions</span>
                  </button>
                  
                  <button 
                    onClick={handleViewInAR} 
                    className={primaryButtonClass}
                    disabled={isLoadingAR}
                  >
                    <QrCode size={20} />
                    <span>{isLoadingAR ? 'Loading...' : 'View in AR'}</span>
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <button onClick={onDelete} className={dangerButtonClass}>
                    <Trash2 size={20} />
                    <span>Delete Item</span>
                  </button>
                </div>
              </div>
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
        @keyframes slide-left {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slide-left {
          animation: slide-left 0.3s ease-out;
        }

        /* تأكد من ظهور الزر على جميع الأجهزة */
        @media (max-width: 768px) {
          .fixed {
            position: fixed !important;
          }
        }

        /* إضافة تحسينات للـ touch */
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </>
  );
};

export default MobileResponsiveControlMenu;