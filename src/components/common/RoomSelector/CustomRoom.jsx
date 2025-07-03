'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CustomRoom = () => {
  const [wallColor, setWallColor] = useState('#ffffff');
  const [floorColor, setFloorColor] = useState('#cccccc');
  const [aframeLoaded, setAframeLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('aframe')
        .then(() => {
          setAframeLoaded(true);
          console.log('A-Frame from npm loaded');
        })
        .catch((err) => {
          console.error('A-Frame failed to load:', err);
        });
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-6 py-8">
      <h2 className="text-2xl font-bold text-center text-white">Customize Your Interactive Room</h2>

      <div className="flex flex-wrap justify-center gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-white">
          Wall Color:
          <input
            type="color"
            value={wallColor}
            onChange={(e) => setWallColor(e.target.value)}
            className="h-8 w-12 rounded border border-gray-300 cursor-pointer"
          />
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-white">
          Floor Color:
          <input
            type="color"
            value={floorColor}
            onChange={(e) => setFloorColor(e.target.value)}
            className="h-8 w-12 rounded border border-gray-300 cursor-pointer"
          />
        </label>
      </div>

      <div className="w-full max-w-5xl h-[500px] mt-6 border rounded-xl overflow-hidden shadow-xl">
        {aframeLoaded && (
          <a-scene embedded vr-mode-ui="enabled: false">
            {/* Floor */}
            <a-plane
              position="0 0 0"
              rotation="-90 0 0"
              width="6"
              height="6"
              color={floorColor}
              shadow
            ></a-plane>

            {/* Walls */}
            <a-plane position="0 1.5 -3" rotation="0 0 0" width="6" height="3" color={wallColor}></a-plane>
            <a-plane position="-3 1.5 0" rotation="0 90 0" width="6" height="3" color={wallColor}></a-plane>
            <a-plane position="3 1.5 0" rotation="0 -90 0" width="6" height="3" color={wallColor}></a-plane>
            <a-plane position="0 1.5 3" rotation="0 180 0" width="6" height="3" color={wallColor}></a-plane>

            {/* Lighting & Environment */}
            <a-light type="ambient" color="#ffffff"></a-light>
            <a-light type="directional" intensity="0.8" position="2 4 1" castShadow></a-light>
            <a-sky color="#f0f4f8"></a-sky>
          </a-scene>
        )}
      </div>
      <button
        onClick={() => {
          const roomSettings = {
            wallColor,
            floorColor,
          };
          localStorage.setItem('customRoomSettings', JSON.stringify(roomSettings));
          toast.success('Room settings saved successfully!');
        }}
        className="mt-4 px-6 py-2 rounded-full bg-[#0d4c3e] text-white hover:bg-[#0a3f34] transition"
      >
        Save Room Settings
      </button>

    </div>
  );
};

export default CustomRoom;
