// File: components/ControlMenu/ControlButtonsPanel.jsx
import {
  FaTrash, FaCopy, FaExpand, FaCompress,
  FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight,
  FaUndo, FaRedo, FaQrcode
} from "react-icons/fa";
import { MdStraighten } from "react-icons/md";

export default function ControlButtonsPanel({
  onRotate,
  onScale,
  onDuplicate,
  onDelete,
  handleShowDimensions,
  handleARView,
  isLoadingAR,
  isGeneratingQR,
  selectedModelId
}) {
  const isDisabled = isLoadingAR || isGeneratingQR || (selectedModelId === null || selectedModelId === undefined);

  return (
    <>
      <button onClick={() => onDelete("delete")} title="Delete item" className="control-btn hover:text-red-600 hover:bg-red-50">
        <FaTrash className="text-xs" />
        <span className="text-xs">Delete</span>
      </button>

      <button onClick={() => onDuplicate("duplicate")} title="Copy item" className="control-btn hover:text-blue-600 hover:bg-blue-50">
        <FaCopy className="text-xs" />
        <span className="text-xs">Copy</span>
      </button>

      <button onClick={() => onScale("increase")} title="Enlarge item" className="control-btn hover:text-green-600 hover:bg-green-50">
        <FaExpand className="text-xs" />
        <span className="text-xs">Enlarge</span>
      </button>

      <button onClick={() => onScale("decrease")} title="Shrink item" className="control-btn hover:text-orange-600 hover:bg-orange-50">
        <FaCompress className="text-xs" />
        <span className="text-xs">Shrink</span>
      </button>

      <button onClick={() => onRotate("up")} title="Move up" className="control-btn hover:text-purple-600 hover:bg-purple-50">
        <FaArrowUp className="text-xs" />
        <span className="text-xs">Up</span>
      </button>

      <button onClick={() => onRotate("backward")} title="Move down" className="control-btn hover:text-purple-600 hover:bg-purple-50">
        <FaArrowDown className="text-xs" />
        <span className="text-xs">Down</span>
      </button>

      <button onClick={() => onRotate("left")} title="Move left" className="control-btn hover:text-purple-600 hover:bg-purple-50">
        <FaArrowLeft className="text-xs" />
        <span className="text-xs">Left</span>
      </button>

      <button onClick={() => onRotate("right")} title="Move right" className="control-btn hover:text-purple-600 hover:bg-purple-50">
        <FaArrowRight className="text-xs" />
        <span className="text-xs">Right</span>
      </button>

      <button onClick={() => onRotate("left")} title="Rotate left" className="control-btn hover:text-indigo-600 hover:bg-indigo-50">
        <FaUndo className="text-xs" />
        <span className="text-xs">Rotate L</span>
      </button>

      <button onClick={() => onRotate("right")} title="Rotate right" className="control-btn hover:text-indigo-600 hover:bg-indigo-50">
        <FaRedo className="text-xs" />
        <span className="text-xs">Rotate R</span>
      </button>

      <button onClick={() => handleShowDimensions(selectedModelId)} title="Show dimensions" className="control-btn hover:text-teal-600 hover:bg-teal-50">
        <MdStraighten className="text-xs" />
        <span className="text-xs">Dimensions</span>
      </button>

      <button
        onClick={handleARView}
        disabled={isDisabled}
        title="Augmented Reality View"
        className={`control-btn ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'hover:text-pink-600 hover:bg-pink-50'}`}
      >
        {isDisabled ? <div className="text-xs animate-spin">⏳</div> : <FaQrcode className="text-xs" />}
        <span className="text-xs">
          {isLoadingAR ? 'Loading...' : isGeneratingQR ? 'Creating QR...' : 'AR View'}
        </span>
      </button>
    </>
  );
}
