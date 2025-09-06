import { GltfModel, type GltfModelProps } from '../../gltf/GltfModel';
import { GLTF_MODEL_PATHS } from '../../gltf/paths';


type RegisterCounterModelProps = Omit<GltfModelProps, "modelPath" | "position">;

export function RegisterCounterModel(props: RegisterCounterModelProps) {
    return <GltfModel
        modelPath={GLTF_MODEL_PATHS.REGISTER_COUNTER}
        position={[3.2, 5.4, 0.24]}
        {...props}
    />
}
