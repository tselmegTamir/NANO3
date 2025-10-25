export interface SplineObject {
  name: string;
  id: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  scale: {
    x: number;
    y: number;
    z: number;
  };
  material?: any;
  emitEvent?: (eventName: string) => void;
}

export interface SplineApp {
  findObjectByName: (name: string) => SplineObject | null;
  findObjectById: (id: string) => SplineObject | null;
  emitEvent: (eventName: string, nameOrUuid: string) => void;
  emitEventReverse: (eventName: string, nameOrUuid: string) => void;
  setZoom: (zoom: number) => void;
}

export type SplineEventName =
  | "mouseDown"
  | "mouseHover"
  | "mouseUp"
  | "keyDown"
  | "keyUp"
  | "start"
  | "lookAt"
  | "follow";

export interface SplineEvent {
  target: SplineObject;
  type: string;
}

export interface SplineSceneProps {
  sceneUrl: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: (spline: SplineApp) => void;
  enableControls?: boolean;
  autoRotate?: boolean;
}
