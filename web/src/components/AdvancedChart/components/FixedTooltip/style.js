import styled from 'styled-components';

export const Wrapper = styled.div`
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    display: grid;
    grid-gap: 5px;
    width: 100%;
    height: 100%;
    padding: 20px;
    grid-template-rows: 10px 20px 1fr;
    grid-template-columns: 20px 100px 100px 10px;
    grid-template-areas:
        'unit value description description'
        'todo value description description'
        'todo value description description';
`;

export const UnitWrapper = styled.div`
    grid-area: unit;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    align-self: center;
    color: ${props => props.profileHeaderWidgetDescriptionTextColor};
    font-size: 25px;
    font-weight: 200;
    font-family: Avenir Next, sans-serif;
`;
export const ValueWrapper = styled.div`
    grid-area: value;
    justify-content: center;
    text-align: left;
    vertical-align: middle;
    align-self: center;
    font-weight: 300;
    font-size: 45px;
    color: ${props => props.profileChartLegendTextColor};
    font-family: Avenir Next, sans-serif;
`;
export const DescriptionWrapper = styled.div`
    grid-area: description;
    color: ${props => props.profileHeaderWidgetDescriptionTextColor};
    font-family: Avenir Next, sans-serif;
`;
