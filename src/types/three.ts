import * as THREE from 'three';

export interface ThreeSceneRefs {
  scene: THREE.Scene | null;
  renderer: THREE.WebGLRenderer | null;
  camera: THREE.PerspectiveCamera | null;
  frameId: number;
}

export interface ParticleSystemProps {
  particleCount?: number;
  mousePosition: { x: number; y: number };
}

export interface ShaderUniforms {
  time: { value: number };
  mouse: { value: THREE.Vector2 };
  resolution: { value: THREE.Vector2 };
  opacity?: { value: number };
}
