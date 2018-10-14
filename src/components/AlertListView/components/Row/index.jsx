import React from 'react';
import {FaExclamationTriangle, FaChartLine} from 'react-icons/fa';
import {Wrapper, IconWrapper} from './style';

export const Row = props => {
    console.log(props.data);
    var icon;
    if (props.data.type === 'technical' || props.data.type === 'price') {
        icon = <FaChartLine />;
    } else if (props.data.type === 'anomaly') {
        icon = <FaExclamationTriangle />;
    }
    return (
        <Wrapper>
            <IconWrapper>content</IconWrapper>
        </Wrapper>
    );
};

export default Row;
