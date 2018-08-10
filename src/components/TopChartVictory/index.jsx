import React from 'react';
import { VictoryChart, VictoryAxis, VictoryLabel, VictoryContainer, VictoryLine } from 'victory';
import Transition from 'react-transition-group/Transition';
import ShortedAPI from '../../services/sapi/client';
import {
    duration,
    transitionStyles,
    Wrapper,
    PickerWrapper,
    colors700 } from './style';
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
        this.apiClient = new ShortedAPI()
        this.state = {
            inside: false,
        }
    }
    componentDidMount() {
        this.toggleEnterState();
    }
    
    toggleEnterState() {
        this.setState({ inside: true });
    }
    handleLineHover(e, key) {
        console.log(e, key)
        this.props.onSelectCode(key)
    }

    render() {
        const { selectedOption } = this.props;
        const fixtures = this.apiClient.getTopShorts(selectedOption)
        console.log(fixtures.data.length)
        const lines = fixtures.dataKeys.map( (key, index) => <VictoryLine
                key={key}
                data={fixtures.data.map((row) => ({ x: row.date, y: row[key]}))}
                data={fixtures.data}
                x="date"
                y={key}
                events={
                    [{
                        target: "parent",
                        eventHandlers: {
                            onMouseOver: (e) => this.handleLineHover(e, key)
                        }
                    }]
                }
                type="monotone"
                style={{
                    data: {
                        stroke: colors700[index],
                        strokeWidth: 2
                    }
                }} />)
        return (
        <Transition timeout={duration} in={true} appear={true}>
            {
                state => {
                    return (
                    <Wrapper
                        duration={duration}
                        {...transitionStyles[state]}
                    >
                    <PickerWrapper >
                        {this.props.picker}
                    </PickerWrapper>
                        <VictoryChart padding={{ top: 0, left: 40, right: 20, bottom: 50 }} height={350}
                        containerComponent={<VictoryContainer responsive={true}/>}
                        >
                            {lines}
                            <VictoryAxis
                                scale="time"
                                standalone={false}
                                tickCount={5}
                                style={{
                                    axis: {stroke: "#756f6a"},
                                    axisLabel: {fontSize: 20, padding: 30},
                                    ticks: {stroke: "grey", size: 5},
                                    tickLabels: {fontSize: 10, padding: 5}
                                }}
                             />
                        </VictoryChart>
                    </Wrapper>)
                }
            }
        </Transition>
        )
    }
}

export default TopChartVictory;