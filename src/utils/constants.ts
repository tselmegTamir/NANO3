export const DEMO_SCENE_URL =
  "https://prod.spline.design/Pc7pZxFjsvj2wu3K/scene.splinecode";

export const SPLINE_EVENTS = {
  MOUSE_DOWN: "mouseDown",
  MOUSE_HOVER: "mouseHover",
  MOUSE_UP: "mouseUp",
  KEY_DOWN: "keyDown",
  KEY_UP: "keyUp",
  START: "start",
  LOOK_AT: "lookAt",
  FOLLOW: "follow",
} as const;

export const GSAP_PRESETS = {
  BOUNCE: {
    duration: 0.8,
    ease: "bounce.out",
  },
  ELASTIC: {
    duration: 1.2,
    ease: "elastic.out(1, 0.3)",
  },
  SMOOTH: {
    duration: 1,
    ease: "power2.out",
  },
  FAST: {
    duration: 0.3,
    ease: "power2.inOut",
  },
  SLOW: {
    duration: 2,
    ease: "power1.inOut",
  },
} as const;

export const DEFAULT_OBJECT_NAMES = {
  CUBE: "Cube",
  SPHERE: "Sphere",
  CYLINDER: "Cylinder",
  PLANE: "Plane",
} as const;
