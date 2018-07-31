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
            pickerOptions: {
                values: ['d', 'w', 'm', 'y'],
            },
            selectedWindow: false,
        }
    }
    handleWindowSeleted(value) {
        console.log(value)
        this.setState({selectedWindow: value})
    }

    render() {
        return (
        <AppViewWrapper>
            <TopShortsWrapper>
                <PickerWrapper >
                    <WindowPicker
                        options={this.state.pickerOptions}
                        handleSelect={(e) => this.handleWindowSeleted(e)}
                    />
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
