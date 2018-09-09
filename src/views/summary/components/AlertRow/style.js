import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    display: grid;
    @media only screen and (min-width: 1024px) {
        grid-template-columns: 90px 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: 'code name name percentage indicator graph';
    }
    @media only screen and (min-width: 1280px) {
        grid-template-columns: 90px 1fr 200px 120px 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: 'code name percentage indicator graph';
    }

    margin: 3px;
    margin-left: 7px;
    margin-right: 7px;
    height: 20px;
    background: ${props => props.widgetBackgroundColor};
    padding-top: 4px;
    padding-bottom: 4px;
    .code {
        grid-area: code;
    }
    .company-name {
        grid-area: name;
    }
    .percentage {
        grid-area: percentage;
        text-align: right;
        margin-right: 20px;
    }
    .indicator {
        grid-area: indicator;
    }
    .graph {
        grid-area: graph;
    }
`;

export const Wrapper = styled.div`
    display: grid;
    background: ${props => props.widgetRowBackgroundColor};
    border: 1px solid ${props => props.widgetRowBorderColor};
    @media only screen and (min-width: 1024px) {
        grid-template-columns: 90px 1fr 200px 120px 1fr;
        grid-template-rows: repeat(2, 1fr);
        grid-template-areas:
            'code name name percentage indicator graph'
            'code name name percentage indicator graph';
    }
    @media only screen and (min-width: 1280px) {
        grid-template-columns: 90px 1fr 200px 120px 1fr;
        grid-template-rows: repeat(2, 1fr);
        grid-template-areas:
            'code name percentage indicator graph'
            'code name percentage indicator graph';
    }

    margin: 2px;
    margin-left: 7px;
    margin-right: 7px;
    padding-top: 4px;
    padding-bottom: 4px;
`;
export const WrapperHovered = styled.div`
    display: grid;
    background: ${props => props.widgetRowBackgroundColor};
    border: 1px solid ${props => props.widgetRowBorderColor};
    transform: scale(1.03);
    @media only screen and (min-width: 1024px) {
        grid-template-columns: 90px 1fr 200px 120px 1fr;
        grid-template-rows: repeat(2, 1fr);
        grid-template-areas:
            'code name name percentage indicator graph'
            'code name name percentage indicator graph';
    }
    @media only screen and (min-width: 1280px) {
        grid-template-columns: 90px 1fr 200px 120px 1fr;
        grid-template-rows: repeat(2, 1fr);
        grid-template-areas:
            'code name percentage indicator graph'
            'code name percentage indicator graph';
    }

    margin: 2px;
    margin-left: 7px;
    margin-right: 7px;
    padding-top: 4px;
    padding-bottom: 4px;
    transition-duration: 0.1s;
    -webkit-box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.25);
    box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.25);
`;
export const Graph = styled.div`
    grid-area: graph;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Name = styled.div`
    grid-area: name;
    display: flex;
    font-size: 16px;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
    font-family: Avenir Next, sans-serif;
`;

export const Code = styled.div`
    grid-area: code;
    display: flex;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
    padding-left: 10px;
    .code {
        background-color: gray;
        width: 60px;
        height: 45px;
        display: flex;
        font-size: 21px;

        font-family: Avenir Next, sans-serif;
        flex-direction: column;
        justify-content: center;
        vertical-align: middle;
        text-align: center;
        margin-left: 5px;
    }
`;
export const Percentage = styled.div`
    grid-area: percentage;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 1px;
    grid-template-areas:
        'current'
        'changed';
`;
export const PercentageCurrent = styled.div`
    grid-area: current;
    font-size: 25px;
    display: flex;
    float: right;
    justify-content: flex-end;
    font-weight: bold;
    font-family: Avenir Next, sans-serif;
`;
export const PercentageChanged = styled.div`
    grid-area: changed;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    justify-content: flex-end;
    font-family: Avenir Next, sans-serif;
    color: ${props => (props.value > 0 ? `red` : `green`)};
    padding-bottom: 5px;
`;
export const IndicatorUp = styled.div`
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 30px solid red;
`;
export const IndicatorDown = styled.div`
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-top: 30px solid green;
`;

export const IndicatorWrapper = styled.div`
    grid-area: indicator;
    @media (min-width: 1024px) {
        display: grid;
    }
    display: none;
    flex-direction: column;
    text-align: center;
    vertical-align: middle;
    justify-content: center;
    margin: auto;
    padding: auto;
`;
