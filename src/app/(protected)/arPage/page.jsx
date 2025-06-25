"use client";
import useGetProducts from "@/hooks/useGetProducts";
import usePostArFile from "@/hooks/usePostArFile";
import useRoomBound from "@/hooks/useRoomBounds";
import FurnitureMenu from "@/components/common/FurnitureMenu"
import ControlMenu from "@/components/common/ControlMenu";
import MeasurementTool from "@/components/common/MeasurementTool";
import MobileResponsiveControlMenu from '@/components/common/MobileResponsiveControlMenu';
import ResponsiveARView from '@/components/common/ResponsiveARView';
import './custom.css';
import Script from 'next/script';

import  { useState, useEffect, useRef } from "react";

export default function Page() {
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
const draggingRef = useRef(false);
const lastTouchRef = useRef({ x: 0, y: 0 });

const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 1, z: 0 });
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  if (typeof window !== 'undefined') {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }
}, []);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AFRAME &&
    !AFRAME.components['custom-touch-look-controls']) {
      AFRAME.registerComponent('custom-touch-look-controls', {
        schema: { enabled: { default: true } },
        init: function () {
          this.touchStart = null;
          this.rotation = { x: 0, y: 0 };
          this.handleTouchStart = this.handleTouchStart.bind(this);
          this.handleTouchMove = this.handleTouchMove.bind(this);
          this.handleTouchEnd = this.handleTouchEnd.bind(this);
        },
        play: function () {
          this.el.sceneEl.canvas.addEventListener('touchstart', this.handleTouchStart);
          this.el.sceneEl.canvas.addEventListener('touchmove', this.handleTouchMove);
          this.el.sceneEl.canvas.addEventListener('touchend', this.handleTouchEnd);
        },
        pause: function () {
          this.el.sceneEl.canvas.removeEventListener('touchstart', this.handleTouchStart);
          this.el.sceneEl.canvas.removeEventListener('touchmove', this.handleTouchMove);
          this.el.sceneEl.canvas.removeEventListener('touchend', this.handleTouchEnd);
        },
        handleTouchStart: function (e) {
          if (e.touches.length === 1) {
            this.touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }
        },
        handleTouchMove: function (e) {
          if (!this.touchStart || e.touches.length !== 1) return;
          const touch = e.touches[0];
          const deltaX = touch.clientX - this.touchStart.x;
          const deltaY = touch.clientY - this.touchStart.y;
          this.rotation.y -= deltaX * 0.002;
          this.rotation.x -= deltaY * 0.002;
          this.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotation.x));
          this.el.object3D.rotation.set(this.rotation.x, this.rotation.y, 0);
          this.touchStart = { x: touch.clientX, y: touch.clientY };
        },
        handleTouchEnd: function () {
          this.touchStart = null;
        }
      });
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

//   if (typeof AFRAME !== "undefined") {
//     if (!AFRAME.components["drag-drop"]) {
//     AFRAME.registerComponent("drag-drop", {
//   schema: {},
//   init: function () {
//     this.dragging = false;
//     this.offset = new AFRAME.THREE.Vector3();
//     this.cameraEl = null;

//     // حفظ مقياس العنصر الأصلي
//     this.originalScale = {
//       x: this.el.object3D.scale.x,
//       y: this.el.object3D.scale.y,
//       z: this.el.object3D.scale.z,
//     };

//     // قيمة إزاحة أسفل العنصر (حسب الباوندينغ بوكس)
//     this.initialBottomOffset = 0;

//     // ربط الدوال عشان نستخدمها كـ event handlers
//     this.onMouseDown = this.onMouseDown.bind(this);
//     this.onMouseMove = this.onMouseMove.bind(this);
//     this.onMouseUp = this.onMouseUp.bind(this);
//     this.onTouchStart = this.onTouchStart.bind(this);
//     this.onTouchMove = this.onTouchMove.bind(this);
//     this.onTouchEnd = this.onTouchEnd.bind(this);

//     // إضافة أحداث الماوس واللمس
//     this.el.addEventListener("mousedown", this.onMouseDown);
//     this.el.addEventListener("touchstart", this.onTouchStart);
//   },

