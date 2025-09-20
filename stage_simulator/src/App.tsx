import { useState } from 'react';
import { Scene3D } from './components/Scene3d';
import { SCENES } from './lib/scenes';

function getSceneNameLabel(sceneName: string) {
  const match = sceneName.match(/^scene(\d+)$/);
  if (!match) return sceneName;
  const number = match[1];
  return `${number}場`;
}

function App() {
  const [sceneName, setSceneName] = useState("scene1");

  // 表示設定の状態
  const [showGrid, setShowGrid] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const [showBaton, setShowBaton] = useState(true);

  // ロード状態
  const [loadingStatus, setLoadingStatus] = useState('読み込み中...');

  return (
    <div className="w-full h-screen flex flex-col">
      {/* 上部コントロールバー */}
      <div className="bg-gray-800 text-white p-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold hidden sm:block">ドーナツ・レース</h1>
          <select
            value={sceneName}
            onChange={(e) => setSceneName(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded text-sm min-w-24"
          >
            {Object.keys(SCENES).map((key) => (
              <option key={key} value={key}>{getSceneNameLabel(key)}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showBaton}
              onChange={(e) => setShowBaton(e.target.checked)}
              className="w-4 h-4"
            />
            照明バトン
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
              className="w-4 h-4"
            />
            Grid
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showAxes}
              onChange={(e) => setShowAxes(e.target.checked)}
              className="w-4 h-4"
            />
            Axes
          </label>
          <div className="text-xs text-gray-400 hidden md:block">
            {loadingStatus}
          </div>
        </div>
      </div>

      {/* 3D表示エリア */}
      <div className="flex-1 relative">
        <Scene3D
          sceneName={sceneName}
          ambientIntensity={0.8}
          mainLightIntensity={1.2}
          fillLightIntensity={0.4}
          showGrid={showGrid}
          showAxes={showAxes}
          showBaton={showBaton}
          showShadows={true}
          fov={75}
          onLoadingProgress={setLoadingStatus}
        />
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded pointer-events-none text-sm md:hidden">
          {loadingStatus}
        </div>
      </div>
    </div>
  );
}

export default App;
