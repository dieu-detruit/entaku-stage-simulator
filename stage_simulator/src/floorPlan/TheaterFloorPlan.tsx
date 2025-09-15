import { useEffect, useRef, useState } from "react";

interface TheaterFloorPlanProps {
    onDimensionsChange?: (dimensions: {
        display: { width: number; height: number },
        original: { width: number; height: number }
    }) => void;
}

export function TheaterFloorPlan({ onDimensionsChange }: TheaterFloorPlanProps) {
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [displayDimensions, setDisplayDimensions] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load image to get natural dimensions
        const img = new Image();
        img.onload = () => {
            setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.src = "/theater_floor_plan.png";
    }, []);

    useEffect(() => {
        const updateDisplayDimensions = () => {
            if (!containerRef.current || imageDimensions.width === 0 || imageDimensions.height === 0) return;

            const container = containerRef.current;
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;

            // Calculate scale to fit image within container while maintaining aspect ratio
            const scaleX = containerWidth / imageDimensions.width;
            const scaleY = containerHeight / imageDimensions.height;
            const scale = Math.min(scaleX, scaleY);

            const displayWidth = imageDimensions.width * scale;
            const displayHeight = imageDimensions.height * scale;

            setDisplayDimensions({ width: displayWidth, height: displayHeight });

            // Notify parent component of dimension changes
            if (onDimensionsChange) {
                onDimensionsChange({
                    display: { width: displayWidth, height: displayHeight },
                    original: { width: imageDimensions.width, height: imageDimensions.height }
                });
            }
        };

        updateDisplayDimensions();

        // Update on window resize
        const handleResize = () => updateDisplayDimensions();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [imageDimensions, onDimensionsChange]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0"
        >
            <img
                src="/theater_floor_plan.png"
                alt="Theater Floor Plan"
                style={{
                    width: displayDimensions.width,
                    height: displayDimensions.height,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
                className="object-contain"
            />
        </div>
    );
}
