import React from 'react';
import { LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid , Line} from 'recharts';
import Transition from 'react-transition-group/Transition';
import WindowPicker from './../../components/WindowPicker';
import ShortedAPI from '../../services/sapi/client';
import { duration, transitionStyles, Wrapper, PickerWrapper } from './style';
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
            data: fixtures,
            inside: false,
            pickerOptions: {
                values: ['d', 'w', 'm', 'y'],
            },
            dataKeys: fixtures,
            selectedWindow: false,
        }
    }
    handleWindowSeleted(value) {
        this.setState({
            selectedWindow: value,
            data: this.apiClient.getTopShorts(value)
        })
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
                        <WindowPicker
                            options={this.state.pickerOptions}
                            selectedOption={this.state.selectedWindow}
                            handleSelect={(e) => this.handleWindowSeleted(e)}
                        />
                    </PickerWrapper>
                    <ResponsiveContainer aspect={4.0/3.0} width='100%' height={800}>
                        <LineChart data={this.state.data} margin={{top: 10, right: 70, left: 0, bottom: 60}}>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                            <Line onMouseOver={() => this.handleLineHover("TLS")} dot={false} type="monotone" dataKey="TLS" stroke="#8884d8" />
                            <Line onMouseOver={() => this.handleLineHover("CBA")} dot={false} type="monotone" dataKey="CBA" stroke="#82ca9d" />
                            <Line onMouseOver={() => this.handleLineHover("ORE")} dot={false} type="monotone" dataKey="ORE" stroke="#ff9800" />
                            <Line onMouseOver={() => this.handleLineHover("JBH")} dot={false} type="monotone" dataKey="JBH" stroke="#795548" />
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