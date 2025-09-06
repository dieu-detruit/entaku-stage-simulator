import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Lights } from './Lights';
import { SceneHelpers } from './SceneHelpers';
import { Stage } from './gltfModels/Stage';
import { PlantModel } from './gltfModels/PlantModel';
import { TheaterModel } from './gltfModels/TheaterModel';
import { TableModel } from './gltfModels/Table';
import { RegisterCounterModel } from './gltfModels/RegisterCounter';
import { ChairModel } from './gltfModels/Chair';

interface Scene3dProps {
  // 照明設定
  ambientIntensity: number;
  mainLightIntensity: number;
  fillLightIntensity: number;

  // 表示設定
  showGrid: boolean;
  showAxes: boolean;
  showShadows: boolean;

  // カメラ設定
  fov: number;

  // イベントハンドラー
  onLoadingProgress?: (status: string) => void;
}

export function Scene3D({
  ambientIntensity,
  mainLightIntensity,
  fillLightIntensity,
  showGrid,
  showAxes,
  showShadows,
  fov,
  onLoadingProgress,
}: Scene3dProps) {
  return (
    <Canvas
      camera={{
        position: [10, -10, 10],
        fov: fov,
        up: [0, 0, 1], // Z軸を上方向に設定
      }}
      shadows={showShadows}
      gl={{ antialias: true }}
      style={{ background: '#333333' }}
    >
      {/* ライティング */}
      <Lights
        ambientIntensity={ambientIntensity}
        mainLightIntensity={mainLightIntensity}
        fillLightIntensity={fillLightIntensity}
      />

      {/* 3Dモデル */}
      <TheaterModel onLoadingProgress={onLoadingProgress} />

      <PlantModel onLoadingProgress={onLoadingProgress} />

      {/* ステージ */}
      <Stage />

      {/* レジカウンター */}
      <RegisterCounterModel onLoadingProgress={onLoadingProgress} />

      {/* テーブル */}
      <TableModel
        onLoadingProgress={onLoadingProgress}
        position={[3, 4, 0.24]}
      />
      <TableModel
        onLoadingProgress={onLoadingProgress}
        position={[5, 2, 0.24]}
      />

      {/* 椅子 */}
      <ChairModel onLoadingProgress={onLoadingProgress} position={[3, 4, 0.24]} />
      <ChairModel onLoadingProgress={onLoadingProgress} position={[4, 3, 0.24]} />

      {/* ヘルパー要素 */}
      <SceneHelpers showGrid={showGrid} showAxes={showAxes} />

      {/* カメラコントロール */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        mouseButtons={{
          LEFT: 0, // ROTATE
          MIDDLE: 1, // DOLLY
          RIGHT: 2, // PAN
        }}
      />
    </Canvas>
  );
}
