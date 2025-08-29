import { useState } from 'react';
import { Scene3D } from './components/Scene3D';
import { ControlPanel } from './components/ControlPanel';

function App() {
  // 照明設定の状態
  const [ambientIntensity, setAmbientIntensity] = useState(0.8);
  const [mainLightIntensity, setMainLightIntensity] = useState(1.2);
  const [fillLightIntensity, setFillLightIntensity] = useState(0.4);

  // 表示設定の状態
  const [showGrid, setShowGrid] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const [showShadows, setShowShadows] = useState(true);

  // カメラ設定の状態
  const [fov, setFov] = useState(75);

  // ロード状態
  const [loadingStatus, setLoadingStatus] = useState('読み込み中...');

  const handleCameraReset = () => {
    // カメラリセット機能は今後実装予定
    console.log('カメラリセット');
  };

  return (
    <div className="w-full h-screen flex">
      {/* 3D表示エリア（左側） */}
      <div className="flex-1 relative">
        <Scene3D
          ambientIntensity={ambientIntensity}
          mainLightIntensity={mainLightIntensity}
          fillLightIntensity={fillLightIntensity}
          showGrid={showGrid}
          showAxes={showAxes}
          showShadows={showShadows}
          fov={fov}
          onLoadingProgress={setLoadingStatus}
        />
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded pointer-events-none">
          {loadingStatus}
        </div>
      </div>

      {/* コントロールパネル（右側） */}
      <ControlPanel
        ambientIntensity={ambientIntensity}
        mainLightIntensity={mainLightIntensity}
        fillLightIntensity={fillLightIntensity}
        onAmbientIntensityChange={setAmbientIntensity}
        onMainLightIntensityChange={setMainLightIntensity}
        onFillLightIntensityChange={setFillLightIntensity}
        fov={fov}
        onFovChange={setFov}
        onCameraReset={handleCameraReset}
        showGrid={showGrid}
        showAxes={showAxes}
        showShadows={showShadows}
        onShowGridChange={setShowGrid}
        onShowAxesChange={setShowAxes}
        onShowShadowsChange={setShowShadows}
        loadingStatus={loadingStatus}
      />
    </div>
  );
}

export default App;
