import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Particles({ count = 800 }) {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      velocities[i * 3] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 1] = Math.random() * 0.005 + 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return { pos, velocities };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const attr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let x = positions.pos[i * 3] + Math.sin(t * 0.3 + i) * 0.005;
      let y = positions.pos[i * 3 + 1] + positions.velocities[i * 3 + 1] * t * 0.5;
      let z = positions.pos[i * 3 + 2] + Math.cos(t * 0.3 + i) * 0.005;

      // Wrap around
      if (y > 4) y = -4;
      if (y < -4) y = 4;
      if (Math.abs(x) > 6) x *= -1;
      if (Math.abs(z) > 6) z *= -1;

      // Slight drift
      x += Math.sin(t * 0.15 + i * 0.7) * 0.02;
      z += Math.cos(t * 0.15 + i * 0.7) * 0.02;

      attr.setXYZ(i, x, y, z);
    }
    attr.needsUpdate = true;

    // Subtle overall rotation
    pointsRef.current.rotation.y += 0.0001;
    pointsRef.current.rotation.x += 0.00005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.pos}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#B8D4E0"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export function GroundPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial
        color="#1a1d20"
        roughness={0.3}
        metalness={0.8}
        envMapIntensity={0.4}
      />
    </mesh>
  );
}

export function VolumetricLight() {
  const lightRef = useRef();

  useFrame((state) => {
    if (lightRef.current) {
      const t = state.clock.getElapsedTime();
      lightRef.current.intensity = 0.8 + Math.sin(t * 0.2) * 0.15;
    }
  });

  return (
    <>
      {/* Key light */}
      <spotLight
        position={[10, 15, 5]}
        angle={0.5}
        penumbra={1}
        intensity={2.5}
        color="#B8D4E0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* Rim light */}
      <spotLight
        position={[-8, 3, -6]}
        angle={0.4}
        penumbra={1}
        intensity={1.5}
        color="#6B8A9E"
      />

      {/* Bottom fill */}
      <pointLight
        position={[0, -1, 3]}
        intensity={0.6}
        color="#3A5A6A"
      />

      {/* Top ambient glow */}
      <pointLight
        ref={lightRef}
        position={[0, 5, 0]}
        intensity={0.8}
        color="#9CB8C8"
      />

      {/* Accent lights */}
      <pointLight position={[3, 0.5, 3]} intensity={0.4} color="#7A9AAA" />
      <pointLight position={[-3, -0.5, -2]} intensity={0.3} color="#5A7A8A" />
    </>
  );
}

export function FogLayers() {
  return (
    <>
      <fog attach="fog" args={["#0a0d10", 3, 18]} />
      <color attach="background" args={["#06080a"]} />
    </>
  );
}

export default function Atmosphere() {
  return (
    <>
      <FogLayers />
      <VolumetricLight />
      <Particles count={600} />
      <GroundPlane />
    </>
  );
}
