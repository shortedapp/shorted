import React from 'react';
import {FaExclamationTriangle, FaChartLine} from 'react-icons/fa';
import { Icon } from 'antd';
import {ThemeContext} from 'src/theme-context';
import {Wrapper, IconWrapper, TypeWrapper, DescriptionWraper, DirectionWrapper, ValueWrapper} from './style';

export const Row = props => {
    console.log(props.data);
    var icon;
    if (props.data.type === 'Technical Analysis' || props.data.type === 'Short Position') {
        icon = <IconWrapper color={'#66BB6A'}><Icon type="line-chart" style={{ fontSize: 18, color: 'white'}} theme="outlined"/></IconWrapper>;
    } else if (props.data.type === 'Anomalous Behavior') {
        icon = <IconWrapper color={'#FF7043'}><Icon type="alert" style={{ fontSize: 18, color: 'white'}} theme="outlined"/></IconWrapper>;
    }
    return (<ThemeContext.Consumer>
        {theme => (
        <Wrapper {...theme} >
            {icon}
            <TypeWrapper {...theme}>{props.data.type}</TypeWrapper>
            <DescriptionWraper {...theme}>{props.data.name}</DescriptionWraper>
            <DirectionWrapper>{props.data.value > 0 ? <Icon type="rise" style={{ fontSize: 18, color: 'red' }} /> : <Icon type="fall" style={{ fontSize: 18, color: 'green' }}/>}</DirectionWrapper>
            <ValueWrapper positive={props.data.value > 0}>{Math.abs(props.data.value)}</ValueWrapper>
        </Wrapper>)}</ThemeContext.Consumer>
    );
};

export default Row;
