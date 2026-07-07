import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Custom vertex shader for ice displacement
const iceVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  varying float vDisplacement;

  uniform float uTime;
  uniform float uDisplacementStrength;

  // Simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m*m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    // Multi-octave noise
    float noise = snoise(position * 0.8 + uTime * 0.05) * 0.5;
    noise += snoise(position * 1.6 + uTime * 0.03) * 0.3;
    noise += snoise(position * 3.2 + uTime * 0.02) * 0.2;

    vec3 newPosition = position + normal * noise * uDisplacementStrength;

    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vUv = uv;
    vDisplacement = noise;
    vec4 worldPos = modelMatrix * vec4(newPosition, 1.0);
    vWorldPosition = worldPos.xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

// Custom fragment shader for ice material
const iceFragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  varying float vDisplacement;

  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uLightPosition;
  uniform float uFresnelPower;
  uniform float uOpacity;
  uniform float uIridescence;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vNormal);

    // Fresnel effect
    float fresnel = pow(1.0 - abs(dot(normal, viewDir)), uFresnelPower);
    fresnel = smoothstep(0.0, 1.0, fresnel);

    // Light contribution
    vec3 lightDir = normalize(uLightPosition - vWorldPosition);
    float diff = max(dot(normal, lightDir), 0.0) * 0.5 + 0.5;

    // Subsurface scattering fake
    float sss = max(0.0, dot(viewDir, -lightDir)) * 0.3;
    sss = pow(sss, 4.0) * 0.6;

    // Iridescence
    float iri = sin(vDisplacement * 10.0 + uTime * 0.2) * 0.5 + 0.5;
    vec3 iriColor = mix(vec3(0.7, 0.85, 1.0), vec3(0.95, 0.98, 1.0), iri);

    // Base color
    vec3 baseColor = mix(uColor, iriColor, fresnel * uIridescence * 0.5);
    baseColor = mix(baseColor, vec3(1.0), sss * 0.4);

    // Edge glow
    float edgeGlow = fresnel * 0.7;
    baseColor += vec3(0.15, 0.25, 0.4) * edgeGlow;

    // Specular
    vec3 halfVec = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfVec), 0.0), 128.0);
    baseColor += vec3(0.5, 0.6, 0.8) * spec * 0.3;

    // Condensation / frost
    float frost = snoise(vWorldPosition * 5.0 + uTime * 0.03) * 0.5 + 0.5;
    frost = smoothstep(0.3, 0.7, frost);
    baseColor = mix(baseColor, baseColor * 1.3, frost * 0.15);

    // Alpha with varying translucency
    float alpha = uOpacity * (0.3 + fresnel * 0.7);
    alpha = mix(alpha, alpha * 0.85, frost * 0.4);

    gl_FragColor = vec4(baseColor, alpha);
  }
`;

// Metal shader for the structural frame
const metalVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const metalFragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;

  uniform float uTime;
  uniform vec3 uColor;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vNormal);

    // Anisotropic metal
    float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 3.0);
    fresnel = smoothstep(0.0, 1.0, fresnel);

    // Brushed metal lines
    float lines = sin(vPosition.y * 200.0) * 0.5 + 0.5;
    lines = smoothstep(0.45, 0.55, lines);

    vec3 metalColor = mix(uColor, uColor * 1.5, lines * 0.3);
    metalColor = mix(metalColor, uColor * 0.3, fresnel * 0.6);

    // Subtle edge highlight
    float edge = fresnel * 0.4;
    metalColor += vec3(0.1, 0.15, 0.25) * edge;

    gl_FragColor = vec4(metalColor, 1.0);
  }
`;

export function IceDome({ position = [0, -0.5, 0], scale = 1 }) {
  const groupRef = useRef();
  const iceRef = useRef();
  const metalRef = useRef();
  const wireRef = useRef();

  const iceUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#8AADB8") },
    uLightPosition: { value: new THREE.Vector3(15, 20, 10) },
    uFresnelPower: { value: 2.5 },
    uOpacity: { value: 0.55 },
    uIridescence: { value: 0.3 },
    uDisplacementStrength: { value: 0.3 },
  }), []);

  const metalUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#2A2D30") },
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    iceUniforms.uTime.value = t;
    metalUniforms.uTime.value = t;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Inner core - warm subtle glow */}
      <mesh scale={0.35}>
        <icosahedronGeometry args={[1, 4]} />
        <meshBasicMaterial color="#2a3a4a" transparent opacity={0.15} />
      </mesh>

      {/* Main ice dome - displaced icosahedron */}
      <mesh ref={iceRef} scale={0.75}>
        <icosahedronGeometry args={[1, 6]} />
        <shaderMaterial
          vertexShader={iceVertexShader}
          fragmentShader={iceFragmentShader}
          uniforms={iceUniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer ice shell - larger, more transparent */}
      <mesh scale={0.85}>
        <icosahedronGeometry args={[1, 5]} />
        <shaderMaterial
          vertexShader={iceVertexShader}
          fragmentShader={iceFragmentShader}
          uniforms={{
            ...iceUniforms,
            uOpacity: { value: 0.18 },
            uFresnelPower: { value: 3.0 },
            uDisplacementStrength: { value: 0.15 },
          }}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Metal wireframe structure */}
      <mesh ref={metalRef} scale={0.82}>
        <icosahedronGeometry args={[1, 3]} />
        <shaderMaterial
          vertexShader={metalVertexShader}
          fragmentShader={metalFragmentShader}
          uniforms={metalUniforms}
          wireframe
        />
      </mesh>

      {/* Floating geometric shards */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 1.5 + Math.random() * 0.8;
        const y = (Math.random() - 0.5) * 2.5;
        const rot = Math.random() * Math.PI;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              y,
              Math.sin(angle) * radius,
            ]}
            rotation={[rot, rot * 0.7, rot * 0.3]}
            scale={0.06 + Math.random() * 0.08}
          >
            <octahedronGeometry args={[1, 1]} />
            <meshPhysicalMaterial
              color="#B8D4E0"
              metalness={0.1}
              roughness={0.2}
              transparent
              opacity={0.35}
              envMapIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default IceDome;
