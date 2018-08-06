import React from 'react';
import { LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid ,Tooltip, Line} from 'recharts';
import Transition from 'react-transition-group/Transition';
import ShortedAPI from '../../services/sapi/client';
import { duration, transitionStyles, Wrapper, PickerWrapper, colors700 } from './style';
/**
 * Chart
 * Component responsible for rendering the page1 graphic displaying the top short positions
 * TODO: add styling to graph currently nothing present
 * 
 */
class TopChart extends React.Component {
    constructor(props) {
        super(props);
        this.apiClient = new ShortedAPI()
        const fixtures = this.apiClient.getTopShorts('w')
        this.state = {
            data: fixtures.data,
            inside: false,
            pickerOptions: {
                values: ['d', 'w', 'm', 'y'],
            },
            datakeys: fixtures.datakeys,
            selectedWindow: false,
        }
    }
    
    componentDidMount() {
        this.toggleEnterState();
    }
    
    toggleEnterState() {
        this.setState({ inside: true });
    }
    handleLineHover(e) {
        console.log(e)
    }

    render() {
        const lines = this.state.datakeys.map( (key, index) => <Line
                key={key}
                onMouseOver={() => this.handleLineHover(key)}
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
                        <LineChart data={this.state.data} margin={{top: 10, right: 70, left: 0, bottom: 60}}>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                            <Tooltip/>
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