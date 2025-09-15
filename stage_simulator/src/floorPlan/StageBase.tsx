export function VerticalStageBase({ x, y }: { x: number; y: number }) {
    return (
        <rect
            x={x}
            y={y}
            width="0.9"
            height="1.8"
            fill="rgba(139, 111, 71, 0.25)"
            stroke="#8B6F47"
            strokeWidth="0.05"
        />
    )
}

export function HorizontalStageBase({ x, y }: { x: number; y: number }) {
    return (
        <rect
            x={x}
            y={y}
            width="1.8"
            height="0.9"
            fill="rgba(139, 111, 71, 0.25)"
            stroke="#8B6F47"
            strokeWidth="0.05"
        />
    )
}
