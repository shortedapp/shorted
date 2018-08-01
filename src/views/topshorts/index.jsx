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

/**
 * View:TopShorts
 * Overarching container for the top short view. Showing the top 10 short positions graphically.
 * TODO:
 * * add Transitions of components such as window picker, graph and background etc.
 * * add graph integration via recharts etc.
 * * add legend component for on-select animation/effect
 * 
 */
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
                        selectedOption={this.state.selectedWindow}
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