//   // بداية سحب بالماوس
//   onMouseDown: function (evt) {
//     evt.stopPropagation();
//     evt.preventDefault();
//     this.startDrag(evt.detail ? evt.detail.intersection : null);
//     window.addEventListener("mousemove", this.onMouseMove);
//     window.addEventListener("mouseup", this.onMouseUp);
//   },

//   // بداية سحب باللمس
//   onTouchStart: function (evt) {
//     evt.stopPropagation();
//     evt.preventDefault();
//     // في اللمس ممكن يكون evt.touches[0]
//     this.startDrag(evt.detail ? evt.detail.intersection : null);
//     window.addEventListener("touchmove", this.onTouchMove, { passive: false });
//     window.addEventListener("touchend", this.onTouchEnd);
//   },

//   // توحيد بداية السحب (للمس والماوس)
//   startDrag: function (intersection) {
//     this.dragging = true;
//     this.originalScale = {
//       x: this.el.object3D.scale.x,
//       y: this.el.object3D.scale.y,
//       z: this.el.object3D.scale.z,
//     };
//     this.cameraEl = this.el.sceneEl.querySelector("[camera]");
//     if (this.cameraEl && this.cameraEl.components["look-controls"]) {
//       this.cameraEl.components["look-controls"].pause();
//     }
//     if (intersection) {
//       this.offset.copy(this.el.object3D.position).sub(intersection.point);
//       this.offset.y = 0;
//     } else {
//       this.offset.set(0, 0, 0);
//     }
//     const mesh = this.el.getObject3D("mesh");
//     if (mesh) {
//       const bbox = new AFRAME.THREE.Box3().setFromObject(this.el.object3D);
//       this.initialBottomOffset = this.el.object3D.position.y - bbox.min.y;
//     } else {
//       this.initialBottomOffset = 0;
//     }
//   },

//   // تحريك بالماوس
//   onMouseMove: function (evt) {
//     if (!this.dragging) return;
//     evt.preventDefault();
//     this.handleDragMove(evt.clientX, evt.clientY);
//   },

//   // تحريك باللمس
//   onTouchMove: function (evt) {
//     if (!this.dragging) return;
//     evt.preventDefault();
//     // نستخدم أول لمسة
//     const touch = evt.touches[0];
//     this.handleDragMove(touch.clientX, touch.clientY);
//   },

//   // التعامل مع الحركة موحدة
//   handleDragMove: function (clientX, clientY) {
//     const mouse = new AFRAME.THREE.Vector2();
//     mouse.x = (clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(clientY / window.innerHeight) * 2 + 1;

//     const camera = this.el.sceneEl.camera;
//     const raycaster = new AFRAME.THREE.Raycaster();
//     raycaster.setFromCamera(mouse, camera);

//     let intersectionPoint = null;
//     const floorEl = document.getElementById("floor");
//     if (floorEl) {
//       const intersects = raycaster.intersectObject(floorEl.object3D, true);
//       if (intersects.length > 0) {
//         intersectionPoint = intersects[0].point;
//       }
//     }
//     if (!intersectionPoint) {
//       const plane = new AFRAME.THREE.Plane(new AFRAME.THREE.Vector3(0, 1, 0), 0);
//       intersectionPoint = new AFRAME.THREE.Vector3();
//       if (raycaster.ray.intersectPlane(plane, intersectionPoint) === null) return;
//     }

//     const targetPos = intersectionPoint.clone().add(this.offset);

//     // تطبيق حدود الغرفة (لو موجودة)
//     if (window.roomBounds) {
//       const box = new AFRAME.THREE.Box3().setFromObject(this.el.object3D);
//       const halfWidth = (box.max.x - box.min.x) / 2;
//       const halfDepth = (box.max.z - box.min.z) / 2;
//       const wallThickness = 0.5;
//       const backMargin = 0.2;

