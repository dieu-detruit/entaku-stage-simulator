interface LightsProps {
    ambientIntensity: number;
    mainLightIntensity: number;
    fillLightIntensity: number;
}

export function Lights({
    ambientIntensity,
    mainLightIntensity,
    fillLightIntensity
}: LightsProps) {
    return (
        <>
            {/* 環境光 */}
            <ambientLight intensity={ambientIntensity} />

            {/* メインの方向性光源（太陽光のような光） */}
            <directionalLight
                position={[4, 4, 10]}
                intensity={mainLightIntensity}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-near={0.1}
                shadow-camera-far={100}
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
            />

            {/* 補助光源（逆光を減らす） */}
            <directionalLight
                position={[-10, -10, 10]}
                intensity={fillLightIntensity}
            />
        </>
    );
}
