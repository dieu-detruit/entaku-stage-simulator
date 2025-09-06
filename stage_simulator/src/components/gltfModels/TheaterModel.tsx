import { GltfModel, type GltfModelProps } from '../../gltf/GltfModel';
import { GLTF_MODEL_PATHS } from '../../gltf/paths';


type TheaterModelProps = Omit<GltfModelProps, "modelPath" | "position">;

export function TheaterModel(props: TheaterModelProps) {
    return <GltfModel
        modelPath={GLTF_MODEL_PATHS.THEATER}
        position={[0, 0, 0]}
        {...props}
    />
}
