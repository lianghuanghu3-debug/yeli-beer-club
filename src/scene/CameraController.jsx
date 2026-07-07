import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function CameraController() {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, -0.3, 5.5));
  const targetLook = useRef(new THREE.Vector3(0, -0.3, 0));
  const currentPos = useRef(new THREE.Vector3(0, 2, 10));
  const currentLook = useRef(new THREE.Vector3(0, -0.3, 0));

  // Initialize camera position
  camera.position.set(0, 1.5, 9);
  camera.lookAt(0, -0.3, 0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Cinematic camera movement timeline
    if (t < 6) {
      // Phase 1: Slow push-in from darkness
      const progress = t / 6;
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      targetPos.current.set(
        Math.sin(t * 0.05) * 0.5,
        1.2 - eased * 1.4,
        9 - eased * 3.5
      );
    } else if (t < 15) {
      // Phase 2: Slow orbit + drift
      const orbitT = (t - 6) / 9;
      const angle = orbitT * Math.PI * 0.15;
      targetPos.current.set(
        Math.sin(angle) * 1.2 + Math.sin(t * 0.08) * 0.3,
        -0.3 + Math.sin(t * 0.12) * 0.15,
        5.5 + Math.cos(angle) * 0.8 + Math.cos(t * 0.07) * 0.3
      );
    } else {
      // Phase 3: Gentle ongoing drift
      const base = (t - 15) * 0.04;
      targetPos.current.set(
        Math.sin(base * 0.7) * 1.5 + Math.sin(t * 0.06) * 0.4,
        -0.3 + Math.sin(t * 0.1) * 0.2,
        5.5 + Math.cos(base * 0.7) * 1.0 + Math.cos(t * 0.08) * 0.3
      );
    }

    // Look target - always toward the dome with subtle sway
    targetLook.current.set(
      Math.sin(t * 0.09) * 0.15,
      -0.35 + Math.sin(t * 0.13) * 0.08,
      Math.cos(t * 0.09) * 0.15
    );

    // Smooth interpolation
    currentPos.current.lerp(targetPos.current, 0.008);
    currentLook.current.lerp(targetLook.current, 0.015);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}
