import React from 'react';
import {
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryTooltip,
    VictoryLine,
    VictoryArea,
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
import {TopChartTooltip} from './components';
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
class TopChartVictory extends React.Component {
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
            this.props.onSelectCode(points[0].childName);
        }
    }
    handleLineHover(e, key) {
        console.log('new line slected:', key);
        this.props.onSelectCode(key);
    }
    handleLineExit(e, key) {
        console.log('exiting line', key);
    }

    render() {
        const {data, selectedCode} = this.props;
        var lines = null;
        if (this.props.mode === 'NORMAL') {
            lines = data.dataKeys.map((key, index) => (
                <VictoryLine
                    name={key}
                    key={key}
                    eventKey={key}
                    // labelComponent={<VictoryTooltip />}
                    data={data.data}
                    x="date"
                    y={key}
                    events={[
                        {
                            childName: key,
                            target: 'data',
                            eventHandlers: {
                                onMouseOver: e => this.handleLineHover(e, key),
                                onMouseOut: e => this.handleLineExit(e, key),
                            },
                        },
                    ]}
                    style={{
                        data: {
                            stroke: colors700[index],
                            strokeOpacity:
                                key === selectedCode || !selectedCode ? 1 : 0.2,
                            strokeWidth: 2,
                        },
                    }}
                />
            ));
        } else if (this.props.mode === 'AREA') {
            lines = data.dataKeys.map((key, index) => (
                <VictoryArea
                    key={key}
                    data={data.data}
                    x="date"
                    y={key}
                    events={[
                        {
                            target: 'parent',
                            eventHandlers: {
                                onMouseOver: e => this.handleLineHover(e, key),
                            },
                        },
                    ]}
                    style={{
                        data: {
                            stroke: colors700[index],
                            fill: colors700[index],
                            fillOpacity: 0.3,
                            strokeWidth: 2,
                        },
                    }}
                />
            ));
        }
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
                                    <PickerWrapper>
                                        {this.props.picker}
                                    </PickerWrapper>
                                    <OptionsWrapper>
                                        {this.props.options}
                                    </OptionsWrapper>
                                    <ChartWrapper>
                                        <VictoryChart
                                            padding={{
                                                top: 10,
                                                left: 20,
                                                right: 10,
                                                bottom: 20,
                                            }}
                                            containerComponent={
                                                <VictoryVoronoiContainer
                                                    radius={10}
                                                    padding={10}
                                                    labels={d => ``}
                                                    onActivated={(
                                                        points,
                                                        props,
                                                    ) =>
                                                        this.handleVoronoiSelect(
                                                            points,
                                                            props,
                                                        )
                                                    }
                                                    labelComponent={
                                                        <VictoryTooltip
                                                            flyoutComponent={
                                                                <TopChartTooltip
                                                                    selectedCode={
                                                                        selectedCode
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
                                            {lines}
                                            <VictoryAxis
                                                padding={{bottom: 30}}
                                                standalone={false}
                                                tickCount={5}
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
                                                tickFormat={t =>
                                                    `${Math.round(t)}`
                                                }
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
                                                }}
                                            />
                                        </VictoryChart>
                                    </ChartWrapper>
                                </Wrapper>
                            );
                        }}
                    </Transition>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default TopChartVictory;
