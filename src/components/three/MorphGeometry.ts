import * as THREE from 'three';
import {
  morphFragmentShader,
  morphVertexShader,
} from './shaders/particleShaders';

interface MorphGeometryReturn {
  mesh: THREE.Mesh;
  update: (time: number, mousePosition: { x: number; y: number }) => void;
  cleanup: () => void;
}

export const createMorphGeometry = (): MorphGeometryReturn => {
  const geometry = new THREE.IcosahedronGeometry(3, 2);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      mouse: { value: new THREE.Vector2(0, 0) },
      opacity: { value: 0.05 },
    },
    vertexShader: morphVertexShader,
    fragmentShader: morphFragmentShader,
    transparent: true,
    wireframe: true,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);

  return {
    mesh,
    update: (time: number, mousePosition: { x: number; y: number }) => {
      material.uniforms.time.value = time;
      material.uniforms.mouse.value.set(mousePosition.x, mousePosition.y);
      mesh.rotation.x = time * 0.05;
      mesh.rotation.y = time * 0.08;
    },
    cleanup: () => {
      geometry.dispose();
      material.dispose();
    },
  };
};
