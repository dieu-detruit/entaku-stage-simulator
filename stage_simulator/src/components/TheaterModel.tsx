import { useGLTF, useProgress } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

interface TheaterModelProps {
    onLoadingProgress?: (status: string) => void;
}


export function TheaterModel({ onLoadingProgress }: TheaterModelProps) {
    const { scene } = useGLTF('/b1_theater.glb');
    const { progress } = useProgress();

    useEffect(() => {
        if (progress !== undefined) {
            const percent = Math.round(progress);
            onLoadingProgress?.(`読み込み中... ${percent}%`);

            if (progress === 1) {
                onLoadingProgress?.('読み込み完了');
            }
        }
    }, [progress, onLoadingProgress]);

    useEffect(() => {
        if (scene) {
            // モデル内のすべてのメッシュにシャドウを設定
            scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;

                    // マテリアルがMeshBasicMaterialの場合、ライティングを受けるように変更
                    if (
                        child.material &&
                        child.material instanceof THREE.MeshBasicMaterial
                    ) {
                        const basicMaterial = child.material as THREE.MeshBasicMaterial;
                        const lambertMaterial = new THREE.MeshLambertMaterial({
                            color: basicMaterial.color,
                            map: basicMaterial.map,
                        });
                        child.material = lambertMaterial;
                    }
                }
            });
        }
    }, [scene]);

    return (
        <primitive
            object={scene}
            rotation={[Math.PI / 2, 0, 0]} // Y-up → Z-up変換
        />
    );
}

// プリロード設定
useGLTF.preload('/b1_theater.glb');
