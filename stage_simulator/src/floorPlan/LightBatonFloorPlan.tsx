interface LightBatonFloorPlanProps {
    theaterDisplayDimensions: { width: number; height: number };
}

const LIGHT_BATON_FLOOR_PLAN_SCALE = 1.0;

export function LightBatonFloorPlan({ theaterDisplayDimensions }: LightBatonFloorPlanProps) {
    return (
        <div className="absolute inset-0">
            <img
                src="/baton_floor_plan.png"
                alt="Light Baton"
                style={{
                    width: LIGHT_BATON_FLOOR_PLAN_SCALE * theaterDisplayDimensions.width,
                    height: LIGHT_BATON_FLOOR_PLAN_SCALE * theaterDisplayDimensions.height,
                    position: 'absolute',
                    top: -0.01 * LIGHT_BATON_FLOOR_PLAN_SCALE * theaterDisplayDimensions.height,
                    left: 0.001 * LIGHT_BATON_FLOOR_PLAN_SCALE * theaterDisplayDimensions.width,
                }}
                className="object-contain"
            />
        </div>
    );
}
