"use client";
import useGetProducts from "@/hooks/useGetProducts";
import usePostArFile from "@/hooks/usePostArFile";
import useRoomBound from "@/hooks/useRoomBounds";
import FurnitureMenu from "@/components/common/FurnitureMenu"
import ControlMenu from "@/components/common/ControlMenu";
import MeasurementTool from "@/components/common/MeasurementTool";
import MobileResponsiveControlMenu from '@/components/common/MobileResponsiveControlMenu';
import ResponsiveARView from '@/components/common/ResponsiveARView';
// import 'aframe-extras';
import  { useState, useEffect, useRef } from "react";

export default function page() {
  useRoomBound();
  const [models, setModels] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null)
  const [qrCodeData, setQrCodeData] = useState(null);
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [dimContainerPos, setDimContainerPos] = useState(null);
  const [dimensionsText, setDimensionsText] = useState({
    width: "",
    height: "",
    depth: "",
  });
  const [modelSrc, setModelSrc] = useState(null);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [cursorPos, setCursorPos] = useState("0 1 0");
  const [menuPosition, setMenuPosition] = useState(null);
  const [modelId, setModelId] = useState(0);
  const furnitureFileInputRef = useRef(null);
  const [showDimensionPopup, setShowDimensionPopup] = useState(false);
  const { data, isLoading, error } = useGetProducts()
  const { mutate } = usePostArFile()
  const [showMeasurementTool, setShowMeasurementTool] = useState(false);

useEffect(() => {
    // نضمن إننا على الكلاينت فقط
    if (typeof window !== "undefined") {
      require("aframe-extras")(window.AFRAME);
    }
  }, []);
const handleTouchStart = (e) => {
  draggingRef.current = true;
  const touch = e.touches[0];
  lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
  e.preventDefault();
};

const handleTouchMove = (e) => {
  if (!draggingRef.current) return;
  const touch = e.touches[0];
  const dx = touch.clientX - lastTouchRef.current.x;
  const dy = touch.clientY - lastTouchRef.current.y;
  lastTouchRef.current = { x: touch.clientX, y: touch.clientY };

  setCursorPosition((prev) => ({
    x: prev.x + dx * 0.01,
    y: Math.min(Math.max(prev.y - dy * 0.01, 0.5), 3),
    z: prev.z,
  }));

  e.preventDefault();
};

