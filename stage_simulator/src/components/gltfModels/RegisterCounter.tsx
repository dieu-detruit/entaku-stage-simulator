import { GltfModel, type GltfModelProps } from '../../gltf/GltfModel';
import { GLTF_MODEL_PATHS } from '../../gltf/paths';


type RegisterCounterModelProps = Omit<GltfModelProps, "modelPath" | "position">;

export function RegisterCounterModel(props: RegisterCounterModelProps) {
    return <GltfModel
        modelPath={GLTF_MODEL_PATHS.REGISTER_COUNTER}
        position={[2.5, 5.3, 0.24]}
        {...props}
    />
}
