import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";
import { BlendFunction, Resolution } from "postprocessing";
import IceDome from "./IceDome";
import Atmosphere from "./Atmosphere";
import CameraController from "./CameraController";
import * as THREE from "three";

export default function Experience() {
  return (
    <Canvas
      camera={{ position: [0, 2, 9], fov: 42, near: 0.1, far: 50 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.9,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      dpr={[1, 1.5]}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}
    >
      <CameraController />
      <IceDome />
      <Atmosphere />

      <EffectComposer multisampling={0} resolutionScale={0.75}>
        <Bloom
          intensity={0.6}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          mipmapBlur
          blendFunction={BlendFunction.SCREEN}
        />
        <DepthOfField
          focusDistance={0.012}
          focalLength={0.025}
          bokehScale={3}
          resolutionScale={0.5}
        />
        <Vignette
          offset={0.4}
          darkness={0.5}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </Canvas>
  );
}