const handleTouchEnd = () => {
  draggingRef.current = false;
};


  const handleAddItem = (itemSrc) => {
    const model = {
      id: modelId.toString(),
      src: itemSrc,
      position: cursorPos,
      scale: "1 1 1",
      rotation: "0 0 0",
    };
    setModels([...models, model]);
    setSelectedModelId(null);
    setMenuPosition(null);
    setShowDimensionPopup(false);
    setShowMenu(false);
    setModelId(modelId + 1);
  };
  

  const handleRemoveItem = (id) => {
    const newModels = models.filter((model) => model.id !== id);
    setModels(newModels);
    setSelectedModelId(null);
    setMenuPosition(null);
    setShowDimensionPopup(false);
    setShowMenu(false);
  };

  const handleRotateItem = (id, direction) => {
    const newModels = models.map((model) => {
      if (model.id === id) {
        const currentRotation = AFRAME.utils.coordinates.parse(model.rotation || "0 0 0");
        const newRotation = {
          ...currentRotation,
          y: currentRotation.y + (direction === "left" ? -45 : 45),
        };
        return {
          ...model,
          rotation: AFRAME.utils.coordinates.stringify(newRotation),
        };
      }
      return model;
    });
    setModels(newModels);
  };

  const handleScaleItem = (id, direction) => {
    const newModels = models.map((model) => {
      if (model.id === id) {
        const currentScale = AFRAME.utils.coordinates.parse(model.scale);
        const scaleFactor = direction === "increase" ? 1.1 : 0.9;
        const newScale = {
          x: Math.min(1.8, Math.max(0.8, currentScale.x * scaleFactor)),
          y: Math.min(1.8, Math.max(0.8, currentScale.y * scaleFactor)),
          z: Math.min(1.8, Math.max(0.8, currentScale.z * scaleFactor)),
        };
        return { ...model, scale: AFRAME.utils.coordinates.stringify(newScale) };
      }
      return model;
    });
    setModels(newModels);
  };

  const handleDuplicateItem = () => {
    const selectedItem = models.find((model) => model.id === selectedModelId);
    if (selectedItem) {
      const newModel = { ...selectedItem, id: modelId.toString() };
      const currentPosition = selectedItem.position.split(" ").map(Number);
      const newPosition = `${currentPosition[0] + 1} ${currentPosition[1]} ${currentPosition[2]}`;
      newModel.position = newPosition;
      setModels([...models, newModel]);
      setSelectedModelId(newModel.id);
      setModelId(modelId + 1);
    }
  };

  function projectToScreen(vec, camera) {
    const projected = vec.clone().project(camera);
    const x = (projected.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-projected.y * 0.5 + 0.5) * window.innerHeight;
    return { x, y };
  }
  

  // Update dimension popup container to follow the model.
  useEffect(() => {
    let animId;
    const updateDimPopupPosition = () => {
      if (showDimensionPopup && selectedModelId) {
        const modelEl = document.getElementById(selectedModelId);
        const cameraEl = document.querySelector("a-camera");
        const cameraObj = cameraEl && cameraEl.getObject3D("camera");
        if (modelEl && cameraObj) {
          // Compute the top-center of the model's bounding box.
          const box = new THREE.Box3().setFromObject(modelEl.object3D);
          const topCenter = new THREE.Vector3(
            (box.min.x + box.max.x) / 2,
            box.max.y,
            (box.min.z + box.max.z) / 2
          );
          const proj = projectToScreen(topCenter, cameraObj);
          // Position the container slightly above the top-center.
          setDimContainerPos({ left: proj.x, top: proj.y - 40 });
          // Update dimensions text using the mesh bounding box.
          const mesh = modelEl.getObject3D("mesh");
          if (mesh) {
            const meshBox = new THREE.Box3().setFromObject(mesh);
            const min = meshBox.min;
            const max = meshBox.max;
            setDimensionsText({
              width: `Width: ${(max.x - min.x).toFixed(2)}`,
              height: `Height: ${(max.y - min.y).toFixed(2)}`,
              depth: `Length: ${(max.z - min.z).toFixed(2)}`,
            });
          }
        }
      }
      animId = requestAnimationFrame(updateDimPopupPosition);
    };
    updateDimPopupPosition();
    return () => cancelAnimationFrame(animId);
  }, [showDimensionPopup, selectedModelId, models]);

  const clearAllBoundingBoxes = () => {
    models.forEach((model) => {
      const modelEl = document.getElementById(model.id);
      if (modelEl && modelEl.hasAttribute("bounding-box-helper")) {
        modelEl.removeAttribute("bounding-box-helper");
      }
    });
  };

  // When the Dimensions button is clicked, activate the popup and add the bounding-box-helper.
  const handleShowDimensions = (id) => {
    setShowDimensionPopup(true);
    clearAllBoundingBoxes();
    const modelEl = document.getElementById(id);
    if (modelEl && !modelEl.hasAttribute("bounding-box-helper")) {
      // Add the bounding box helper to the model.
      modelEl.setAttribute("bounding-box-helper", "");
    }
  };

  const handleFloorClick = (evt) => {
    let point = null;
    if (evt.detail && evt.detail.intersection) {
      point = evt.detail.intersection.point;
    } else {
      const mouse = new THREE.Vector2();
      mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(evt.clientY / window.innerHeight) * 2 + 1;
      const sceneEl = document.querySelector("a-scene");
      const camera = sceneEl.camera;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      point = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, point);
    }
    if (point) {
      const newPos = `${point.x.toFixed(2)} ${point.y.toFixed(2)} ${point.z.toFixed(2)}`;
      setCursorPos(newPos);
    }
    setSelectedModelId(null);
    setMenuPosition(null);
    setShowDimensionPopup(false);
    // ✅ إخفاء المينيو عند النقر على الأرضية
    setShowMenu(false);
  };

  useEffect(() => {
    const sceneEl = document.querySelector("a-scene");
    if (sceneEl) {
      sceneEl.addEventListener("click", handleFloorClick);
    }
    return () => {
      if (sceneEl) {
        sceneEl.removeEventListener("click", handleFloorClick);
      }
    };
  }, []);

  if (typeof AFRAME !== "undefined") {
    if (!AFRAME.components["drag-drop"]) {
      AFRAME.registerComponent("drag-drop", {
        schema: {},
        init: function () {
          this.dragging = false;
          this.offset = new AFRAME.THREE.Vector3();
          this.cameraEl = null;
          // Save original scale of the object.
          this.originalScale = {
            x: this.el.object3D.scale.x,
            y: this.el.object3D.scale.y,
            z: this.el.object3D.scale.z,
          };
          // Set initial bottom offset.
          this.initialBottomOffset = 0;
          // Bind event handlers.
          this.onMouseDown = this.onMouseDown.bind(this);
          this.onMouseMove = this.onMouseMove.bind(this);
          this.onMouseUp = this.onMouseUp.bind(this);
          this.el.addEventListener("mousedown", this.onMouseDown);
        },
        onMouseDown: function (evt) {
          evt.stopPropagation();
          evt.preventDefault();
          this.dragging = true;
          // Update scale.
          this.originalScale = {
            x: this.el.object3D.scale.x,
            y: this.el.object3D.scale.y,
            z: this.el.object3D.scale.z,
          };
          // Pause camera controls.
          this.cameraEl = this.el.sceneEl.querySelector("[camera]");
          if (this.cameraEl && this.cameraEl.components["look-controls"]) {
            this.cameraEl.components["look-controls"].pause();
          }
          // Calculate offset.
          if (evt.detail && evt.detail.intersection) {
            this.offset.copy(this.el.object3D.position).sub(evt.detail.intersection.point);
            this.offset.y = 0;
          } else {
            this.offset.set(0, 0, 0);
          }
          // Calculate initial bottom offset based on object's bounding box.
          const mesh = this.el.getObject3D("mesh");
          if (mesh) {
            const bbox = new AFRAME.THREE.Box3().setFromObject(this.el.object3D);
            this.initialBottomOffset = this.el.object3D.position.y - bbox.min.y;
          } else {
            this.initialBottomOffset = 0;
          }
          window.addEventListener("mousemove", this.onMouseMove);
          window.addEventListener("mouseup", this.onMouseUp);
        },
        onMouseMove: function (evt) {
          if (!this.dragging) return;
          evt.preventDefault();
          const mouse = new AFRAME.THREE.Vector2();
          mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(evt.clientY / window.innerHeight) * 2 + 1;
          const camera = this.el.sceneEl.camera;
          const raycaster = new AFRAME.THREE.Raycaster();
          raycaster.setFromCamera(mouse, camera);
          let intersectionPoint = null;
          // Try to intersect with the floor.
          const floorEl = document.getElementById("floor");
          if (floorEl) {
            const intersects = raycaster.intersectObject(floorEl.object3D, true);
            if (intersects.length > 0) {
              intersectionPoint = intersects[0].point;
            }
          }
          // If no floor, use a horizontal plane at y=0.
          if (!intersectionPoint) {
            const plane = new AFRAME.THREE.Plane(new AFRAME.THREE.Vector3(0, 1, 0), 0);
            intersectionPoint = new AFRAME.THREE.Vector3();
            if (raycaster.ray.intersectPlane(plane, intersectionPoint) === null) {
              return;
            }
          }
          const targetPos = intersectionPoint.clone().add(this.offset);
          // Apply room boundaries if defined.
          if (window.roomBounds) {
            const box = new AFRAME.THREE.Box3().setFromObject(this.el.object3D);
            const halfWidth = (box.max.x - box.min.x) / 2;
            const halfDepth = (box.max.z - box.min.z) / 2;
            const wallThickness = 0.5;
            const backMargin = 0.2;
            targetPos.x = Math.min(
              Math.max(targetPos.x, window.roomBounds.minX + halfWidth),
              window.roomBounds.maxX - halfWidth
            );
            targetPos.z = Math.min(
              Math.max(
                targetPos.z,
                window.roomBounds.minZ + wallThickness + halfDepth + backMargin
              ),
              window.roomBounds.maxZ - halfDepth
            );
          } else {
            const safeBoundary = 3.5;
            targetPos.x = Math.max(-safeBoundary, Math.min(targetPos.x, safeBoundary));
            targetPos.z = Math.max(-safeBoundary, Math.min(targetPos.z, safeBoundary));
          }
          // Maintain the original y position.
          targetPos.y = this.el.object3D.position.y;
          this.el.setAttribute("position", `${targetPos.x} ${targetPos.y} ${targetPos.z}`);
          // Reset scale.
          this.el.object3D.scale.set(
            this.originalScale.x,
            this.originalScale.y,
            this.originalScale.z
          );
        },
        onMouseUp: function (evt) {
          this.dragging = false;
          window.removeEventListener("mousemove", this.onMouseMove);
          window.removeEventListener("mouseup", this.onMouseUp);
          if (this.cameraEl && this.cameraEl.components["look-controls"]) {
            this.cameraEl.components["look-controls"].play();
          }
        },
        remove: function () {
          this.el.removeEventListener("mousedown", this.onMouseDown);
          window.removeEventListener("mousemove", this.onMouseMove);
          window.removeEventListener("mouseup", this.onMouseUp);
        },
      });
    }

    // Updated bounding-box-helper using THREE.Box3Helper
    if (!AFRAME.components["bounding-box-helper"]) {
      AFRAME.registerComponent("bounding-box-helper", {
        schema: {
          // Default color set to bastel green.
          color: { type: "color", default: "#4CAF50" },
        },
        init: function () {
          // Create a Box3 to compute the object's bounding box.
          this.box = new THREE.Box3();
          // Create a Box3Helper that visualizes the computed box.
          this.helper = new THREE.Box3Helper(this.box, this.data.color);
          this.el.sceneEl.object3D.add(this.helper);
        },
        tick: function () {
          if (this.helper) {
            // Ensure the object's world matrices are up-to-date.
            this.el.object3D.updateMatrixWorld(true);
            // Recompute the bounding box.
            this.box.setFromObject(this.el.object3D);
            // Display helper as long as the box is not empty.
            this.helper.visible = !this.box.isEmpty();
          }
        },
        remove: function () {
          if (this.helper) {
            this.el.sceneEl.object3D.remove(this.helper);
            this.helper = null;
          }
        },
      });
    }
  }

  const handleModelClick = (evt, model) => {
    evt.stopPropagation();
    setSelectedModelId(model.id);
    setMenuPosition({ x: 0, y: 0 });
    setShowDimensionPopup(false);
    // ✅ إظهار المينيو عند اختيار عنصر
    setShowMenu(true);

    const src = model.src;
    const matchedItem = data.find((item) =>
      src.includes(item.name) || src === item.arFileUrl
    );
    if (matchedItem) {
      setSelectedItem(matchedItem);
      console.log("✅ Selected Item Set:", matchedItem);
    } else {
      console.warn("❌ No matching item found for:", src);
    }
  };

  const handleFurnitureButtonClick = () => {
    if (furnitureFileInputRef.current) {
      furnitureFileInputRef.current.click();
    }
  };

  // Handler for uploading custom furniture.
  const handleFurnitureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const model = {
        id: modelId.toString(),
        src: url,
        position: cursorPos,
        scale: "1 1 1",
        rotation: "0 0 0",
      };
      setModels([...models, model]);
      setModelId(modelId + 1);
    }
  };

  useEffect(() => {
    const savedModelSrc = localStorage.getItem("modelSrc");
    if (savedModelSrc) {
      setModelSrc(savedModelSrc);
    }
  }, []);
  const furnitureMenu = (
    <FurnitureMenu
      items={data}
      onAddItem={handleAddItem}
      onUploadClick={handleFurnitureButtonClick}
      furnitureFileInputRef={furnitureFileInputRef}
      handleFurnitureUpload={handleFurnitureUpload}
      mutate={mutate}
      setSelectedItem={setSelectedItem}
    />
  );
  // Ensure that the model is positioned above the ground.
  const enforceAboveGround = (modelEl) => {
    if (!modelEl) return;
    const mesh = modelEl.getObject3D("mesh");
    if (!mesh) return;
    const box = new THREE.Box3().setFromObject(mesh);
    let floorY = 0;
    let groundHeight = 0.144896;
    if (!modelEl.dataset.initialized) {
      modelEl.dataset.initialMinY = box.min.y;
      modelEl.dataset.initialScaleY = modelEl.object3D.scale.y;
      modelEl.dataset.initialized = "true";
    }
    const initialMinY = parseFloat(modelEl.dataset.initialMinY);
    const initialScaleY = parseFloat(modelEl.dataset.initialScaleY);
    let scaleFactor = modelEl.object3D.scale.y / initialScaleY;
    let adjustedMinY = initialMinY * scaleFactor;
    modelEl.object3D.position.y += floorY + groundHeight - adjustedMinY;
  };

  useEffect(() => {
    models.forEach((model) => {
      const modelEl = document.getElementById(model.id);
      if (modelEl && !modelEl.getAttribute("position-adjusted")) {
        modelEl.addEventListener("model-loaded", () => {
          enforceAboveGround(modelEl);
          modelEl.setAttribute("position-adjusted", "true");
        });
        modelEl.addEventListener("scale-changed", () => {
          enforceAboveGround(modelEl);
        });
      }
    });
  }, [models]);
