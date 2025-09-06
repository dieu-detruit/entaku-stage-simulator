import { GltfModel, type GltfModelProps } from '../../gltf/GltfModel';
import { GLTF_MODEL_PATHS } from '../../gltf/paths';


type ChairModelProps = Omit<GltfModelProps, "modelPath">;

export function ChairModel(props: ChairModelProps) {
    return <GltfModel
        modelPath={GLTF_MODEL_PATHS.CHAIR}
        {...props}
    />
}
