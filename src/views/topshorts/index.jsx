import React from 'react';
import Transition from 'react-transition-group/Transition';

import AppViewWrapper from './../../components/AppViewWrapper';
import { TopShortsWrapper } from './style';

class TopShorts extends React.Component {


    render() {
        return (
        <AppViewWrapper>
            <TopShortsWrapper>
                <div className="picker">
                picker goes here
                </div>
                <div className="graph">
                graph goes here
                </div>
                
            </TopShortsWrapper>
        </AppViewWrapper>
            )
            
    }
}


export default TopShorts;
