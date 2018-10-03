import React from 'react';
import { ThemeContext } from 'src/theme-context'
import {TooltipWrapper} from './style';

export class StandardChartTooltip extends React.Component {
    render() {
        const {x, y, dx, dy, selectedLine, datum} = this.props;
        const orientation = y <= 100 ? 'bottom' : 'top';
        const windowWidth = 400;
        const p1_x = x <= windowWidth / 2 ? x + 10 : x - 10;
        const p1_y = orientation === 'top' ? y - 10 : y + 10;
        const p2_x = p1_x;
        const p2_y = orientation === 'top' ? p1_y - 10 : p1_y + 10;
        return <ThemeContext.Consumer>
        {theme => (selectedLine ? (
            <TooltipWrapper>
                <g>
                    <circle fill={theme.profileChartIndicatorCenter} cx={x} cy={y} r="2" />
                    <circle cx={x} cy={y} r="5" stroke={theme.profileChartIndicatorOuter} stroke-width="2" fill="none" />
                </g>
            </TooltipWrapper>
        ) : (
            <g />
        ))}</ThemeContext.Consumer>
    }
}