import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 120px 60px 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
        'code percentage indicator'
        'code percentage indicator';
    margin: 2px;
    margin-left: 7px;
    margin-right: 7px;
    height: 65px;
    background: #e2e2e2;
    padding-top: 4px;
    padding-bottom: 4px;
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
    display: block;
    margin-right: 20px;
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 1px;
    grid-template-areas:
        'current'
        'changed';
`;
export const PercentageCurrent = styled.div`
    grid-area: current;
    display: block;
    float: right;
    font-size: 21px;
    font-weight: bold;
    font-family: Avenir Next, sans-serif;
`;
export const PercentageChanged = styled.div`
    grid-area: changed;
    float: right;
    display: block;
    margin-left: 17px;
    font-weight: bold;
    font-family: Avenir Next, sans-serif;
    color: ${props => (props.value > 0 ? `red` : `green`)};
    padding-bottom: 10px;
`;
export const IndicatorUp = styled.div`
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 30px solid red;
`;
export const IndicatorDown = styled.div`
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-top: 30px solid green;
`;

export const IndicatorWrapper = styled.div`
    grid-area: indicator;
    @media (min-width: 1650px) {
        display: flex;
    }
    display: none;
    flex-direction: column;
    text-align: center;
    vertical-align: middle;
    justify-content: center;
    margin-right: 10px;
`;
