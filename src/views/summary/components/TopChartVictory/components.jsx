import React from 'react';
import {TooltipWrapper} from './style';
import {Sector} from 'recharts';

export class TopChartTooltip extends React.Component {
    render() {
        const {x, y, dx, dy, selectedCode, datum} = this.props;
        const orientation = y <= 100 ? 'bottom' : 'top';
        const windowWidth = 400;
        const p1_x = x <= windowWidth / 2 ? x + 10 : x - 10;
        const p1_y = orientation === 'top' ? y - 10 : y + 10;
        const p2_x = p1_x;
        const p2_y = orientation === 'top' ? p1_y - 10 : p1_y + 10;
        return selectedCode ? (
            <TooltipWrapper>
                <g>
                    <path
                        d={`M ${x},${y} L ${p1_x},${p1_y} L ${p2_x}, ${p2_y}`}
                        stroke={'black'}
                        fill="none"
                    />
                    <circle cx={x} cy={y} r="1.5" />
                    <circle cx={p1_x} cy={p1_y} r="1.5" />
                    <circle cx={p2_x} cy={p2_y} r="1.5" />
                    <rect
                        stroke={'#282626'}
                        rx={15}
                        ry={15}
                        className="tooltip-card"
                        x={p2_x - 50}
                        y={orientation === 'top' ? p2_y - 45 : p2_y}
                        width="100"
                        height="45"
                    />
                    <text
                        className="header"
                        x={p2_x}
                        y={orientation === 'top' ? p2_y - 30 : p2_y + 15}
                        fontSize={15}
                        textAnchor={'middle'}>
                        {this.props.datum.date}
                    </text>
                    <text
                        x={p2_x}
                        y={orientation === 'top' ? p2_y - 10 : p2_y + 35}
                        textAnchor={'middle'}>
                        <tspan className="issuerCode">{`${selectedCode}: `}</tspan>
                        <tspan className="value">
                            {`${this.props.datum[selectedCode]}`}%
                        </tspan>
                    </text>
                </g>
            </TooltipWrapper>
        ) : (
            <g />
        );
    }
}
