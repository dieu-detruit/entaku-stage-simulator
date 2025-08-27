import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function App() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loadingStatus, setLoadingStatus] = useState<string>('読み込み中...');

  useEffect(() => {
    if (!mountRef.current) return;

    // 基本的なTHREE.jsセットアップ
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);
    
    // カメラのアスペクト比を3Dエリアに合わせる
    const canvas3DWidth = window.innerWidth - 320;
    const canvas3DHeight = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas3DWidth / canvas3DHeight,
      0.1,
      1000,
    );
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvas3DWidth, canvas3DHeight);
    mountRef.current.appendChild(renderer.domElement);

    // GLBファイルを読み込み
    const loader = new GLTFLoader();
    loader.load(
      '/b1_theater.glb',
      (gltf) => {
        const model = gltf.scene;
        
        // GLBモデルを右手系Z-up座標系に変換
        model.rotation.x = Math.PI / 2; // Y-up → Z-up変換
        scene.add(model);
        setLoadingStatus('読み込み完了');

        // モデルのサイズに合わせてカメラを調整
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());

        // 表示上Z軸が上向きになるカメラ位置を調整
        const distance = size * 0.8;
        camera.position.copy(center);
        camera.position.x += distance * 0.7; // X方向（右）
        camera.position.y -= distance * 0.7; // Y方向（手前）
        camera.position.z += distance * 0.3; // Z方向（上）
        camera.lookAt(center);
        
        // カメラの上方向を維持
        camera.up.set(0, 0, 1);

        controls.target.copy(center);
        controls.update();

        // モデル内のすべてのメッシュにシャドウを設定
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            // マテリアルがMeshBasicMaterialの場合、ライティングを受けるように変更
            if (child.material && child.material instanceof THREE.MeshBasicMaterial) {
              const basicMaterial = child.material as THREE.MeshBasicMaterial;
              const lambertMaterial = new THREE.MeshLambertMaterial({
                color: basicMaterial.color,
                map: basicMaterial.map,
              });
              child.material = lambertMaterial;
            }
          }
        });
      },
      (progress) => {
        const percent = Math.round((progress.loaded / progress.total) * 100);
        setLoadingStatus(`読み込み中... ${percent}%`);
      },
      (error) => {
        console.error('GLBファイルの読み込みエラー:', error);
        setLoadingStatus('読み込みエラーが発生しました');
      },
    );

    // グリッドをXY平面（Z=0の水平面）に配置
    const gridHelper = new THREE.GridHelper(50, 50, 0x888888, 0x444444);
    // GridHelperはデフォルトでXZ平面なので、XY平面にするためX軸周りに90度回転
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    // 床として見えない平面を追加（XY平面、Z=0）
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    // PlaneGeometryはデフォルトでXY平面なので、回転不要
    floor.receiveShadow = true;
    scene.add(floor);

    // 標準の軸ヘルパーを使用（右手系Z-upに対応）
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // ステージを追加（右手系Z-up座標系で直接作成）
    const stageGeometry = new THREE.BoxGeometry(3.6, 3.6, 0.24); // X=幅, Y=奥行き, Z=高さ
    const stageMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xf8f8f8, // 白色
      shininess: 30,   // 光沢
      specular: 0x111111 // スペキュラー反射
    });
    const stage = new THREE.Mesh(stageGeometry, stageMaterial);
    
    // ローカル原点を下端にするため、Z方向に高さの半分だけオフセット
    stageGeometry.translate(0, 0, 0.12); // Z方向（高さ方向）に移動
    
    // ステージの逆側の端が(3, 2, 0)に来るよう配置
    // ステージサイズ3.6m × 3.6mなので、中心は(3+1.8, 2+1.8, 0) = (4.8, 3.8, 0)
    stage.position.set(4.8, 3.8, 0); // 逆側の端が(3, 2, 0)になるよう中心を配置
    stage.castShadow = true;
    stage.receiveShadow = true;
    scene.add(stage);

    // カメラの初期位置（表示上でZ軸が上向きになるように）
    camera.position.set(10, -10, 10); // 表示上: X=右、Y=手前、Z=上
    camera.lookAt(0, 0, 0);
    
    // カメラの上方向をZ軸に設定（表示上の鉛直上方向）
    camera.up.set(0, 0, 1);

    // メインの方向性光源（太陽光のような光）
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(4, 4, 10); // 右手系Z-up: Z座標が高さ
    directionalLight.castShadow = true;
    
    // シャドウの品質設定
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    scene.add(directionalLight);

    // 補助光源（逆光を減らす）
    const fillLight = new THREE.DirectionalLight(0xffffff, 8);
    fillLight.position.set(-10, -10, 10); // 右手系Z-up: Z座標が高さ
    scene.add(fillLight);

    // レンダラーでシャドウを有効化
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // OrbitControls（標準的な設定で直感的に）
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // 標準的なマウス操作
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN
    };
    
    // 回転の制限を設定
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;

    // アニメーションループ
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // リサイズ対応
    const handleResize = () => {
      const newCanvas3DWidth = window.innerWidth - 320;
      const newCanvas3DHeight = window.innerHeight;
      camera.aspect = newCanvas3DWidth / newCanvas3DHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newCanvas3DWidth, newCanvas3DHeight);
    };
    window.addEventListener('resize', handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div className="w-full h-screen flex">
      {/* 3D表示エリア（左側） */}
      <div className="flex-1 relative">
        <div ref={mountRef} className="w-full h-full" />
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded pointer-events-none">
          {loadingStatus}
        </div>
      </div>
      
      {/* コントロールパネル（右側） */}
      <div className="w-80 bg-gray-800 text-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Stage Simulator</h2>
        
        {/* 照明コントロール */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">照明設定</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">環境光の強度</label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                defaultValue="0.8"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">メイン光源の強度</label>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                defaultValue="1.2"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">補助光源の強度</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.4"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* カメラコントロール */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">カメラ設定</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
              カメラをリセット
            </button>
            <div>
              <label className="block text-sm font-medium mb-1">視野角 (FOV)</label>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                defaultValue="75"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* 表示設定 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">表示設定</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              グリッドを表示
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              座標軸を表示
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
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
      </div>
    </div>
  );
}

export default App;
