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
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // GLBファイルを読み込み
    const loader = new GLTFLoader();
    loader.load(
      '/b1_theater.glb',
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        setLoadingStatus('読み込み完了');

        // モデルのサイズに合わせてカメラを調整
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());

        // カメラ位置を調整（より近い視点に）
        const distance = size * 0.8;
        camera.position.copy(center);
        camera.position.x += distance * 0.7;
        camera.position.y += distance * 0.3;
        camera.position.z += distance * 0.7;
        camera.lookAt(center);

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

    // グリッドを追加（1m刻み、50x50m）
    const gridHelper = new THREE.GridHelper(50, 50, 0x888888, 0x444444);
    scene.add(gridHelper);

    // 床として見えない平面を追加（シャドウを受けるため）
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // 座標系（軸）を追加
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // カメラの初期位置
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    // 照明を追加
    // 環境光（全体的な明るさ）
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8); // より明るく
    scene.add(ambientLight);

    // メインの方向性光源（太陽光のような光）
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 20, 10);
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
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-10, 10, -10);
    scene.add(fillLight);

    // ポイントライト（舞台照明風）
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 15, 0);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // レンダラーでシャドウを有効化
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // アニメーションループ
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // リサイズ対応
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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
    <div className="w-full h-screen">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded pointer-events-none">
        {loadingStatus}
      </div>
    </div>
  );
}

export default App;