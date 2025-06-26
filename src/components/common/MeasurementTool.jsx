import  { useState, useEffect, useRef } from 'react';
import { Ruler, X, RotateCcw } from 'lucide-react';
import { AiOutlineClose } from "react-icons/ai"; // أيقونة X

const MeasurementTool = ({ isVisible = true  , setShowMeasurementTool}) => {
  const [isActive, setIsActive] = useState(false);
  const [points, setPoints] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const measurementIdRef = useRef(0);
  // Initialize A-Frame components
  useEffect(() => {
    if (typeof AFRAME !== "undefined") {
      // Register measurement point component
      if (!AFRAME.components["measurement-point"]) {
        AFRAME.registerComponent("measurement-point", {
          schema: {
            id: { type: 'string' },
            color: { type: 'color', default: '#ff0000' }
          },
          init: function () {
            this.el.setAttribute('geometry', {
              primitive: 'sphere',
              radius: 0.03
            });
            this.el.setAttribute('material', {
              color: this.data.color,
              emissive: this.data.color,
              emissiveIntensity: 0.3
            });
            this.el.setAttribute('position', this.el.getAttribute('position'));
          }
        });
      }

      // Register measurement line component
      if (!AFRAME.components["measurement-line"]) {
        AFRAME.registerComponent("measurement-line", {
          schema: {
            start: { type: 'vec3' },
            end: { type: 'vec3' },
            color: { type: 'color', default: '#00ff00' }
          },
          init: function () {
            this.updateLine();
          },
          update: function () {
            this.updateLine();
          },
          updateLine: function () {
            const start = this.data.start;
            const end = this.data.end;
            
            // Calculate line properties
            const distance = start.distanceTo ? start.distanceTo(end) : 
              Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2) + Math.pow(end.z - start.z, 2));
            
            const midpoint = {
              x: (start.x + end.x) / 2,
              y: (start.y + end.y) / 2,
              z: (start.z + end.z) / 2
            };
            
            // Set line geometry
            this.el.setAttribute('geometry', {
              primitive: 'cylinder',
              radius: 0.005,
              height: distance
            });
            
            this.el.setAttribute('material', {
              color: this.data.color
            });
            
            this.el.setAttribute('position', midpoint);
            
            // Calculate rotation to align with line direction
            const direction = {
              x: end.x - start.x,
              y: end.y - start.y,
              z: end.z - start.z
            };
            
            const rotationX = Math.atan2(direction.y, Math.sqrt(direction.x * direction.x + direction.z * direction.z));
            const rotationY = Math.atan2(direction.x, direction.z);
            
            this.el.setAttribute('rotation', {
              x: THREE.MathUtils.radToDeg(rotationX) + 90,
              y: THREE.MathUtils.radToDeg(rotationY),
              z: 0
            });
          }
        });
      }

      // Register measurement text component
      if (!AFRAME.components["measurement-text"]) {
        AFRAME.registerComponent("measurement-text", {
          schema: {
            text: { type: 'string' },
            position: { type: 'vec3' }
          },
          init: function () {
            this.el.setAttribute('text', {
              value: this.data.text,
              align: 'center',
              width: 4,
              color: '#ffffff',
              side: 'double'
            });
            this.el.setAttribute('position', this.data.position);
            this.el.setAttribute('look-at', '[camera]');
          },
          update: function () {
            this.el.setAttribute('text', 'value', this.data.text);
            this.el.setAttribute('position', this.data.position);
          }
        });
      }
    }
  }, []);

  // Handle scene clicks for measurement
  useEffect(() => {
    if (!isActive) return;

    const handleSceneClick = (evt) => {
      if (!evt.detail.intersection) return;
      
      const point = evt.detail.intersection.point;
      const newPoint = { x: point.x, y: point.y, z: point.z };
      
      handleDistanceMeasurement(newPoint);
    };

    const sceneEl = document.querySelector('a-scene');
    if (sceneEl) {
      sceneEl.addEventListener('click', handleSceneClick);
    }

    return () => {
      if (sceneEl) {
        sceneEl.removeEventListener('click', handleSceneClick);
      }
    };
  }, [isActive, points]);

  const handleDistanceMeasurement = (newPoint) => {
    if (points.length === 0) {
      // First point
      setPoints([newPoint]);
      addPointToScene(newPoint, 'start');
    } else if (points.length === 1) {
      // Second point - complete distance measurement
      const startPoint = points[0];
      const distance = calculateDistance(startPoint, newPoint);
      
      const measurement = {
        id: measurementIdRef.current++,
        type: 'distance',
        points: [startPoint, newPoint],
        value: distance,
        unit: 'm'
      };
      
      setMeasurements(prev => [...prev, measurement]);
      addPointToScene(newPoint, 'end');
      addLineToScene(startPoint, newPoint, distance);
      
      // Reset for next measurement
      setPoints([]);
      setIsActive(false);
    }
  };

  const calculateDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) +
      Math.pow(point2.y - point1.y, 2) +
      Math.pow(point2.z - point1.z, 2)
    ).toFixed(2);
  };

  const addPointToScene = (point, id) => {
    const sceneEl = document.querySelector('a-scene');
    if (!sceneEl) return;
    
    const pointEl = document.createElement('a-entity');
    pointEl.setAttribute('id', `measurement-point-${id}`);
    pointEl.setAttribute('measurement-point', {
      id: id,
      color: '#ff0000'
    });
    pointEl.setAttribute('position', `${point.x} ${point.y} ${point.z}`);
    
    sceneEl.appendChild(pointEl);
  };

  const addLineToScene = (start, end, distance) => {
    const sceneEl = document.querySelector('a-scene');
    if (!sceneEl) return;
    
    // Add line
    const lineEl = document.createElement('a-entity');
    lineEl.setAttribute('id', `measurement-line-${measurementIdRef.current}`);
    lineEl.setAttribute('measurement-line', {
      start: start,
      end: end,
      color: '#00ff00'
    });
    sceneEl.appendChild(lineEl);
    
    // Add distance text
    const midpoint = {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2 + 0.2,
      z: (start.z + end.z) / 2
    };
    
    const textEl = document.createElement('a-entity');
    textEl.setAttribute('id', `measurement-text-${measurementIdRef.current}`);
    textEl.setAttribute('measurement-text', {
      text: `${distance}m`,
      position: midpoint
    });
    sceneEl.appendChild(textEl);
  };

  const startDistanceMeasurement = () => {
    setIsActive(true);
    setPoints([]);
  };

  const cancelMeasurement = () => {
    setIsActive(false);
    setPoints([]);
    
    // Remove temporary points from scene
    const sceneEl = document.querySelector('a-scene');
    if (sceneEl) {
      const tempPoints = sceneEl.querySelectorAll('[id^="measurement-point-"]');
      tempPoints.forEach(point => {
        if (!point.id.includes('measurement-line-')) {
          sceneEl.removeChild(point);
        }
      });
    }
  };

  const clearAllMeasurements = () => {
    const sceneEl = document.querySelector('a-scene');
    if (sceneEl) {
      // Remove all measurement elements
      const measurementEls = sceneEl.querySelectorAll('[id^="measurement-"]');
      measurementEls.forEach(el => sceneEl.removeChild(el));
    }
    
    setMeasurements([]);
    setPoints([]);
    setIsActive(false);
  };

  if (!isVisible) return null;

