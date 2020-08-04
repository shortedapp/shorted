import React from 'react';
import {ThemeContext} from 'src/theme-context';
import {TooltipWrapper} from './style';

export class StandardChartTooltip extends React.Component {
    render() {
        console.log('standardChartTooltip:render:');
        const {x, y, dx, dy, selectedLine, datum} = this.props;
        const orientation = y <= 100 ? 'bottom' : 'top';
        const windowWidth = 400;
        const p1_x = x <= windowWidth / 2 ? x + 10 : x - 10;
        const p1_y = orientation === 'top' ? y - 10 : y + 10;
        const p2_x = p1_x;
        const p2_y = orientation === 'top' ? p1_y - 10 : p1_y + 10;
        return (
            <ThemeContext.Consumer>
                {theme =>
                    selectedLine ? (
                        <TooltipWrapper>
                            <g>
                                <circle
                                    fill={theme.profileChartIndicatorCenter}
                                    cx={x}
                                    cy={y}
                                    r="2.5"
                                />
                                <circle
                                    cx={x}
                                    cy={y}
                                    r="6"
                                    stroke={theme.profileChartIndicatorOuter}
                                    strokeWidth="2"
                                    fill="none"
                                    opacity="0.8"
                                />
                            </g>
                        </TooltipWrapper>
                    ) : (
                        <g />
                    )
                }
            </ThemeContext.Consumer>
        );
    }
}
