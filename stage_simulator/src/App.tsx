import { useState } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { Scene3D } from './components/Scene3d';

function App() {
  const [sceneName, setSceneName] = useState("scene1");

  // 表示設定の状態
  const [showGrid, setShowGrid] = useState(true);
  const [showAxes, setShowAxes] = useState(true);

  // ロード状態
  const [loadingStatus, setLoadingStatus] = useState('読み込み中...');

  return (
    <div className="w-full h-screen flex">
      {/* 3D表示エリア（左側） */}
      <div className="flex-1 relative">
        <Scene3D
          sceneName={sceneName}
          ambientIntensity={0.8}
          mainLightIntensity={1.2}
          fillLightIntensity={0.4}
          showGrid={showGrid}
          showAxes={showAxes}
          showShadows={true}
          fov={75}
          onLoadingProgress={setLoadingStatus}
        />
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded pointer-events-none">
          {loadingStatus}
        </div>
      </div>

      {/* コントロールiiパネル（右側） */}
      <ControlPanel
        sceneName={sceneName}
        setSceneName={setSceneName}
        showGrid={showGrid}
        showAxes={showAxes}
        onShowGridChange={setShowGrid}
        onShowAxesChange={setShowAxes}
        loadingStatus={loadingStatus}
      />
    </div>
  );
}

export default App;
