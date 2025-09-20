import { OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Lights } from './Lights';
import { SceneHelpers } from './SceneHelpers';
import { StageModel } from './gltfModels/Stage';
import { TheaterModel } from './gltfModels/TheaterModel';
import { TableModel } from './gltfModels/Table';
import { ChairModel } from './gltfModels/Chair';
import { BatonModel } from './gltfModels/Baton';
import { SCENES } from '../lib/scenes';

// レスポンシブカメラコンポーネント
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    // PerspectiveCameraの場合のみ処理
    if (!('fov' in camera)) return;

    // シーン全体を含む範囲の計算
    const sceneCenter = [2.0, 2.0, 0.5]; // X, Y, Z の中心
    const sceneSize = [7, 7, 3]; // X, Y, Z の範囲

    // アスペクト比を考慮した距離計算
    const aspect = size.width / size.height;
    const fov = camera.fov * (Math.PI / 180); // ラジアンに変換

    // シーン全体が映る距離を計算
    const maxDimension = Math.max(sceneSize[0] / aspect, sceneSize[1]);
    const distance = (maxDimension / 2) / Math.tan(fov / 2);

    // カメラの位置を調整 (斜め上から見下ろす視点)
    const cameraOffset = distance * 0.8;
    camera.position.set(
      sceneCenter[0] - cameraOffset * 0.6,
      sceneCenter[1] - cameraOffset * 0.6,
      sceneCenter[2] + cameraOffset * 0.8
    );

    camera.lookAt(sceneCenter[0], sceneCenter[1], sceneCenter[2]);
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

interface Scene3dProps {
  sceneName: string;

  // 照明設定
  ambientIntensity: number;
  mainLightIntensity: number;
  fillLightIntensity: number;

  // 表示設定
  showGrid: boolean;
  showAxes: boolean;
  showBaton: boolean;
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
  showBaton,
  showShadows,
  fov,
  onLoadingProgress,
}: Scene3dProps) {
  const scene = SCENES[sceneName as keyof typeof SCENES] ?? SCENES.scene1;

  return (
    <Canvas
      camera={{
        position: [0.0, 0.3, 2],
        fov: fov,
        up: [0, 0, 1],
      }}
      shadows={showShadows}
      gl={{ antialias: true }}
      style={{ background: '#333333' }}
      onCreated={({ gl }) => {
        const canvas = gl.domElement;
        canvas.style.touchAction = "none";
        canvas.addEventListener("touchstart", e => e.preventDefault(), { passive: false });
        canvas.addEventListener("touchmove", e => e.preventDefault(), { passive: false });
        window.addEventListener("gesturestart", e => e.preventDefault());
      }}
    >
      {/* レスポンシブカメラ */}
      <ResponsiveCamera />

      {/* ライティング */}
      <Lights
        ambientIntensity={ambientIntensity}
        mainLightIntensity={mainLightIntensity}
        fillLightIntensity={fillLightIntensity}
      />

      {/* 3Dモデル */}
      <TheaterModel onLoadingProgress={onLoadingProgress} />

      {/* ステージ */}
      <StageModel onLoadingProgress={onLoadingProgress} />

      {/* バトン */}
      {showBaton && <BatonModel onLoadingProgress={onLoadingProgress} />}

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
        touches={{
          ONE: 0, // ROTATE (1本指でタッチドラッグ)
          TWO: 1, // DOLLY_PAN (2本指でピンチズーム+パン)
        }}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={1.2} // スマホでのピンチズームを少し速くする
        panSpeed={0.8}
        rotateSpeed={0.5}
        // ズーム制限を設定（近すぎたり遠すぎたりしないように）
        minDistance={2}
        maxDistance={20}
        target={[4.5, 4.0, 1.5]}
      />
    </Canvas>
  );
}
