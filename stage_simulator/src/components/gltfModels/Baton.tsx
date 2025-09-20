import { GltfModel, type GltfModelProps } from '../../gltf/GltfModel';
import { GLTF_MODEL_PATHS } from '../../gltf/paths';


type BatonModelProps = Omit<GltfModelProps, "modelPath" | "position">;

export function BatonModel(props: BatonModelProps) {
    return <GltfModel
        modelPath={GLTF_MODEL_PATHS.BATON}
        position={[0.0, 0.0, 0.0]}
        {...props}
    />
}
