
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export default function useRoomBounds() {
  useEffect(() => {
    async function computeRoomBounds() {
      const loader = new GLTFLoader();
      const modelSrc = localStorage.getItem("modelSrc");
      if (!modelSrc) return;
      loader.load(modelSrc, (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const wallThickness = 0.5;
        const floorThickness = 0.2;
        const ceilingThickness = 0.2;

        window.roomBounds = {
          minX: box.min.x,
          maxX: box.max.x,
          minZ: box.min.z,
          maxZ: box.max.z,
          internalWidth: box.max.x - box.min.x - 2 * wallThickness,
          internalDepth: box.max.z - box.min.z - 2 * wallThickness,
          internalHeight: box.max.y - box.min.y - floorThickness - ceilingThickness,
        };
      });
    }
    computeRoomBounds();
  }, []);
}