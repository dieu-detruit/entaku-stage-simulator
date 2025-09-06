import { useEffect, useRef } from 'react';
import type * as THREE from 'three';

export function Stage() {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.translate(-2.25, -2.25, 0.12);
    }
  }, []);

  return (
    <mesh
      ref={meshRef}
      position={[6.7, 5.7, 0]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[4.5, 4.5, 0.24]} />
      <meshPhongMaterial color={0xf8f8f8} shininess={30} specular={0x111111} />
    </mesh>
  );
}
