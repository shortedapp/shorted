import React from 'react';
import {FaExclamationTriangle, FaChartLine} from 'react-icons/fa';
import {ThemeContext} from 'src/theme-context';
import {Wrapper, IconWrapper, TypeWrapper, DescriptionWraper} from './style';

export const Row = props => {
    console.log(props.data);
    var icon;
    if (props.data.type === 'Technical Analysis' || props.data.type === 'Short Position') {
        icon = <IconWrapper color={'#66BB6A'}><FaChartLine /></IconWrapper>;
    } else if (props.data.type === 'Anomalous Behavior') {
        icon = <IconWrapper color={'#FF7043'}><FaExclamationTriangle /></IconWrapper>;
    }
    return (<ThemeContext.Consumer>
        {theme => (
        <Wrapper {...theme} >
            {icon}
            <TypeWrapper {...theme}>{props.data.type}</TypeWrapper>
            <DescriptionWraper {...theme}>{props.data.name}</DescriptionWraper>
        </Wrapper>)}</ThemeContext.Consumer>
    );
};

export default Row;
