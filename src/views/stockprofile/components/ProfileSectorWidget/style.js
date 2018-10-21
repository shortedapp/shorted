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
    grid-template-rows: 10px 20px 1fr 1fr;
    grid-template-columns: 20px 0.6fr 1fr 10px;
    grid-template-areas:
        'widget-unit widget-value widget-graph widget-info'
        'todo widget-value widget-graph widget-info'
        'widget-description widget-description widget-graph widget-info'
        'widget-description widget-description widget-graph widget-info';
`;

export const WidgetUnitWrapper = styled.div`
    grid-area: widget-unit;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    align-self: center;
    color: ${props => props.profileHeaderWidgetDescriptionTextColor};
    font-size: 20px;
    font-weight: 200;
    font-family: Avenir Next, sans-serif;
`;
export const WidgetValueWrapper = styled.div`
    grid-area: widget-value;
    justify-content: center;
    text-align: left;
    vertical-align: middle;
    align-self: center;
    font-weight: 300;
    font-size: 30px;
    color: ${props => props.profileHeaderWidgetValueTextColor};
    font-family: Avenir Next, sans-serif;
`;
export const WidgetGraphWrapper = styled.div`
    grid-area: widget-graph;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    align-self: center;
`;
export const WidgetDescriptionWrapper = styled.div`
    grid-area: widget-description;
    color: ${props => props.profileHeaderWidgetDescriptionTextColor};
    font-weight: 300;
    font-size: 13px;
    font-family: Avenir Next, sans-serif;
`;
export const WidgetInfoWrapper = styled.div`
    grid-area: widget-info;
    position: relative;
    top: -10px;
    left: 10px;
`;
