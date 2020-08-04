import React from 'react';
import { VictoryPie } from 'victory';
import {
    Wrapper} from './style';

/**
 * Top Navbar responsible for rendering the basic site-map layout including: blog | about | disclaimer etc
 * Will also manage the implementation of the navbar collapse on mobile devices i.e transition to burger and burger animation on open/close etc.
 * TODO:
 * * handle mobile compaction of navbar component
 *
 */
class SectorPieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <Wrapper>
             <svg viewBox="0 0 400 400">
             <VictoryPie
                standalone={false}
                width={400} height={400}
                data={[
                    { x: 1, y: 120 }, { x: 2, y: 150 }, { x: 3, y: 75 }
                ]}
                innerRadius={68} labelRadius={100}
                style={{ labels: { fontSize: 20, fill: "white" } }}
            />
            <VictoryPie
                standalone={false}
                width={200} height={200}
                data={[
                    { x: 1, y: 120 }, { x: 2, y: 150 }, { x: 3, y: 75 }
                ]}
                innerRadius={68} labelRadius={100}
                style={{ labels: { fontSize: 20, fill: "white" } }}
            />
             </svg>
            
        </Wrapper>;
    }
}

export default SectorPieChart;
