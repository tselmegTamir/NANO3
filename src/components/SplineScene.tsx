"use client";

import { useRef, useEffect, useState } from "react";
import { SplineSceneProps, SplineApp } from "@/types/spline";

// @ts-ignore
import Spline from "@splinetool/react-spline";

export default function SplineScene({
  sceneUrl,
  className = "",
  style,
  onLoad,
  enableControls = true,
  autoRotate = false,
}: SplineSceneProps) {
  const splineApp = useRef<SplineApp | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSplineLoad = (spline: any) => {
    splineApp.current = spline;
    setIsLoaded(true);
    console.log("Spline scene loaded successfully");

    if (onLoad) {
      onLoad(spline);
    }
  };

  const handleSplineError = (error: any) => {
    console.error("Spline scene failed to load:", error);
  };

  return (
    <div className={`spline-container ${className}`} style={style}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading 3D Scene...</p>
          </div>
        </div>
      )}

      <Spline
        scene={sceneUrl}
        onLoad={handleSplineLoad}
        onError={handleSplineError}
        className="w-full h-full"
      />

      {isLoaded && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded text-sm">
          Scene Loaded ✓
        </div>
      )}
    </div>
  );
}
