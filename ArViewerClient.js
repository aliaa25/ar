"use client";
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ArViewerClient() {
    const viewerRef = useRef(null);
    const [modelUrl, setModelUrl] = useState('');
    const [modelName, setModelName] = useState('');
    const [error, setError] = useState('');
    const [isARSupported, setIsARSupported] = useState(false);

    const searchParams = useSearchParams();

    useEffect(() => {
        const loadModelViewer = () => {
            if (!document.querySelector('script[src*="model-viewer"]')) {
                const script = document.createElement('script');
                script.type = 'module';
                script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
                document.head.appendChild(script);
            }
        };

        loadModelViewer();

        const model = searchParams.get('model');
        const name = searchParams.get('name');

        if (model) {
            setModelUrl(decodeURIComponent(model));
            setModelName(decodeURIComponent(name || '3D Model'));
        } else {
            setError('Model URL not found');
        }

        checkARSupport();
    }, [searchParams]);

    const checkARSupport = async () => {
        try {
            if ('xr' in navigator) {
                const isSupported = await navigator.xr.isSessionSupported('immersive-ar');
                setIsARSupported(isSupported);
            } else {
                setIsARSupported(false);
            }
        } catch (err) {
            console.log('AR not supported:', err);
            setIsARSupported(false);
        }
    };

    const handleModelError = (e) => {
        console.error('Model loading error:', e);
        setError('Failed to load 3D model');
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div className="text-4xl mb-2">❌</div>
                    <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Model</h2>
                    <p className="text-sm text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="text-2xl">🥽</div>
                    <div>
                        <h1 className="text-lg font-bold">AR Viewer</h1>
                        <p className="text-sm text-gray-500">{modelName}</p>
                    </div>
                </div>
                <button
                    onClick={() => window.history.back()}
                    className="bg-gray-100 px-3 py-2 rounded-full text-sm hover:bg-gray-200"
                >
                    Back
                </button>
            </header>

            {!isARSupported && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 m-4">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">⚠️</span>
                        <div>
                            <h3 className="font-semibold text-yellow-800">AR Not Supported</h3>
                            <p className="text-yellow-700 text-sm">
                                Your device or browser doesn&apos;t support AR. You can still view the model in 3D.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full">
                    {modelUrl && (
                        <div className="relative w-full">
                            <model-viewer
                                ref={viewerRef}
                                src={modelUrl}
                                alt={modelName}
                                ar
                                ar-modes="webxr scene-viewer quick-look"
                                ar-placement="floor"
                                camera-controls
                                touch-action="pan-y"
                                camera-orbit="0deg 90deg 2.5m"
                                min-camera-orbit="auto auto 2.5m"
                                max-camera-orbit="auto auto 2.5m"
                                camera-target="0m 0m 0m"
                                field-of-view="40deg"
                                environment-image="neutral"
                                exposure="1.2"
                                shadow-intensity="1"
                                shadow-softness="0.5"
                                loading="eager"
                                reveal="auto"
                                disable-zoom
                                disable-pan
    style={{
        width: '100%',
        height: '70vh',
        minHeight: '400px',
        backgroundColor: '#f8fafc'
    }}
                                onError={handleModelError}
                            >
                                <button
                                    slot="ar-button"
                                    className="absolute bottom-4 right-4 bg-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                >
                                    <span className="text-lg">🥽</span> View in AR
                                </button>
                                <div
                                    slot="progress-bar"
                                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"
                                ></div>
                            </model-viewer>
                        </div>
                    )}
                </div>
            </main>

            <footer className="text-center text-sm text-gray-500 py-4">
                <p>📱 Android: Chrome 81+ with ARCore | 🍎 iOS: Safari 13+ with ARKit</p>
                <p className="mt-1">For best experience, use modern devices with good lighting</p>
            </footer>
        </div>
    );
}
