'use client';

import React, { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';
import { useMousePosition } from '../../hooks/useMousePosition';

const ThreeBackground: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene | null;
    renderer: THREE.WebGLRenderer | null;
    camera: THREE.PerspectiveCamera | null;
    frameId: number;
    objects: {
      neuralNetwork: THREE.Group;
      codeMatrix: THREE.Group;
      geometricShapes: THREE.Group;
      dataStreams: THREE.Group[];
    };
  }>({
    scene: null,
    renderer: null,
    camera: null,
    frameId: 0,
    objects: {
      neuralNetwork: new THREE.Group(),
      codeMatrix: new THREE.Group(),
      geometricShapes: new THREE.Group(),
      dataStreams: [],
    },
  });

  const mousePosition = useMousePosition();

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 10, 100);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);

    camera.position.set(0, 0, 15);

    sceneRef.current.scene = scene;
    sceneRef.current.renderer = renderer;
    sceneRef.current.camera = camera;

    createNeuralNetwork(scene, sceneRef.current.objects);
    createCodeMatrix(scene, sceneRef.current.objects);
    createGeometricShapes(scene, sceneRef.current.objects);
    createDataStreams(scene, sceneRef.current.objects);
    createInteractiveElements(scene, sceneRef.current.objects);

    const animate = () => {
      sceneRef.current.frameId = requestAnimationFrame(animate);

      if (!scene || !camera || !renderer) return;

      const time = Date.now() * 0.001;

      updateNeuralNetwork(
        sceneRef.current.objects.neuralNetwork,
        time,
        mousePosition
      );
      updateCodeMatrix(sceneRef.current.objects.codeMatrix, time);
      updateGeometricShapes(
        sceneRef.current.objects.geometricShapes,
        time,
        mousePosition
      );
      updateDataStreams(sceneRef.current.objects.dataStreams, time);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!camera || !renderer) return;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (sceneRef.current.frameId) {
        cancelAnimationFrame(sceneRef.current.frameId);
      }

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
});

function createNeuralNetwork(scene: THREE.Scene, objects: any) {
  const neuralNetwork = new THREE.Group();
  const nodeCount = 50;
  const nodes: THREE.Vector3[] = [];

  for (let i = 0; i < nodeCount; i++) {
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 6),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.8, 0.5),
        transparent: true,
        opacity: 0.8,
      })
    );

    node.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10
    );

    nodes.push(node.position.clone());
    neuralNetwork.add(node);
  }

  const connectionGeometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  const colors: number[] = [];

  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const distance = nodes[i].distanceTo(nodes[j]);
      if (distance < 3) {
        positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
        positions.push(nodes[j].x, nodes[j].y, nodes[j].z);

        const color = new THREE.Color().setHSL(0.6, 0.8, 0.3);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
      }
    }
  }

  connectionGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
  );
  connectionGeometry.setAttribute(
    'color',
    new THREE.Float32BufferAttribute(colors, 3)
  );

  const connectionMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.3,
  });

  const connections = new THREE.LineSegments(
    connectionGeometry,
    connectionMaterial
  );
  neuralNetwork.add(connections);

  scene.add(neuralNetwork);
  objects.neuralNetwork = neuralNetwork;
}

function createCodeMatrix(scene: THREE.Scene, objects: any) {
  const codeMatrix = new THREE.Group();
  const matrixSize = 30;

  for (let i = 0; i < matrixSize; i++) {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d')!;

    context.fillStyle = '#000000';
    context.fillRect(0, 0, 32, 32);
    context.fillStyle = `hsl(${180 + Math.random() * 60}, 80%, 50%)`;
    context.font = '20px monospace';
    context.textAlign = 'center';
    context.fillText(
      ['0', '1', '{', '}', '<', '>', '/', '*'][Math.floor(Math.random() * 8)],
      16,
      20
    );

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.6,
    });

    const geometry = new THREE.PlaneGeometry(0.5, 0.5);
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15
    );

    mesh.userData = {
      speed: 0.5 + Math.random() * 1,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    };

    codeMatrix.add(mesh);
  }

  scene.add(codeMatrix);
  objects.codeMatrix = codeMatrix;
}

