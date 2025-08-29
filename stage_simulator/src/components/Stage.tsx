import { useRef, useEffect } from 'react';
import type * as THREE from 'three';

export function Stage() {
    const meshRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        // ジオメトリのローカル原点を下端にするため、Z方向に高さの半分だけオフセット
        if (meshRef.current) {
            meshRef.current.geometry.translate(0, 0, 0.12);
        }
    }, []);

    return (
        <mesh
            ref={meshRef}
            position={[4.8, 3.8, 0]} // 逆側の端が(3, 2, 0)になるよう中心を配置
            castShadow
            receiveShadow
        >
            <boxGeometry args={[3.6, 3.6, 0.24]} />
            <meshPhongMaterial
                color={0xf8f8f8}
                shininess={30}
                specular={0x111111}
            />
        </mesh>
    );
}
