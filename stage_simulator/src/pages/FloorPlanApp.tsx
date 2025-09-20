import { useState } from "react";
import { TheaterFloorPlan } from "../floorPlan/TheaterFloorPlan";
import { StageFloorPlan } from "../floorPlan/StageFloorPlan";
import { LightBatonFloorPlan } from "../floorPlan/LightBatonFloorPlan";

function ToggleButton({
    label, value, setValue
}: {
    label: string;
    value: boolean;
    setValue: (value: boolean) => void;
}) {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => setValue(e.target.checked)}
                className="sr-only"
            />
            <div className={`relative w-11 h-6 transition duration-200 ease-linear rounded-full ${value ? 'bg-blue-500' : 'bg-gray-400'}`}>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-200 ease-linear transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
            <span className="ml-3 text-sm font-medium text-white">
                {label}
            </span>
        </label>
    );
}

export function FloorPlanApp() {
    const [showStage, setShowStage] = useState(true);
    const [showLightBaton, setShowLightBaton] = useState(false);

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
            <div className="bg-gray-800 text-white p-3 flex items-center justify-between gap-4 flex-wrap print:hidden">
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-bold hidden sm:block">Floor Plan</h1>
                </div>
                <div className="flex items-center gap-4">
                    <ToggleButton label="舞台図" value={showStage} setValue={setShowStage} />
                    <ToggleButton label="バトン図" value={showLightBaton} setValue={setShowLightBaton} />
                </div>
            </div>

            <h1 className="text-2xl font-bold text-center hidden print:block mb-4">Stage Floor Plan</h1>

            <div className="flex-1 relative bg-gray-100 print:bg-transparent">
                <TheaterFloorPlan onDimensionsChange={handleTheaterDimensionsChange} />
                {
                    showStage && <StageFloorPlan
                        theaterDisplayDimensions={theaterDimensions.display}
                        theaterOriginalDimensions={theaterDimensions.original}
                    />
                }
                {
                    showLightBaton && <LightBatonFloorPlan theaterDisplayDimensions={theaterDimensions.display} />
                }
            </div>
        </div>
    );
}