return (
  <ResponsiveARView
    furnitureMenu={
      <FurnitureMenu
        items={data}
        onAddItem={handleAddItem}
        onUploadClick={handleFurnitureButtonClick}
        furnitureFileInputRef={furnitureFileInputRef}
        handleFurnitureUpload={handleFurnitureUpload}
        mutate={mutate}
        setSelectedItem={setSelectedItem}
      />
    }
    controlMenu={
      showMenu && selectedModelId && menuPosition && (
        <>
          {/* Desktop menu */}
          <div className="hidden md:block absolute top-4 right-4 z-10">
            <ControlMenu
              dimensionsText={dimensionsText}
              dimContainerPos={dimContainerPos}
              showDimensionPopup={showDimensionPopup}
              position={menuPosition}
              onRotate={(dir) => handleRotateItem(selectedModelId, dir)}
              onScale={(dir) => handleScaleItem(selectedModelId, dir)}
              onDuplicate={handleDuplicateItem}
              onDelete={() => handleRemoveItem(selectedModelId)}
              handleShowDimensions={() => handleShowDimensions(selectedModelId)}
              selectedModelId={selectedModelId}
              selectedItem={selectedItem}
              items={data}
              mutate={mutate}
              setMenuPosition={setMenuPosition}
              setQrCodeData={setQrCodeData}
              setShowQRPopup={setShowQRPopup}
              setShowMenu={setShowMenu}
            />
          </div>

          {/* Mobile menu */}
          <div className="block md:hidden">
            <MobileResponsiveControlMenu
              dimensionsText={dimensionsText}
              dimContainerPos={dimContainerPos}
              showDimensionPopup={showDimensionPopup}
              position={menuPosition}
              onRotate={(dir) => handleRotateItem(selectedModelId, dir)}
              onScale={(dir) => handleScaleItem(selectedModelId, dir)}
              onDuplicate={handleDuplicateItem}
              onDelete={() => handleRemoveItem(selectedModelId)}
              handleShowDimensions={() => handleShowDimensions(selectedModelId)}
              selectedModelId={selectedModelId}
              selectedItem={selectedItem}
              items={data}
              mutate={mutate}
              setMenuPosition={setMenuPosition}
              setQrCodeData={setQrCodeData}
              setShowQRPopup={setShowQRPopup}
              setShowMenu={setShowMenu}
            />
          </div>
        </>
      )
    }
    measurementButton={
      <button
        onClick={() => setShowMeasurementTool(!showMeasurementTool)}
        className={`w-44 p-2 rounded-xl border text-sm font-medium shadow transition-all duration-300 ${
          showMeasurementTool
            ? 'bg-mainbackground text-white border-mainbackground'
            : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
        }`}
      >
        📏 Measurement Tool
      </button>
    }
  >
    {/* 🟡 دا المشهد الرئيسي جوا ResponsiveARView */}
    {modelSrc ? (
      <a-scene embedded physics className="w-full h-full rounded-lg shadow-lg">
        {/* المشهد والموديلات */}
        <a-entity gltf-model={modelSrc} position="0 0 0" scale="1 1 1" static-body />
        <a-plane
  id="floor"
  position="0 0 0"
  rotation="-90 0 0"
  width="10"
  height="10"
  opacity="0"
  material="transparent: true"
  className="clickable-floor"
/>

        {models.map((model) => (
          <a-entity
            drag-drop
            key={model.id}
            gltf-model={model.src}
            position={model.position}
            rotation={model.rotation}
            scale={model.scale}
            id={model.id}
            className="clickable-item"
            onClick={(evt) => handleModelClick(evt, model)}
            onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
          />
        ))}

<a-entity id="rig" movement-controls="fly: false" position="0 1.6 4">
  <a-camera
    look-controls="touchEnabled: true; magicWindowTrackingEnabled: false; mouseEnabled: false"
  >
    <a-cursor
      raycaster="objects: .clickable-item, .clickable-floor"
      fuse="false"
      color="#FF0000"
    ></a-cursor>
  </a-camera>
</a-entity>

      </a-scene>
    ) : (
      <img src="/main2Home.jpg" alt="Main Furniture" className="w-full h-full object-cover" />
    )}

    {/* ✅ أداة القياس نفسها */}
    <MeasurementTool
      isVisible={showMeasurementTool}
      setShowMeasurementTool={setShowMeasurementTool}
    />
  </ResponsiveARView>
);

}

{/* <a-camera
  position="0 1.6 4"
  scale="2 2 2"
  look-controls="touchEnabled: true; reverseTouchDrag: false; enabled: true; sensitivity: 0.1"
  wasd-controls="enabled: true"
>
  <a-cursor
    raycaster="objects: .clickable-item, .clickable-floor"
    color="#FF0000"
    fuse="false"
  ></a-cursor>
</a-camera> */}
