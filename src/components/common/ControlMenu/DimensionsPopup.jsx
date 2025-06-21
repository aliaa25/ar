import React from "react";

export default function DimensionsPopup({ show, position, dimensionsText }) {
  if (!show || !position) return null;

  return (
    <div
      className="absolute z-50 bg-white p-2 rounded shadow-md border text-sm"
      style={{
        top: position.top,
        left: position.left,
        minWidth: "100px",
        maxWidth: "200px",
        pointerEvents: "none",
        opacity: 0.95
      }}
    >
      <div className="text-gray-800 whitespace-pre-line">
        {dimensionsText}
      </div>
    </div>
  );
}
