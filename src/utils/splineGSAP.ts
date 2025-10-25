import { gsap } from "gsap";
import { SplineObject } from "@/types/spline";

// Animation configuration interface
interface GSAPAnimationConfig {
  duration?: number;
  ease?: string;
  delay?: number;
  onComplete?: () => void;
}

// Main animation function with comprehensive options
export const animateObjectWithGSAP = (
  object: SplineObject,
  options: {
    position?: { x?: number; y?: number; z?: number };
    rotation?: { x?: number; y?: number; z?: number };
    scale?: { x?: number; y?: number; z?: number };
    duration?: number;
    ease?: string;
    delay?: number;
    onComplete?: () => void;
  }
) => {
  const timeline = gsap.timeline();

  if (options.position) {
    timeline.to(
      object.position,
      {
        ...options.position,
        duration: options.duration || 1,
        ease: options.ease || "power2.out",
        delay: options.delay || 0,
      },
      0
    );
  }

  if (options.rotation) {
    timeline.to(
      object.rotation,
      {
        ...options.rotation,
        duration: options.duration || 1,
        ease: options.ease || "power2.out",
        delay: options.delay || 0,
      },
      0
    );
  }

  if (options.scale) {
    timeline.to(
      object.scale,
      {
        ...options.scale,
        duration: options.duration || 1,
        ease: options.ease || "power2.out",
        delay: options.delay || 0,
      },
      0
    );
  }

  if (options.onComplete) {
    timeline.call(options.onComplete);
  }

  return timeline;
};

// Helper function to animate Spline objects with GSAP
export const animateSplineObject = (
  object: SplineObject,
  properties: gsap.TweenVars
) => {
  return gsap.to(object, properties);
};

// Create timeline for complex animations
export const createSplineTimeline = () => {
  return gsap.timeline();
};

// Animate object position
export const animatePosition = (
  object: SplineObject,
  position: { x?: number; y?: number; z?: number },
  duration: number = 1,
  ease: string = "power2.out"
) => {
  return gsap.to(object.position, {
    ...position,
    duration,
    ease,
  });
};

// Animate object rotation
export const animateRotation = (
  object: SplineObject,
  rotation: { x?: number; y?: number; z?: number },
  duration: number = 1,
  ease: string = "power2.out"
) => {
  return gsap.to(object.rotation, {
    ...rotation,
    duration,
    ease,
  });
};

// Animate object scale
export const animateScale = (
  object: SplineObject,
  scale: { x?: number; y?: number; z?: number },
  duration: number = 1,
  ease: string = "power2.out"
) => {
  return gsap.to(object.scale, {
    ...scale,
    duration,
    ease,
  });
};

// Animation presets for common Spline object animations
export const ANIMATION_PRESETS = {
  fadeIn: {
    opacity: 1,
    duration: 1,
    ease: "power2.out",
  },
  fadeOut: {
    opacity: 0,
    duration: 1,
    ease: "power2.in",
  },
  bounceIn: {
    scale: { x: 1, y: 1, z: 1 },
    duration: 0.8,
    ease: "back.out(1.7)",
  },
  slideUp: {
    y: "+=100",
    duration: 1,
    ease: "power2.out",
  },
  rotate360: {
    rotation: { y: "+=360" },
    duration: 2,
    ease: "power2.inOut",
  },
};
