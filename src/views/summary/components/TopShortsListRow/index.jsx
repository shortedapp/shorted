import React from 'react';

import {Wrapper, WrapperHovered, Code, Name, Percent} from './style';

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

const TopShortListRow = props => {
    const { theme }  = props;
    return props.isHovered ? (
        <WrapperHovered
            {...theme}
            onMouseOver={props.onHover}
            href={`/${props.code}`}>
            <Code>
                <div className="code">{props.code}</div>
            </Code>
            <Name>{props.name}</Name>
            <Percent>
                <div className="circle">{props.current}%</div>
            </Percent>
        </WrapperHovered>
    ) : (
        <Wrapper
            {...theme}
            onMouseOver={props.onHover}>
            <Code>
                <div className="code">{props.code}</div>
            </Code>
            <Name>{props.name}</Name>
            <Percent>
                <div className="circle">{props.current}%</div>
            </Percent>
        </Wrapper>
    );
};

export default TopShortListRow;