//       targetPos.x = Math.min(
//         Math.max(targetPos.x, window.roomBounds.minX + halfWidth),
//         window.roomBounds.maxX - halfWidth
//       );
//       targetPos.z = Math.min(
//         Math.max(targetPos.z, window.roomBounds.minZ + wallThickness + halfDepth + backMargin),
//         window.roomBounds.maxZ - halfDepth
//       );
//     } else {
//       // حدود أمان افتراضية
//       const safeBoundary = 3.5;
//       targetPos.x = Math.max(-safeBoundary, Math.min(targetPos.x, safeBoundary));
//       targetPos.z = Math.max(-safeBoundary, Math.min(targetPos.z, safeBoundary));
//     }

//     // ثبّت الارتفاع y (عشان العنصر على الأرض)
//     targetPos.y = this.el.object3D.position.y;

//     this.el.setAttribute("position", `${targetPos.x} ${targetPos.y} ${targetPos.z}`);

//     // ارجع مقياس العنصر الأصلي
//     this.el.object3D.scale.set(
//       this.originalScale.x,
//       this.originalScale.y,
//       this.originalScale.z
//     );
//   },

//   // نهاية سحب الماوس
//   onMouseUp: function (evt) {
//     this.endDrag();
//     window.removeEventListener("mousemove", this.onMouseMove);
//     window.removeEventListener("mouseup", this.onMouseUp);
//   },

//   // نهاية سحب اللمس
//   onTouchEnd: function (evt) {
//     this.endDrag();
//     window.removeEventListener("touchmove", this.onTouchMove);
//     window.removeEventListener("touchend", this.onTouchEnd);
//   },

//   // توحيد نهاية السحب
//   endDrag: function () {
//     this.dragging = false;
//     if (this.cameraEl && this.cameraEl.components["look-controls"]) {
//       this.cameraEl.components["look-controls"].play();
//     }
//   },

//   // تنظيف الحدث
//   remove: function () {
//     this.el.removeEventListener("mousedown", this.onMouseDown);
//     this.el.removeEventListener("touchstart", this.onTouchStart);
//     window.removeEventListener("mousemove", this.onMouseMove);
//     window.removeEventListener("mouseup", this.onMouseUp);
//     window.removeEventListener("touchmove", this.onTouchMove);
//     window.removeEventListener("touchend", this.onTouchEnd);
//   },
// });

//     }

//     // Updated bounding-box-helper using THREE.Box3Helper
//     if (!AFRAME.components["bounding-box-helper"]) {
//       AFRAME.registerComponent("bounding-box-helper", {
//         schema: {
//           // Default color set to bastel green.
//           color: { type: "color", default: "#4CAF50" },
//         },
//         init: function () {
//           // Create a Box3 to compute the object's bounding box.
//           this.box = new THREE.Box3();
//           // Create a Box3Helper that visualizes the computed box.
//           this.helper = new THREE.Box3Helper(this.box, this.data.color);
//           this.el.sceneEl.object3D.add(this.helper);
//         },
//         tick: function () {
//           if (this.helper) {
//             // Ensure the object's world matrices are up-to-date.
//             this.el.object3D.updateMatrixWorld(true);
//             // Recompute the bounding box.
//             this.box.setFromObject(this.el.object3D);
//             // Display helper as long as the box is not empty.
//             this.helper.visible = !this.box.isEmpty();
//           }
//         },
//         remove: function () {
//           if (this.helper) {
//             this.el.sceneEl.object3D.remove(this.helper);
//             this.helper = null;
//           }
//         },
//       });
//     }
//   }

