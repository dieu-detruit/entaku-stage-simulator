import { Grid } from '@react-three/drei';

interface SceneHelpersProps {
    showGrid: boolean;
    showAxes: boolean;
}

export function SceneHelpers({ showGrid, showAxes }: SceneHelpersProps) {
    return (
        <>
            {/* グリッドをXY平面（Z=0の水平面）に配置 */}
            {showGrid && (
                <Grid
                    position={[0, 0, 0]}
                    rotation={[Math.PI / 2, 0, 0]} // XZ平面からXY平面に回転
                    args={[50, 50]}
                    cellSize={1}
                    cellThickness={0.6}
                    cellColor="#888888"
                    sectionSize={10}
                    sectionThickness={1.5}
                    sectionColor="#444444"
                    fadeDistance={100}
                    fadeStrength={1}
                    infiniteGrid
                />
            )}

            {/* 床として見えない平面を追加（XY平面、Z=0） */}
            <mesh receiveShadow position={[0, 0, 0]}>
                <planeGeometry args={[100, 100]} />
                <shadowMaterial opacity={0.3} />
            </mesh>

            {/* 軸ヘルパー */}
            {showAxes && <axesHelper args={[5]} />}
        </>
    );
}
