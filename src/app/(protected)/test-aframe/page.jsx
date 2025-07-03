'use client';

import React, { useEffect } from 'react';

const TestAFrame = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('aframe').catch(console.error);
        }
    }, []);

    return (
        <a-scene style={{ width: '100vw', height: '100vh' }}>
            {/* كاميرا مع cursor */}
            <a-camera>
                <a-cursor />
            </a-camera>
            <a-entity
                gltf-model="/white-room1.glb"
                position="0 1 -3"
                rotation="0 45 0"
                scale="1 1 1"
            ></a-entity>


            {/* ضوء */}
            <a-light type="ambient" color="#445451" />
            <a-light type="point" intensity="2" position="2 4 4" />

            {/* مكعب يدور */}
            <a-box
                position="0 1.5 -3"
                rotation="0 45 0"
                color="#4CC3D9"
                animation="property: rotation; to: 0 405 0; loop: true; dur: 8000"
            />

            {/* أرضية */}
            <a-plane
                position="0 0 -4"
                rotation="-90 0 0"
                width="10"
                height="10"
                color="#7BC8A4"
            />

            {/* سماوات */}
            <a-sky color="#ECECEC" />
        </a-scene>
    );
};

export default TestAFrame;