function createGeometricShapes(scene: THREE.Scene, objects: any) {
  const geometricShapes = new THREE.Group();

  const geometries = [
    new THREE.TetrahedronGeometry(1),
    new THREE.OctahedronGeometry(1),
    new THREE.IcosahedronGeometry(1),
    new THREE.DodecahedronGeometry(1),
  ];

  for (let i = 0; i < 8; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.5 + Math.random() * 0.3, 0.8, 0.4),
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    );

    mesh.userData = {
      rotationX: (Math.random() - 0.5) * 0.02,
      rotationY: (Math.random() - 0.5) * 0.02,
      rotationZ: (Math.random() - 0.5) * 0.02,
      scale: 0.5 + Math.random() * 1.5,
    };

    geometricShapes.add(mesh);
  }

  scene.add(geometricShapes);
  objects.geometricShapes = geometricShapes;
}

function createDataStreams(scene: THREE.Scene, objects: any) {
  const streams: THREE.Group[] = [];

  for (let i = 0; i < 5; i++) {
    const stream = new THREE.Group();
    const streamLength = 20;

    for (let j = 0; j < streamLength; j++) {
      const particle = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 6, 4),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(
            0.5,
            1,
            0.5 + (j / streamLength) * 0.5
          ),
          transparent: true,
          opacity: 0.8,
        })
      );

      particle.position.set(
        Math.sin(j * 0.5) * 2,
        j * 0.3,
        Math.cos(j * 0.5) * 2
      );

      stream.add(particle);
    }

    stream.position.set(
      (Math.random() - 0.5) * 20,
      -10,
      (Math.random() - 0.5) * 10
    );

    stream.userData = {
      speed: 0.05 + Math.random() * 0.1,
      direction: new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        1,
        (Math.random() - 0.5) * 0.1
      ).normalize(),
    };

    scene.add(stream);
    streams.push(stream);
  }

  objects.dataStreams = streams;
}

function createInteractiveElements(scene: THREE.Scene, objects: any) {}

function updateNeuralNetwork(
  neuralNetwork: THREE.Group,
  time: number,
  mousePosition: { x: number; y: number }
) {
  neuralNetwork.rotation.y = time * 0.05;
  neuralNetwork.rotation.x = Math.sin(time * 0.1) * 0.1;

  neuralNetwork.position.x = mousePosition.x * 2;
  neuralNetwork.position.y = mousePosition.y * 1;

  neuralNetwork.children.forEach((child, index) => {
    if (
      child instanceof THREE.Mesh &&
      child.geometry instanceof THREE.SphereGeometry
    ) {
      child.scale.setScalar(1 + Math.sin(time * 2 + index) * 0.2);
      const material = child.material as THREE.MeshBasicMaterial;
      material.opacity = 0.5 + Math.sin(time * 3 + index) * 0.3;
    }
  });
}

function updateCodeMatrix(codeMatrix: THREE.Group, time: number) {
  codeMatrix.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      child.position.y -= child.userData.speed * 0.1;
      child.rotation.z += child.userData.rotationSpeed;

      if (child.position.y < -15) {
        child.position.y = 15;
        child.position.x = (Math.random() - 0.5) * 25;
      }
    }
  });
}

function updateGeometricShapes(
  geometricShapes: THREE.Group,
  time: number,
  mousePosition: { x: number; y: number }
) {
  geometricShapes.children.forEach((child, index) => {
    if (child instanceof THREE.Mesh) {
      child.rotation.x += child.userData.rotationX;
      child.rotation.y += child.userData.rotationY;
      child.rotation.z += child.userData.rotationZ;

      child.position.y += Math.sin(time + index) * 0.01;

      const mouseInfluence = 0.5;
      child.position.x +=
        (mousePosition.x * mouseInfluence - child.position.x) * 0.01;
      child.position.y +=
        (mousePosition.y * mouseInfluence - child.position.y) * 0.01;
    }
  });
}

function updateDataStreams(dataStreams: THREE.Group[], time: number) {
  dataStreams.forEach((stream) => {
    stream.position.add(
      stream.userData.direction.clone().multiplyScalar(stream.userData.speed)
    );

    if (stream.position.y > 15) {
      stream.position.set(
        (Math.random() - 0.5) * 20,
        -10,
        (Math.random() - 0.5) * 10
      );
    }

    stream.children.forEach((particle, index) => {
      if (particle instanceof THREE.Mesh) {
        const material = particle.material as THREE.MeshBasicMaterial;
        material.opacity = 0.4 + Math.sin(time * 4 + index * 0.5) * 0.4;
      }
    });
  });
}

ThreeBackground.displayName = 'ThreeBackground';

export default ThreeBackground;
