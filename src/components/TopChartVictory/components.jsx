import React from 'react';

export class TopChartTooltip extends React.Component {
    render() {
        const {x, y, orientation } = this.props;
        const newY = orientation === "top" ? y - 25 : y + 25;
        return (
          <g>
            <circle cx={x} cy={newY} r="20" stroke="tomato" fill="none"/>
            <circle cx={x} cy={newY} r="25" stroke="orange" fill="none"/>
            <circle cx={x} cy={newY} r="30" stroke="gold" fill="none"/>
          </g>
        );
    }
}