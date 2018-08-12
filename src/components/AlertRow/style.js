import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 90px 250px 100px 100px 100px;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
        "code name name percentage indicator graph"
        "code name name percentage indicator graph";
    margin: 6px;
    margin-left: 7px;
    margin-right: 7px;
    height: 80px;
    background: #e2e2e2;
    padding-top: 4px;
    padding-bottom: 4px;
`;

export const Name = styled.div`
    grid-area: name;
    display: flex;
    font-size: 21px;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
    font-family: Avenir Next,sans-serif;
`

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
            font-size: 25px;
            
            font-family: Avenir Next,sans-serif;
            flex-direction: column;
            justify-content: center;
            vertical-align: middle;
            text-align: center;
            margin-left: 5px;
        }
`
export const Percentage = styled.div`
    grid-area: percentage;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 1px;
    grid-template-areas:
        "current"
        "changed";
`
export const PercentageCurrent = styled.div`
    grid-area: current;
    font-size: 27px;
    font-weight: bold;
    font-family: Avenir Next,sans-serif;

`
export const PercentageChanged = styled.div`
    grid-area: changed;
    margin-left: 40px;
    font-weight: bold;
    font-size: 20px;
    font-family: Avenir Next,sans-serif;
    color: ${props => props.value > 0 ? `red`: `green`};
    padding-bottom: 5px;
`
export const IndicatorUp = styled.div`
    width: 0; 
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 30px solid red;
    `
export const IndicatorDown = styled.div`

    width: 0; 
    height: 0; 
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-top: 30px solid green;
`

export const IndicatorWrapper = styled.div`
    grid-area: indicator;
    display: grid;
    flex-direction: column;
    text-align: center;
    vertical-align: middle;
    justify-content: center;
    margin: auto;
    padding: auto;

`
