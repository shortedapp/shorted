import React from 'react';

const AxisLabel = ({axisType, x, y, width, height, stroke, children}) => {
    const isVert = axisType === 'yAxis';
    const cx = isVert ? x : x + width / 2;
    const cy = isVert ? height / 2 + y : y + height + 10;
    const rot = isVert ? `270 ${cx} ${cy}` : 0;
    return (
        <text
            x={cx}
            y={cy}
            transform={`rotate(${rot})`}
            textAnchor="middle"
            stroke={stroke}>
            {children}
        </text>
    );
};

export default AxisLabel;
