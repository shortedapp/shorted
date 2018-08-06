import React from 'react';

import {
    Wrapper,
    Code,
    Name,
    Percent
    } from './style';

/**
 * Renders a specfiic row that is contained within the TopSHortList view. This will show
 * the current short percentage of a given stock within the top x number of short positions
 * takes a data prop which contains the following payload:
 * data = {
 *  name: "JBHIFI LIMITED",
 *  code: "JBH",
 *  percentage: 19.6
 * }
 */

class TopShortListRow extends React.Component {

    render() {
        return (
            <Wrapper>
                <Code><div className="code">{this.props.code}</div></Code>
                <Name>{this.props.name}</Name>
                <Percent><div className="circle" >{this.props.percent}%</div></Percent>
            </Wrapper>)
    }
}

export default TopShortListRow;