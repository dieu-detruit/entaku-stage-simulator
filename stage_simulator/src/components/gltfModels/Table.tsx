import { GltfModel, type GltfModelProps } from '../../gltf/GltfModel';
import { GLTF_MODEL_PATHS } from '../../gltf/paths';


type TableModelProps = Omit<GltfModelProps, "modelPath">;

export function TableModel(props: TableModelProps) {
    return <GltfModel
        modelPath={GLTF_MODEL_PATHS.TABLE}
        {...props}
    />
}
