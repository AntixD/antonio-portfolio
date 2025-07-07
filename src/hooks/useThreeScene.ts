import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { ThreeSceneRefs } from '../types/three';

interface UseThreeSceneConfig {
  enableParticles?: boolean;
  enableMorphing?: boolean;
  particleCount?: number;
}

export const useThreeScene = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  mousePosition: { x: number; y: number },
  config?: UseThreeSceneConfig
): ThreeSceneRefs => {
  const sceneRefs = useRef<ThreeSceneRefs>({
    scene: null,
    renderer: null,
    camera: null,
    frameId: 0,
  });

  const cleanup = useCallback(() => {
    if (sceneRefs.current.frameId) {
      cancelAnimationFrame(sceneRefs.current.frameId);
    }
    if (sceneRefs.current.renderer) {
      sceneRefs.current.renderer.dispose();
    }
  }, []);

  const initScene = useCallback(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 50, 200);

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
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);

    camera.position.z = 8;

    sceneRefs.current = {
      scene,
      renderer,
      camera,
      frameId: 0,
    };

    return { scene, renderer, camera };
  }, [canvasRef]);

  const handleResize = useCallback(() => {
    const { camera, renderer } = sceneRefs.current;
    if (!camera || !renderer) return;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, []);

  useEffect(() => {
    const sceneObjects = initScene();
    if (!sceneObjects) return;

    const animate = () => {
      sceneRefs.current.frameId = requestAnimationFrame(animate);

      const { scene, camera, renderer } = sceneRefs.current;
      if (!scene || !camera || !renderer) return;

      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cleanup();
    };
  }, [initScene, handleResize, cleanup, mousePosition, config]);

  return sceneRefs.current;
};
