import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    display: grid;
    color: ${props => props.textColor};
    grid-template-columns: 77px 85px 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'code percentage indicator';
    margin: 2px;
    margin-left: 7px;
    margin-right: 7px;
    padding-top: 4px;
    padding-bottom: 4px;
    height: 40px;
    .code {
        grid-area: code;
        margin-left: 5px;
        width: 60px;
        text-align: center;
    }
    .percentage {
        grid-area: percentage;
        margin-right: 30px;
        text-align: right;
    }
    .indicator {
        grid-area: indicator;
    }
`;
export const Wrapper = styled.div`
    display: grid;
    color: ${props => props.textColor};
    background: ${props => props.widgetRowBackgroundColor};
    border: 1px solid ${props => props.widgetRowBorderColor};
    grid-template-columns: 77px 85px 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
        'code percentage indicator'
        'code percentage indicator';
    margin: 2px;
    margin-left: 7px;
    margin-right: 7px;
    padding-top: 4px;
    padding-bottom: 4px;
`;
export const WrapperHovered = styled.div`
    display: grid;
    color: ${props => props.textColor};
    background: ${props => props.widgetRowBackgroundColor};
    border: 1px solid ${props => props.widgetRowBorderColor};
    grid-template-columns:77px 85px 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
        'code percentage indicator'
        'code percentage indicator';
    margin: 2px;
    transform: scale(1.05);
    margin-left: 7px;
    margin-right: 7px;
    padding-top: 4px;
    padding-bottom: 4px;
    transition-duration: 0.1s;
    -webkit-box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.25);
    box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.25);
`;

export const Name = styled.div`
    grid-area: name;
    display: flex;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
`;

export const Code = styled.div`
    grid-area: code;
    display: flex;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
    .code {
        background-color: gray;
        width: 60px;
        height: 45px;
        display: flex;
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
    margin-right: 20px;
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 1px;
    grid-template-areas:
        'current'
        'changed';
`;
export const PercentageCurrent = styled.div`
    grid-area: current;
    display: flex;
    float: right;
    justify-content: flex-end;
    font-weight: bold;
    font-size: 21px;
    font-weight: bold;
    font-family: Avenir Next, sans-serif;
`;
export const PercentageChanged = styled.div`
    grid-area: changed;
    display: flex;
    justify-content: flex-end;
    margin-left: 17px;
    font-weight: bold;
    font-family: Avenir Next, sans-serif;
    color: ${props => (props.value > 0 ? `red` : `green`)};
    padding-bottom: 10px;
`;
export const IndicatorUp = styled.div`
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid red;
`;
export const IndicatorDown = styled.div`
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid green;
`;

export const IndicatorWrapper = styled.div`
    grid-area: indicator;
    display: grid;
    flex-direction: column;
    text-align: center;
    vertical-align: middle;
    justify-content: center;
    margin: auto;
    padding: auto;
`;