return (
  <div className="fixed top-20 right-4 z-20 bg-green-950/60 backdrop-blur-sm rounded-lg shadow-lg p-3 min-w-[200px] max-w-[240px]">
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-secondary text-sm">Distance Measurement</h3>
        <div className="flex items-center gap-1">
          {/* Clear Measurements Button */}
          {measurements.length > 0 && (
            <button
              onClick={clearAllMeasurements}
              className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
              title="Clear all measurements"
            >
              <RotateCcw size={14} />
            </button>
          )}
          {/* Close Button */}
          <button
            onClick={()=>setShowMeasurementTool(false)}
            className="p-1 text-white hover:bg-white/10 rounded transition-colors"
            title="Close"
          >
            <AiOutlineClose size={14} />
          </button>
        </div>
      </div>

      {/* Measurement Tool */}
      <div>
        <button
          onClick={startDistanceMeasurement}
          disabled={isActive}
          className={`w-full p-2 rounded border-2 transition-all text-xs ${
            isActive
              ? 'bg-blue-100 border-blue-500 text-blue-700'
              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
          } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Ruler className="mx-auto mb-1" size={16} />
          <span className="block">Measure Distance</span>
        </button>
      </div>

      {/* Active Measurement Status */}
      {isActive && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-yellow-800">
                {points.length === 0 ? 'Click to select first point' : 'Click to select second point'}
              </p>
            </div>
            <button
              onClick={cancelMeasurement}
              className="p-1 text-red-500 hover:bg-red-50 rounded"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}
     {/* Instructions */}
      <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
        <p><strong>Distance Measurement:</strong> Click on two points to measure the distance between them</p>
      </div>
    </div>
  </div>
);

};

export default MeasurementTool;