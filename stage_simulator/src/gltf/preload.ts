import { useGLTF } from '@react-three/drei';

import { GLTF_MODEL_PATHS } from './paths';

export function preloadGltfModels() {
  for (const path of Object.values(GLTF_MODEL_PATHS)) {
    useGLTF.preload(path);
  }
}
