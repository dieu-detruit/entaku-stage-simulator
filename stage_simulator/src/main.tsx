import { createRoot } from 'react-dom/client';
import './index.css';
import { preloadGltfModels } from './gltf/preload.ts';
import './firebase.ts';
import AppRouter from './AppRouter.tsx';
import { BrowserRouter } from 'react-router-dom';

preloadGltfModels();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
