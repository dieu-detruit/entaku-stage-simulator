import { GltfModel, type GltfModelProps } from '../../gltf/GltfModel';
import { GLTF_MODEL_PATHS } from '../../gltf/paths';


type RoomRunnerModelProps = Omit<GltfModelProps, "modelPath" | "position">;

export function RoomRunnerModel(props: RoomRunnerModelProps) {
    return <GltfModel
        modelPath={GLTF_MODEL_PATHS.ROOM_RUNNER}
        position={[5.9, 1.6, 0.24]} rotation={[Math.PI / 2, Math.PI, 0]}
        {...props}
    />
}
