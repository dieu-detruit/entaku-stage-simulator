import { GltfModel, type GltfModelProps } from '../../gltf/GltfModel';
import { GLTF_MODEL_PATHS } from '../../gltf/paths';


type StageModelProps = Omit<GltfModelProps, "modelPath" | "position">;

export function StageModel(props: StageModelProps) {
    return <GltfModel
        modelPath={GLTF_MODEL_PATHS.STAGE}
        position={[0.0, 0.0, 0.0]}
        {...props}
    />
}