if (typeof AFRAME !== "undefined" && !AFRAME.components["drag-drop"]) {
  AFRAME.registerComponent("drag-drop", {
    init: function () {
      this.dragging = false;
      this.offset = new AFRAME.THREE.Vector3();
      this.raycaster = new AFRAME.THREE.Raycaster();
      this.mouse = new AFRAME.THREE.Vector2();
      this.cameraEl = this.el.sceneEl.camera.el || this.el.sceneEl.querySelector("[camera]");
      this.plane = new AFRAME.THREE.Plane(new AFRAME.THREE.Vector3(0, 1, 0), 0); // أرضية XZ

      // Bind handlers
      this.onPointerDown = this.onPointerDown.bind(this);
      this.onPointerMove = this.onPointerMove.bind(this);
      this.onPointerUp = this.onPointerUp.bind(this);

      this.el.addEventListener("pointerdown", this.onPointerDown);
      window.addEventListener("pointermove", this.onPointerMove);
      window.addEventListener("pointerup", this.onPointerUp);
    },

    onPointerDown: function (evt) {
      evt.preventDefault();
      // Raycast من نقطة اللمس/الفأرة
      const rect = this.el.sceneEl.canvas.getBoundingClientRect();
      const x = (evt.clientX - rect.left) / rect.width * 2 - 1;
      const y = -((evt.clientY - rect.top) / rect.height) * 2 + 1;

      this.mouse.set(x, y);
      this.raycaster.setFromCamera(this.mouse, this.el.sceneEl.camera);

      // تحقق تقاطع مع هذا العنصر
      const intersects = this.raycaster.intersectObject(this.el.object3D, true);
      if (intersects.length > 0) {
        this.dragging = true;
        // حساب إزاحة النقطة الملموسة من مركز العنصر
        this.intersectionPoint = intersects[0].point;
        this.offset.copy(this.el.object3D.position).sub(this.intersectionPoint);
      }
    },

    onPointerMove: function (evt) {
      if (!this.dragging) return;
      evt.preventDefault();

      const rect = this.el.sceneEl.canvas.getBoundingClientRect();
      const x = (evt.clientX - rect.left) / rect.width * 2 - 1;
      const y = -((evt.clientY - rect.top) / rect.height) * 2 + 1;

      this.mouse.set(x, y);
      this.raycaster.setFromCamera(this.mouse, this.el.sceneEl.camera);

      // نقطع المستوى الأرضي (XZ plane)
      const intersection = new AFRAME.THREE.Vector3();
      if (this.raycaster.ray.intersectPlane(this.plane, intersection)) {
        const newPos = intersection.clone().add(this.offset);
        // تثبيت ارتفاع Y
        newPos.y = this.el.object3D.position.y;
        this.el.object3D.position.copy(newPos);
      }
    },

    onPointerUp: function (evt) {
      if (this.dragging) {
        evt.preventDefault();
        this.dragging = false;
      }
    },

    remove: function () {
      this.el.removeEventListener("pointerdown", this.onPointerDown);
      window.removeEventListener("pointermove", this.onPointerMove);
      window.removeEventListener("pointerup", this.onPointerUp);
    },
  });
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
        { <a-plane
  id="floor"
  position="0 0 0"
  rotation="-90 0 0"
  width="10"
  height="10"
  opacity="0"
  material="transparent: true"
  class="clickable-floor"
></a-plane>
}

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
            // onTouchStart={handleTouchStart}
            // onTouchMove={handleTouchMove}
            // onTouchEnd={handleTouchEnd}
          />
        ))}
<Script src="https://unpkg.com/aframe-joystick-controls@4.0.1/dist/aframe-joystick-controls.min.js" />

<a-entity
  id="rig"
  movement-controls="enabled: true; fly: false"
  joystick-controls="mode: joystick; joySticky: true"
  position="0 1.6 4"
>
  {isMobile ? (

   <a-camera
  position="0 0 0"
  custom-touch-look-controls
  look-controls="enabled: false"
  wasd-controls="enabled: false"
>
  <a-cursor
    rayOrigin="entity"
    raycaster="objects: .clickable-item, .clickable-floor"
    fuse="false"
    material="color: red"
    position="0 0 -1.5"
    scale="2 2 2"
  ></a-cursor>
</a-camera>

  ) : (
    
    <a-camera
  position="0 0 0"
  scale="2 2 2"
  look-controls="touchEnabled: true; reverseTouchDrag: false; enabled: true; sensitivity: 0.1"
  wasd-controls="enabled: true"
>
  <a-cursor
    rayOrigin="entity"
    raycaster="objects: .clickable-item, .clickable-floor"
    material="color: red"
    fuse="false"
    position="0 0 -1.5"
     scale="2 2 2"
  ></a-cursor>
</a-camera>

  )}
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


