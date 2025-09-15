import { useState } from "react";
import { TheaterFloorPlan } from "../floorPlan/TheaterFloorPlan";
import { StageFloorPlan } from "../floorPlan/StageFloorPlan";

export function FloorPlanApp() {
    const [showStage, setShowStage] = useState(true);

    const [theaterDimensions, setTheaterDimensions] = useState<{
        display: { width: number; height: number },
        original: { width: number; height: number }
    }>({
        display: { width: 0, height: 0 },
        original: { width: 0, height: 0 }
    });

    const handleTheaterDimensionsChange = (dimensions: {
        display: { width: number; height: number },
        original: { width: number; height: number }
    }) => {
        setTheaterDimensions(dimensions);
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="bg-gray-800 text-white p-3 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-bold hidden sm:block">Floor Plan</h1>
                </div>
                <div className="flex items-center gap-4">
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showStage}
                            onChange={(e) => setShowStage(e.target.checked)}
                            className="sr-only"
                        />
                        <div className={`relative w-11 h-6 transition duration-200 ease-linear rounded-full ${showStage ? 'bg-blue-500' : 'bg-gray-400'
                            }`}>
                            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-200 ease-linear transform ${showStage ? 'translate-x-5' : 'translate-x-0'
                                }`} />
                        </div>
                        <span className="ml-3 text-sm font-medium text-white">
                            Stage Display
                        </span>
                    </label>
                </div>
            </div>

            <div className="flex-1 relative bg-gray-100">
                <TheaterFloorPlan onDimensionsChange={handleTheaterDimensionsChange} />
                {showStage && <StageFloorPlan
                    theaterDisplayDimensions={theaterDimensions.display}
                    theaterOriginalDimensions={theaterDimensions.original}
                />}
            </div>
        </div>
    );
}
