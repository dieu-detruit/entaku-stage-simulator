interface ControlPanelProps {
  // 照明設定
  ambientIntensity: number;
  mainLightIntensity: number;
  fillLightIntensity: number;
  onAmbientIntensityChange: (value: number) => void;
  onMainLightIntensityChange: (value: number) => void;
  onFillLightIntensityChange: (value: number) => void;

  // カメラ設定
  fov: number;
  onFovChange: (value: number) => void;
  onCameraReset: () => void;

  // 表示設定
  showGrid: boolean;
  showAxes: boolean;
  showShadows: boolean;
  onShowGridChange: (value: boolean) => void;
  onShowAxesChange: (value: boolean) => void;
  onShowShadowsChange: (value: boolean) => void;

  // ステータス
  loadingStatus: string;
}

export function ControlPanel({
  ambientIntensity,
  mainLightIntensity,
  fillLightIntensity,
  onAmbientIntensityChange,
  onMainLightIntensityChange,
  onFillLightIntensityChange,
  fov,
  onFovChange,
  onCameraReset,
  showGrid,
  showAxes,
  showShadows,
  onShowGridChange,
  onShowAxesChange,
  onShowShadowsChange,
  loadingStatus,
}: ControlPanelProps) {
  return (
    <div className="w-80 bg-gray-800 text-white p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Stage Simulator</h2>

      {/* 照明コントロール */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">照明設定</h3>
        <div className="space-y-3">
          <div>
            <label
              htmlFor="ambient-intensity"
              className="block text-sm font-medium mb-1"
            >
              環境光の強度
            </label>
            <input
              id="ambient-intensity"
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={ambientIntensity}
              onChange={(e) =>
                onAmbientIntensityChange(Number.parseFloat(e.target.value))
              }
              className="w-full"
            />
            <span className="text-xs text-gray-400">
              {ambientIntensity.toFixed(1)}
            </span>
          </div>
          <div>
            <label
              htmlFor="main-light-intensity"
              className="block text-sm font-medium mb-1"
            >
              メイン光源の強度
            </label>
            <input
              id="main-light-intensity"
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={mainLightIntensity}
              onChange={(e) =>
                onMainLightIntensityChange(Number.parseFloat(e.target.value))
              }
              className="w-full"
            />
            <span className="text-xs text-gray-400">
              {mainLightIntensity.toFixed(1)}
            </span>
          </div>
          <div>
            <label
              htmlFor="fill-light-intensity"
              className="block text-sm font-medium mb-1"
            >
              補助光源の強度
            </label>
            <input
              id="fill-light-intensity"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={fillLightIntensity}
              onChange={(e) =>
                onFillLightIntensityChange(Number.parseFloat(e.target.value))
              }
              className="w-full"
            />
            <span className="text-xs text-gray-400">
              {fillLightIntensity.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* カメラコントロール */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">カメラ設定</h3>
        <div className="space-y-3">
          <button
            type="button"
            onClick={onCameraReset}
            className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            カメラをリセット
          </button>
          <div>
            <label htmlFor="fov" className="block text-sm font-medium mb-1">
              視野角 (FOV)
            </label>
            <input
              id="fov"
              type="range"
              min="10"
              max="120"
              step="5"
              value={fov}
              onChange={(e) => onFovChange(Number.parseInt(e.target.value, 10))}
              className="w-full"
            />
            <span className="text-xs text-gray-400">{fov}°</span>
          </div>
        </div>
      </div>

      {/* 表示設定 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">表示設定</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => onShowGridChange(e.target.checked)}
              className="mr-2"
            />
            グリッドを表示
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showAxes}
              onChange={(e) => onShowAxesChange(e.target.checked)}
              className="mr-2"
            />
            座標軸を表示
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showShadows}
              onChange={(e) => onShowShadowsChange(e.target.checked)}
              className="mr-2"
            />
            シャドウを表示
          </label>
        </div>
      </div>

      {/* 操作説明 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">操作方法</h3>
        <div className="text-sm space-y-1">
          <div>• 左ドラッグ: 回転</div>
          <div>• 右ドラッグ: パン</div>
          <div>• ホイール: ズーム</div>
          <div>• 矢印キー: 移動</div>
        </div>
      </div>

      {/* ロード状態 */}
      <div className="text-sm text-gray-400">{loadingStatus}</div>
    </div>
  );
}
