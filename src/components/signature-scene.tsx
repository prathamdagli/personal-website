"use client";
import { useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { BufferGeometry, Float32BufferAttribute, Group, Vector3 } from "three";

export default function SignatureScene({
  variant,
  ambient = false,
}: {
  variant: "network" | "sculpture";
  ambient?: boolean;
}) {
  const group = useRef<Group>(null);
  const invalidate = useRef<() => void>(() => {});
  useEffect(() => {
    if (!ambient) return;
    const move = (event: PointerEvent) => {
      if (!group.current || event.pointerType !== "mouse") return;
      group.current.rotation.y = (event.clientX / window.innerWidth - 0.5) * 0.5;
      group.current.rotation.x = (event.clientY / window.innerHeight - 0.5) * 0.3;
      invalidate.current();
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [ambient]);
  const geometry = useMemo(() => {
    const points = Array.from({ length: 36 }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / 36);
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      return new Vector3(
        Math.cos(theta) * Math.sin(phi) * 1.8,
        Math.sin(theta) * Math.sin(phi) * 1.8,
        Math.cos(phi) * 1.8,
      );
    });
    const nodes = new BufferGeometry().setFromPoints(points);
    const lines: number[] = [];
    points.forEach((point, i) =>
      points.slice(i + 1).forEach((next) => {
        if (point.distanceTo(next) < 1.1)
          lines.push(...point.toArray(), ...next.toArray());
      }),
    );
    const edges = new BufferGeometry();
    edges.setAttribute("position", new Float32BufferAttribute(lines, 3));
    return { nodes, edges };
  }, []);
  return (
    <div
      className="signature-canvas"
      onPointerMove={(event) => {
        if (!group.current) return;
        const box = event.currentTarget.getBoundingClientRect();
        group.current.rotation.y =
          ((event.clientX - box.left) / box.width - 0.5) * 0.6;
        group.current.rotation.x =
          ((event.clientY - box.top) / box.height - 0.5) * 0.35;
        invalidate.current();
      }}
      onPointerLeave={() => {
        if (group.current) {
          group.current.rotation.set(0, 0, 0);
          invalidate.current();
        }
      }}
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        onCreated={(state) => {
          invalidate.current = state.invalidate;
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 5]} intensity={3} color="#b4d7ff" />
        <group ref={group}>
          {variant === "network" ? (
            <>
              <points geometry={geometry.nodes}>
                <pointsMaterial size={0.055} color="#c5dbff" sizeAttenuation />
              </points>
              <lineSegments geometry={geometry.edges}>
                <lineBasicMaterial color="#648abe" transparent opacity={0.5} />
              </lineSegments>
            </>
          ) : (
            <>
              <mesh rotation={[0.3, 0.5, 0.1]}>
                <icosahedronGeometry args={[1.55, 0]} />
                <meshStandardMaterial
                  color="#253549"
                  metalness={0.7}
                  roughness={0.35}
                  flatShading
                />
              </mesh>
              <mesh rotation={[0.3, 0.5, 0.1]} scale={1.003}>
                <icosahedronGeometry args={[1.55, 0]} />
                <meshBasicMaterial
                  color="#89b8f3"
                  wireframe
                  transparent
                  opacity={0.6}
                />
              </mesh>
              <mesh position={[0, -1.9, 0]}>
                <cylinderGeometry args={[1.7, 1.7, 0.15, 32]} />
                <meshStandardMaterial
                  color="#17202d"
                  metalness={0.6}
                  roughness={0.5}
                />
              </mesh>
            </>
          )}
        </group>
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
