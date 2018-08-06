import React from 'react';
import { LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid ,Tooltip, Line, Label} from 'recharts';
import Transition from 'react-transition-group/Transition';
import ShortedAPI from '../../services/sapi/client';
import AxisLabel from '../../components/AxisLabel';
import { duration, transitionStyles, Wrapper, PickerWrapper, colors700 } from './style';
/**
 * Chart
 * Component responsible for rendering the page1 graphic displaying the top short positions
 * TODO:
 *   * add more styling to graph currently nothing present
 *   * add more intelligent x-axis ticks as windowpicker is changed
 * 
 * 
 */
class TopChart extends React.Component {
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
        const fixtures = this.apiClient.getTopShorts(this.props.selectedOption)
        const lines = fixtures.dataKeys.map( (key, index) => <Line
                key={key}
                onMouseOver={(e) => this.handleLineHover(e, key)}
                dot={false}
                type="monotone"
                dataKey={key}
                strokeWidth={3}
                stroke={colors700[index]}>
                </Line>)
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
                    <ResponsiveContainer aspect={4.0/3.0} width='100%' height={800}>
                        <LineChart data={fixtures.data} margin={{top: 0, right: 50, left: 10, bottom: 0}}>
                            <XAxis dataKey="date" tickCount={3} >
                                <Label value="Time" offset={-20} position="insideBottom" />
                            </XAxis>
                            <YAxis label={{
                                value: 'Shorted (%)',
                                angle: -90,
                                position: 'insideLeft',
                                offset: 10,
                                }} />
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                            <Tooltip />
                            {lines}
                        </LineChart>
                    </ResponsiveContainer>
                    </Wrapper>)
                }
            }
        </Transition>
        )
    }
}

export default TopChart;