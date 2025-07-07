import * as THREE from 'three';
import {
  particleFragmentShader,
  particleVertexShader,
} from './shaders/particleShaders';

interface ParticleSystemReturn {
  mesh: THREE.Points;
  update: (time: number, mousePosition: { x: number; y: number }) => void;
  handleResize: () => void;
  cleanup: () => void;
}

export const createParticleSystem = (
  particleCount = 2000
): ParticleSystemReturn => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    positions[i3] = (Math.random() - 0.5) * 20;
    positions[i3 + 1] = (Math.random() - 0.5) * 20;
    positions[i3 + 2] = (Math.random() - 0.5) * 20;

    // Colors
    colors[i3] = Math.random() * 0.3; // R
    colors[i3 + 1] = Math.random() * 0.4 + 0.1; // G
    colors[i3 + 2] = Math.random() * 0.6 + 0.4; // B

    // Sizes
    sizes[i] = Math.random() * 2 + 0.5;

    // Velocities
    velocities[i3] = (Math.random() - 0.5) * 0.01;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      mouse: { value: new THREE.Vector2(0, 0) },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    },
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    transparent: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
  });

  const mesh = new THREE.Points(geometry, material);

  return {
    mesh,
    update: (time: number, mousePosition: { x: number; y: number }) => {
      material.uniforms.time.value = time;
      material.uniforms.mouse.value.set(mousePosition.x, mousePosition.y);
      mesh.rotation.y = time * 0.02;
    },
    handleResize: () => {
      material.uniforms.resolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    },
    cleanup: () => {
      geometry.dispose();
      material.dispose();
    },
  };
};
