"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { InstancedMesh, Mesh, Object3D } from "three";

function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 0.28 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.16 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

interface VoteBarProps {
  position: [number, number, number];
  maxScale: number;
  color: string;
  delay: number;
}

function VoteBar({ position, maxScale, color, delay }: VoteBarProps) {
  const meshRef = useRef<Mesh>(null);
  const CYCLE = 10;

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const raw = ((state.clock.elapsedTime + delay) % CYCLE) / CYCLE;
    const riseRatio = Math.min(1, raw / 0.8);
    const eased = 1 - Math.pow(1 - riseRatio, 3);
    const scaleY = 0.05 + eased * maxScale;
    mesh.scale.y = scaleY;
    mesh.position.y = position[1] + scaleY / 2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.42, 1, 0.1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.55}
        roughness={0.4}
        metalness={0.1}
        toneMapped={false}
      />
    </mesh>
  );
}

function SparksField({ count = 60 }: { count?: number }) {
  const meshRef = useRef<InstancedMesh>(null);

  const data = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        x: (Math.random() - 0.5) * 6.5,
        startY: -2.6 - Math.random() * 2,
        z: (Math.random() - 0.5) * 1.8,
        speed: 0.26 + Math.random() * 0.42,
        offset: Math.random() * 10,
        sway: 0.07 + Math.random() * 0.14,
      })),
    [count]
  );

  const dummy = useMemo(() => new Object3D(), []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const progress = ((time * d.speed + d.offset) % 6) / 6;
      const y = d.startY + progress * 6;
      const x = d.x + Math.sin(time * 0.6 + d.offset) * d.sway;
      const scale = Math.max(0.004, 0.032 * (1 - progress));
      dummy.position.set(x, y, d.z);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null!, null!, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#f4c430"
        emissive="#f4c430"
        emissiveIntensity={2.2}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

function StageLight() {
  return (
    <mesh position={[0, -0.3, -0.8]}>
      <planeGeometry args={[6, 5]} />
      <meshBasicMaterial color="#ff6b35" transparent opacity={0.06} />
    </mesh>
  );
}

export default function HeroStageScene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.18} />
      <pointLight
        position={[0, -2.5, 3]}
        color="#ff6b35"
        intensity={2.2}
      />
      <pointLight position={[3, 3, 3]} color="#f4c430" intensity={0.4} />

      <StageLight />

      {/* Halo behind the screen */}
      <mesh position={[0, 0, -0.35]}>
        <planeGeometry args={[5.4, 3.8]} />
        <meshBasicMaterial color="#ff6b35" transparent opacity={0.16} />
      </mesh>

      <group rotation={[0, -0.22, 0]}>
        {/* Stage screen backplate */}
        <mesh>
          <planeGeometry args={[4.2, 2.9]} />
          <meshStandardMaterial
            color="#141210"
            emissive="#0a0a0b"
            emissiveIntensity={0.35}
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>

        {/* Subtle ember frame */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[4.32, 3.02]} />
          <meshBasicMaterial color="#ff6b35" transparent opacity={0.22} />
        </mesh>

        {/* Three vote bars */}
        <VoteBar
          position={[-1.25, -1.1, 0.1]}
          maxScale={1.9}
          color="#ff6b35"
          delay={0}
        />
        <VoteBar
          position={[0, -1.1, 0.1]}
          maxScale={1.4}
          color="#cd7f32"
          delay={0.45}
        />
        <VoteBar
          position={[1.25, -1.1, 0.1]}
          maxScale={0.95}
          color="#f4c430"
          delay={0.9}
        />
      </group>

      {/* World-aligned sparks */}
      <SparksField count={60} />
    </>
  );
}
