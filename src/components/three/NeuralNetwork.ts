import * as THREE from 'three';

interface NeuralNetworkReturn {
  mesh: THREE.LineSegments;
  update: (time: number) => void;
  cleanup: () => void;
}

export const createNeuralNetwork = (lineCount = 100): NeuralNetworkReturn => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(lineCount * 6);

  for (let i = 0; i < lineCount * 6; i += 6) {
    positions[i] = (Math.random() - 0.5) * 15;
    positions[i + 1] = (Math.random() - 0.5) * 15;
    positions[i + 2] = (Math.random() - 0.5) * 15;
    positions[i + 3] = (Math.random() - 0.5) * 15;
    positions[i + 4] = (Math.random() - 0.5) * 15;
    positions[i + 5] = (Math.random() - 0.5) * 15;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.LineBasicMaterial({
    color: 0x1a1a2e,
    transparent: true,
    opacity: 0.1,
  });

  const mesh = new THREE.LineSegments(geometry, material);

  return {
    mesh,
    update: (time: number) => {
      mesh.rotation.z = time * 0.01;
    },
    cleanup: () => {
      geometry.dispose();
      material.dispose();
    },
  };
};
