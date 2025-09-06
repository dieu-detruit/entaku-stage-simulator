import { useGLTF, useProgress } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

export type GltfModelProps = {
    modelPath: string;
    position: [number, number, number];
    rotation?: [number, number, number];
    onLoadingProgress?: (status: string) => void;
}

export function GltfModel({
    modelPath,
    position,
    rotation,
    onLoadingProgress
}: GltfModelProps) {
    const { scene } = useGLTF(modelPath);
    const { progress } = useProgress();

    // Clone the scene to ensure each instance is independent
    const clonedScene = useMemo(() => {
        if (!scene) return null;

        const cloned = scene.clone();

        // Set shadow for all meshes in the cloned model
        cloned.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                // If the material is MeshBasicMaterial, change it to MeshLambertMaterial
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

        return cloned;
    }, [scene]);

    useEffect(() => {
        if (progress !== undefined) {
            const percent = Math.round(progress);
            onLoadingProgress?.(`Loading... ${percent}%`);

            if (progress === 1) {
                onLoadingProgress?.('Loading complete');
            }
        }
    }, [progress, onLoadingProgress]);

    if (!clonedScene) return null;

    return (
        <primitive
            object={clonedScene}
            position={position}
            rotation={rotation ?? [Math.PI / 2, 0, 0]}
        />
    );
}
