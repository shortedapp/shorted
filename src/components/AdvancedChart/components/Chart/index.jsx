import React from 'react';
import {
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryTooltip,
    VictoryLine,
    VictoryArea,
    VictoryContainer,
    VictoryCursorContainer,
    VictoryVoronoiContainer,
} from 'victory';
import Transition from 'react-transition-group/Transition';
import {ThemeContext} from '../../../../theme-context';
import {
    duration,
    transitionStyles,
    Wrapper,
    PickerWrapper,
    ChartWrapper,
    OptionsWrapper,
    colors700,
    colors300,
} from './style';
import {StandardChartTooltip} from './components';
import {
    findMinMax,
    getMonthlyNameShort,
    getYearlyNameShort,
} from '../../../../utils';

/**
 * Chart
 * Component responsible for rendering the page1 graphic displaying the top short positions
 * TODO:
 *   * add more styling to graph currently nothing present
 *   * add more intelligent x-axis ticks as windowpicker is changed
 *   * refactor to use victory charts
 *   * multiple display modes such as candleStick etc.
 *   * implement brush and zoom
 *   * implement select to zoom
 *   * implement hover filtering/hiding other lines
 *
 *
 */
class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inside: false,
            windowWidth: 1700,
        };
        this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    }
    componentWillUnmount() {
        typeof window !== 'undefined' &&
            window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    handleWindowSizeChange() {
        typeof window !== 'undefined' &&
            setTimeout(this.setState({windowWidth: window.innerWidth}));
    }
    componentDidMount() {
        typeof window !== 'undefined' &&
            setTimeout(
                window.addEventListener('resize', this.handleWindowSizeChange),
            );
        this.toggleEnterState();
    }

    toggleEnterState() {
        this.setState({inside: true});
    }
    handleVoronoiSelect(points, props) {
        if (points[0]) {
            console.log('voronio snapped to', points[0].childName);
            this.props.onSelectLine(points[0].childName, points[0].y);
        }
    }
    handleLineHover(e, key) {
        console.log('new line slected:', key);
        this.props.onSelectLine(key);
    }
    handleLineExit(e, key) {
        console.log('exiting line', key);
    }
    getXaxis(t, window) {
        // console.log(window)
        // console.log(t)
        switch (window) {
            case 'm':
                return getMonthlyNameShort(t);
            case 'y':
                return getYearlyNameShort(t);
            default:
                return t;
        }
    }

    render() {
        const {data, selectedLine, selectedWindowOption} = this.props;
        const [min, max] = findMinMax(data);
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <Transition timeout={duration} in appear>
                        {state => {
                            return (
                                <Wrapper
                                    {...theme}
                                    duration={duration}
                                    {...transitionStyles[state]}>
                                    <VictoryChart
                                        padding={{
                                            top: 0,
                                            left: 20,
                                            right: 10,
                                            bottom: 20,
                                        }}
                                        width={650}
                                        height={280}
                                        containerComponent={
                                            <VictoryVoronoiContainer
                                                radius={10}
                                                padding={10}
                                                labels={d => ``}
                                                onActivated={(points, props) =>
                                                    this.handleVoronoiSelect(
                                                        points,
                                                        props,
                                                    )
                                                }
                                                labelComponent={
                                                    <VictoryTooltip
                                                        flyoutComponent={
                                                            <StandardChartTooltip
                                                                selectedLine={
                                                                    selectedLine ||
                                                                    'standard'
                                                                }
                                                                dataKeys={
                                                                    data.dataKeys
                                                                }
                                                            />
                                                        }
                                                        cornerRadius={0}
                                                        flyoutStyle={{
                                                            fill: 'white',
                                                        }}
                                                    />
                                                }
                                            />
                                        }>
                                        <svg>
                                            <defs>
                                                <filter id="glow">
                                                    <feGaussianBlur
                                                        className="blur"
                                                        result="coloredBlur"
                                                        stdDeviation="4"
                                                    />
                                                    <feComponentTransfer>
                                                        <feFuncA
                                                            type="linear"
                                                            slope="0.4"
                                                        />
                                                    </feComponentTransfer>
                                                    <feMerge>
                                                        <feMergeNode />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>
                                            </defs>
                                        </svg>

                                        <VictoryAxis
                                            padding={{bottom: 30}}
                                            tickCount={5}
                                            tickFormat={t =>
                                                this.getXaxis(
                                                    t,
                                                    selectedWindowOption,
                                                )
                                            }
                                            style={{
                                                axis: {
                                                    stroke: theme.axisColor,
                                                },
                                                ticks: {
                                                    stroke: theme.axisColor,
                                                    size: 5,
                                                },
                                                tickLabels: {
                                                    fontSize: 7,
                                                    padding: 5,
                                                    fill: theme.axisColor,
                                                },
                                            }}
                                        />

                                        <VictoryAxis
                                            dependentAxis
                                            standalone={false}
                                            tickFormat={t => `${Math.round(t)}`}
                                            tickLabelComponent={
                                                <VictoryLabel />
                                            }
                                            style={{
                                                axis: {
                                                    stroke: theme.axisColor,
                                                },
                                                ticks: {
                                                    stroke: theme.axisColor,
                                                    size: 5,
                                                },
                                                tickLabels: {
                                                    fontSize: 7,
                                                    padding: 4,
                                                    fill: theme.axisColor,
                                                },
                                                grid: {
                                                    stroke:
                                                        theme.profileChartGridColor,
                                                    opacity: 0.8,
                                                    strokeWidth: 2,
                                                },
                                            }}
                                        />
                                        <VictoryLine
                                            dependentAxis
                                            width={1100}
                                            height={900}
                                            name="standard"
                                            key="standard"
                                            data={data}
                                            domain={{y: [min - 2, max + 2]}}
                                            events={[
                                                {
                                                    childName: 'standard',
                                                    target: 'data',
                                                    eventHandlers: {
                                                        onMouseOver: e =>
                                                            this.handleLineHover(
                                                                e,
                                                                'standard',
                                                            ),
                                                        onMouseOut: e =>
                                                            this.handleLineExit(
                                                                e,
                                                                'standard',
                                                            ),
                                                    },
                                                },
                                            ]}
                                            style={{
                                                data: {
                                                    //stroke: colors700[0],
                                                    stroke:
                                                        theme.profileChartLineColor,
                                                    strokeOpacity:
                                                        selectedLine ===
                                                            'standard' ||
                                                        !selectedLine
                                                            ? 1
                                                            : 0.2,
                                                    strokeWidth: 2,
                                                    filter: 'url(#glow)',
                                                },
                                            }}
                                        />
                                    </VictoryChart>
                                </Wrapper>
                            );
                        }}
                    </Transition>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default Chart;
