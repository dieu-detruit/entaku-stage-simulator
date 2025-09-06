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
import { RoomRunnerModel } from './gltfModels/RoomRunner';
import { SCENES } from '../lib/scenes';

interface Scene3dProps {
  sceneName: string;

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
  sceneName,
  ambientIntensity,
  mainLightIntensity,
  fillLightIntensity,
  showGrid,
  showAxes,
  showShadows,
  fov,
  onLoadingProgress,
}: Scene3dProps) {
  const scene = SCENES[sceneName as keyof typeof SCENES] ?? SCENES.scene1;

  return (
    <Canvas
      camera={{
        position: [0, 0, 2],
        fov: fov,
        up: [0, 0, 1],
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

      {/* 固定アイテム */}
      {/* レジカウンター */}
      <RegisterCounterModel onLoadingProgress={onLoadingProgress} />

      {/* ルームランナー */}
      <RoomRunnerModel onLoadingProgress={onLoadingProgress} />

      {/* 可動アイテム */}
      {/* テーブル */}
      <TableModel
        onLoadingProgress={onLoadingProgress}
        position={[scene.table1.x, scene.table1.y, scene.table1.z]}
        rotation={[Math.PI / 2, scene.table1.yaw, 0]}
      />
      <TableModel
        onLoadingProgress={onLoadingProgress}
        position={[scene.table2.x, scene.table2.y, scene.table2.z]}
        rotation={[Math.PI / 2, scene.table2.yaw, 0]}
      />

      {/* 椅子 */}
      <ChairModel
        onLoadingProgress={onLoadingProgress}
        position={[scene.chair1.x, scene.chair1.y, scene.chair1.z]}
        rotation={[Math.PI / 2, scene.chair1.yaw, 0]}
      />
      <ChairModel
        onLoadingProgress={onLoadingProgress}
        position={[scene.chair2.x, scene.chair2.y, scene.chair2.z]}
        rotation={[Math.PI / 2, scene.chair2.yaw, 0]}
      />

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
        target={[3, 3, 2]}
      />
    </Canvas>
  );
}
