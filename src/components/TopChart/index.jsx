import React from 'react';
import { LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid , Line} from 'recharts';
import topShorts from '../../fixtures/topShortsFormatted.json';
/**
 * Chart
 * Component responsible for rendering the page1 graphic displaying the top short positions
 * TODO: add styling to graph currently nothing present
 * 
 */

class TopChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: topShorts }
        console.log(topShorts)
    }

    render() {
        return (
        <div>
        <ResponsiveContainer aspect={4.0/3.0} width='100%'>
           <LineChart data={this.state.data} margin={{top: 10, right: 70, left: 0, bottom: 60}}>
            <XAxis dataKey="date"/>
            <YAxis/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="TLS" stroke="#8884d8" />
            <Line type="monotone" dataKey="CBA" stroke="#82ca9d" />
            <Line type="monotone" dataKey="ORE" stroke="#ff9800" />
            <Line type="monotone" dataKey="JBH" stroke="#795548" />
        </LineChart>
        </ResponsiveContainer>
        </div>)
    }
}

export default TopChart;