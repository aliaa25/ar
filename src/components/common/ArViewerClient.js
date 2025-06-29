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
        // Load model-viewer script dynamically
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

            // ابعد الكاميرا بعد تحميل الموديل (Zoom Out)
            setTimeout(() => {
                viewerRef.current?.setAttribute('camera-orbit', '0deg 75deg 3m');
            }, 500); // تأخير بسيط لانتظار تحميل الموديل
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
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Loading Error</h1>
                    <p className="text-gray-700 mb-6">{error}</p>
                    <button 
                        onClick={() => window.history.back()}
                        className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-mainbackground to-purple-100">
            {/* Header */}
            <div className="bg-white shadow-lg p-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl">🥽</div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">AR Viewer</h1>
                            <p className="text-sm text-gray-600">{modelName}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => window.history.back()}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors"
                    >
                        Back
                    </button>
                </div>
            </div>

            {/* AR Support Warning */}
            {!isARSupported  && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 m-4">
                    <div className="flex items-center">
                        <div className="text-2xl mr-3">⚠️</div>
                        <div>
                            <h3 className="font-semibold text-yellow-800">Warning: AR Not Supported</h3>
                            <p className="text-yellow-700 text-sm">
                                Your device or browser does not support AR. You can still view the model in 3D mode.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Model Viewer Container */}
            <div className="p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Model Viewer */}
                        {modelUrl && (
                            <div className="relative">
                                <model-viewer
                                    ref={viewerRef}
                                    src={modelUrl}
                                    alt={modelName}
                                    ar
                                    ar-modes="webxr scene-viewer quick-look"
                                    ar-placement="floor"
                                    camera-controls
                                    touch-action="pan-y"
                                    environment-image="neutral"
                                    shadow-intensity="1"
                                    shadow-softness="0.5"
                                    style={{
                                        width: '100%',
                                        height: '70vh',
                                        minHeight: '400px',
                                        backgroundColor: '#f8fafc'
                                    }}
                                    onError={handleModelError}
                                    loading="eager"
                                    reveal="auto"
                                >
                                    {/* AR Button */}
                                    <button 
                                        slot="ar-button"
                                        className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                    >
                                        <span className="text-xl">🥽</span>
                                        View in AR
                                    </button>

                                    {/* Progress Bar */}
                                    <div 
                                        slot="progress-bar" 
                                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform-gpu origin-left scale-x-0 transition-transform duration-300"
                                    ></div>
                                </model-viewer>
                            </div>
                        )}

                        {/* Controls Panel */}
                        <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Model Info */}
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                        <span className="text-lg">📦</span>
                                        Model Information
                                    </h3>
                                    <p className="text-sm text-gray-600">{modelName}</p>
                                </div>

                                {/* AR Instructions */}
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                        <span className="text-lg">📱</span>
                                        How to Use
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Tap the AR button to view the model in your real environment
                                    </p>
                                </div>

                                {/* Browser Support */}
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                        <span className="text-lg">🌐</span>
                                        Support Status
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        {isARSupported ? (
                                            <>
                                                <span className="text-green-500">✅</span>
                                                <span className="text-sm text-green-600">Supported</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-red-500">❌</span>
                                                <span className="text-sm text-red-600">Not Supported</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Additional Controls */}
                            <div className="mt-6 flex flex-wrap gap-3 justify-center">
                                <button 
                                    onClick={() => viewerRef.current?.resetCamera()}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors flex items-center gap-2"
                                >
                                    <span>🔄</span>
                                    Reset Camera
                                </button>
                            
                                <button 
                                    onClick={() => {
                                        if (navigator.share && modelUrl) {
                                            navigator.share({
                                                title: `${modelName} - AR View`,
                                                text: `Check out this 3D model in AR!`,
                                                url: window.location.href
                                            });
                                        } else {
                                            navigator.clipboard.writeText(window.location.href);
                                            alert('Link copied to clipboard!');
                                        }
                                    }}
                                    className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-600 transition-colors flex items-center gap-2"
                                >
                                    <span>📤</span>
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t mt-8 p-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="font-semibold text-gray-800 mb-3">Device Requirements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-lg">📱</span>
                            <span>Android: Chrome 81+ with ARCore support</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-lg">🍎</span>
                            <span>iOS: Safari 13+ with ARKit support</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                        For the best AR experience, make sure your device supports WebXR and has adequate lighting.
                    </p>
                </div>
            </div>
        </div>
    );
}
