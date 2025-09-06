import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { preloadGltfModels } from './gltf/preload.ts';
import './firebase.ts';

preloadGltfModels();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(<App />);
