import { VerticalStageBase, HorizontalStageBase } from './StageBase';

const METERS_PER_PIXEL = 0.006367521367521368;
const VIEWBOX_X_OFFSET = 0;
const VIEWBOX_Y_OFFSET = 0;
const VIEWBOX_WIDTH = 18.2;
const VIEWBOX_HEIGHT = 12.8;

interface StageFloorPlanProps {
    theaterDisplayDimensions?: { width: number; height: number };
    theaterOriginalDimensions?: { width: number; height: number };
}


export function StageFloorPlan(
    {
        theaterDisplayDimensions,
        theaterOriginalDimensions
    }: StageFloorPlanProps
) {
    const getPixelsPerMeter = () => {
        if (!theaterDisplayDimensions || !theaterOriginalDimensions ||
            theaterDisplayDimensions.width === 0 || theaterOriginalDimensions.width === 0) {
            return 0;
        }

        // Calculate the current scale factor (how much the image is scaled from original)
        const displayScale = theaterDisplayDimensions.width / theaterOriginalDimensions.width;

        // Calculate current meters per display pixel
        const metersPerDisplayPixel = METERS_PER_PIXEL / displayScale;
        return 1 / metersPerDisplayPixel;
    };

    const pixelsPerMeter = getPixelsPerMeter();

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                width={VIEWBOX_WIDTH * pixelsPerMeter}
                height={VIEWBOX_HEIGHT * pixelsPerMeter}
                viewBox={`${VIEWBOX_X_OFFSET} ${VIEWBOX_Y_OFFSET} ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
                className="pointer-events-auto"
                style={{
                    position: 'absolute',
                    top: VIEWBOX_Y_OFFSET * pixelsPerMeter,
                    left: VIEWBOX_X_OFFSET * pixelsPerMeter,
                    zIndex: 10,
                }}
            >
                <title>Stage Floor Plan</title>

                {/* 劇場の奥の角 */}
                <circle
                    cx="15.35"
                    cy="1.45"
                    r="0.1"
                    fill="#8B4513"
                />

                {/* 0レベ床（直角多角形） */}
                <polygon
                    points="
                        8.8,1.45
                        8.8,7.2
                        14.95,7.2
                        14.95,7.8
                        16.2,7.8
                        16.2,6.35
                        10.45,6.35
                        10.45,2.75
                        11.35,2.75
                        11.35,1.45
                    "
                    fill="rgba(0, 0, 0, 0.2)"
                    stroke="#555555"
                    strokeWidth="0.08"
                />

                <text x={9.6} y={6.9} fontSize="0.4" fill="#555555" fontWeight="bold">
                    +0 (黒カーペット)
                </text>

                {/* == 1レベ ==  */}
                {/* 平台配置 */}
                <VerticalStageBase x={10.45} y={2.75} />
                <VerticalStageBase x={10.45} y={4.55} />

                <HorizontalStageBase x={11.35} y={1.85} />
                <HorizontalStageBase x={13.15} y={1.85} />

                <HorizontalStageBase x={11.35} y={2.75} />
                <HorizontalStageBase x={11.35} y={3.65} />
                <HorizontalStageBase x={13.15} y={2.75} />
                <HorizontalStageBase x={13.15} y={3.65} />

                <HorizontalStageBase x={11.35} y={4.55} />
                <HorizontalStageBase x={11.35} y={5.45} />
                <HorizontalStageBase x={13.15} y={4.55} />
                <HorizontalStageBase x={13.15} y={5.45} />

                {/* 高さ表記 */}
                <text x={11.6} y={3.4} fontSize="0.5" fill="#6B4F27" fontWeight="bold">
                    +120
                </text>

                {/* パネル(シモ側) */}
                <line
                    x1="11.35"
                    y1="1.85"
                    x2="14.95"
                    y2="1.85"
                    stroke="#D63384"
                    strokeWidth="0.15"
                    strokeLinecap="square"
                />

                {/* パネル(カミ側) */}
                <line
                    x1="14.95"
                    y1="1.85"
                    x2="14.95"
                    y2="2.75"
                    stroke="#D63384"
                    strokeWidth="0.15"
                    strokeLinecap="round"
                />
                <line
                    x1="14.95"
                    y1="2.75"
                    x2="14.95"
                    y2="3.65"
                    stroke="#D63384"
                    strokeWidth="0.05"
                    strokeLinecap="square"
                    strokeDasharray="0.05,0.15"
                />
                <line
                    x1="14.95"
                    y1="3.65"
                    x2="14.95"
                    y2="6.35"
                    stroke="#D63384"
                    strokeWidth="0.15"
                    strokeLinecap="round"
                />

                <text x={12.6} y={1.7} fontSize="0.3" fill="#D63384" fontWeight="bold">
                    +2700パネル
                </text>

                {/* 人形脚 */}
                <line
                    x1="14.95"
                    y1="5.45"
                    x2="15.75"
                    y2="5.45"
                    stroke="#DC2626"
                    strokeWidth="0.1"
                    strokeLinecap="butt"
                />

                <line
                    x1="14.95"
                    y1="6.35"
                    x2="15.75"
                    y2="6.35"
                    stroke="#DC2626"
                    strokeWidth="0.1"
                    strokeLinecap="butt"
                />

            </svg>
        </div>
    );
}
