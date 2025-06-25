// components/common/ResponsiveARView
import React, { useState, useEffect } from 'react';
import { X, Plus, Menu } from 'lucide-react';
import { useFooter } from "@/components/providers/FooterContext";

const ResponsiveARView = ({ 
  children, 
  furnitureMenu, 
  controlMenu, 
  measurementButton 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileFurnitureMenu, setShowMobileFurnitureMenu] = useState(false);
  const { setShowFooter } = useFooter();

  useEffect(() => {
    setShowFooter(false); // اخفي الفوتر لما الكمبوننت يظهر

    return () => {
      setShowFooter(true); // رجع الفوتر لما تخرج من الكمبوننت
    };
  }, [setShowFooter]);
  
  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileFurnitureMenu && !event.target.closest('.mobile-furniture-menu')) {
        setShowMobileFurnitureMenu(false);
      }
    };

    if (isMobile && showMobileFurnitureMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobile, showMobileFurnitureMenu]);

  if (!isMobile) {
    // Desktop layout - original layout
    return (
      <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
        {/* Sidebar: Furniture Menu */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-2 shadow-md overflow-y-hidden h-1/2 md:h-auto">
          {furnitureMenu}
        </div>

        {/* Main 3D Scene Area */}
        <div className="flex-grow relative bg-gray-100">
          {children}
          
          {/* Measurement Tool Button */}
          <div className="absolute top-4 left-4 z-20">
            {measurementButton}
          </div>

          {/* Control Menu */}
          {controlMenu}
        </div>
      </div>
    );
  }

  // Mobile layout
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Full screen 3D Scene */}
      <div className="w-full h-full relative bg-gray-100">
        {children}
        
        {/* Mobile Measurement Tool Button - repositioned for mobile */}
        <div className="absolute top-4 left-4 z-20">
          {measurementButton}
        </div>

        {/* Mobile Control Menu - repositioned for mobile */}
        <div className="mobile-control-menu">
          {controlMenu}
        </div>
      </div>

      {/* Mobile Furniture Menu Toggle Button - محسن ومضمون الظهور */}
      <div className="fixed right-4 bottom-4 z-50">
        <button
          onClick={() => setShowMobileFurnitureMenu(true)}
          className="bg-mainbackground hover:bg-opacity-90 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center touch-manipulation"
          style={{ 
            width: '64px', 
            height: '64px',
            minWidth: '64px', 
            minHeight: '64px',
            fontSize: '24px',
            WebkitTapHighlightColor: 'transparent'
          }}
          aria-label="Add Furniture"
        >
          <Plus size={28} strokeWidth={2} />
        </button>
      </div>

      {/* Mobile Furniture Menu Overlay - sliding from right */}
      {showMobileFurnitureMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMobileFurnitureMenu(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-end pointer-events-none">
            <div className="mobile-furniture-menu h-full w-80 max-w-[85vw] bg-white overflow-hidden animate-slide-right flex flex-col pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                  <Menu size={20} className="text-mainbackground" />
                  <h3 className="text-lg font-semibold text-gray-800">Add Furniture</h3>
                </div>
                <button
                  onClick={() => setShowMobileFurnitureMenu(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close Menu"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              
              {/* Furniture Menu Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {furnitureMenu}
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slide-right {
          animation: slide-right 0.3s ease-out;
        }

        /* Mobile Control Menu Styling */
        .mobile-control-menu {
          position: absolute;
          top: 4px;
          right: 4px;
          z-index: 20;
        }

        /* Mobile-specific control menu styles */
        @media (max-width: 768px) {
          .mobile-control-menu .control-menu-container {
            min-width: 280px;
            max-width: calc(100vw - 32px);
          }
          
          .mobile-control-menu .control-menu-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }
          
          .mobile-control-menu .control-menu-button {
            padding: 8px 12px;
            font-size: 12px;
            min-height: 40px;
          }
          
          .mobile-control-menu .control-menu-title {
            font-size: 14px;
            padding: 8px 12px;
          }
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
    </div>
  );
};

export default ResponsiveARView;


