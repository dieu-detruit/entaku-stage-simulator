import { GltfModel, type GltfModelProps } from '../../gltf/GltfModel';
import { GLTF_MODEL_PATHS } from '../../gltf/paths';


type PlantModelProps = Omit<GltfModelProps, "modelPath" | "position">;

export function PlantModel(props: PlantModelProps) {
    return <GltfModel
        modelPath={GLTF_MODEL_PATHS.PLANT}
        position={[6.2, 5, 0.24]}
        {...props}
    />;
}
