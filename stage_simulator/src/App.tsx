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

    // 座標系（軸）を追加
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // カメラの初期位置
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

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