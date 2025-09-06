import { SCENES } from "../lib/scenes";

interface ControlPanelProps {
  sceneName: string;
  setSceneName: (value: string) => void;

  // 表示設定
  showGrid: boolean;
  showAxes: boolean;
  onShowGridChange: (value: boolean) => void;
  onShowAxesChange: (value: boolean) => void;

  // ステータス
  loadingStatus: string;
}

function getSceneNameLabel(sceneName: string) {
  // get the label of scene name (e.g. scene1 -> "1場")

  const match = sceneName.match(/^scene(\d+)$/);
  if (!match) return sceneName;

  const number = match[1];
  return `${number}場`;
}

export function ControlPanel({
  sceneName,
  setSceneName,
  showGrid,
  showAxes,
  onShowGridChange,
  onShowAxesChange,
  loadingStatus,
}: ControlPanelProps) {
  return (
    <div className="w-80 bg-gray-800 text-white p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Stage Simulator</h2>

      {sceneName}

      {/* シーンコントロール */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">シーンコントロール</h3>
        <select
          value={sceneName}
          onChange={(e) => setSceneName(e.target.value)}
          className="w-full bg-gray-700 text-white"
        >{
            Object.keys(SCENES).map(
              (key) => (
                <option key={key} value={key}>{getSceneNameLabel(key)}</option>
              )
            )
          }
        </select>
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
        </div>
      </div>

      {/* ロード状態 */}
      <div className="text-sm text-gray-400">{loadingStatus}</div>
    </div>
  );
}
