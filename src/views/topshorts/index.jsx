import React from 'react';
import Transition from 'react-transition-group/Transition';

import AppViewWrapper from './../../components/AppViewWrapper';
import WindowPicker from './../../components/WindowPicker';
import { TopShortsWrapper } from './style';

class TopShorts extends React.Component {


    render() {
        return (
        <AppViewWrapper>
            <TopShortsWrapper>
                <div className="picker">
                    <WindowPicker />
                </div>
                <div className="graph-area">
                graph goes here
                </div>
                
            </TopShortsWrapper>
        </AppViewWrapper>
            )
            
    }
}


export default TopShorts;
