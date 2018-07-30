import React from 'react';
import Transition from 'react-transition-group/Transition';
import { 
    TopShortsWrapper,
    PickerWrapper,
    ChartWrapper,
 } from './style';

import AppViewWrapper from './../../components/AppViewWrapper';
import WindowPicker from './../../components/WindowPicker';
import TopChart from './../../components/TopChart';


class TopShorts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picker: {
                values: ['d', 'w', 'm', 'y'],
                selected: false
            }
        }
    }

    render() {
        return (
        <AppViewWrapper>
            <TopShortsWrapper>
                <PickerWrapper >
                    <WindowPicker picker={this.state.picker}/>
                </PickerWrapper>
                <ChartWrapper >
                   <TopChart />
                </ChartWrapper>      
            </TopShortsWrapper>
        </AppViewWrapper>
            )
            
    }
}


export default TopShorts;
