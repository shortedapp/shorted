import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    @media only screen and (min-width: 1024px) {
        grid-template-columns: 90px 1fr 1fr 100px 70px 1fr;
        grid-template-areas:
            'code name name percentage indicator graph';
    };
    @media only screen and (min-width: 1280px) {
        grid-template-columns: 90px 1fr 130px 200px 1fr;
        grid-template-areas:
            'code name percentage indicator graph';
    };
    margin: 6px;
    margin-left: 7px;
    margin-right: 7px;
    height: 140px;
    background: #e2e2e2;
    background: ${props => props.background};
    padding-top: 4px;
    padding-bottom: 4px;
    font-size: 25px
`;
export const MarketCap = styled.div`
    grid-area: graph;
    display: flex;
    align-self: center;
    flex-direction: column;
    text-align: center;
`
export const Name = styled.div`
    grid-area: name;
    display: flex;
    display: flex;
    align-self: center;
    flex-direction: column;
    text-align: center;
    font-family: Avenir Next, sans-serif;
`;

export const Code = styled.div`
    grid-area: code;
    display: flex;
    display: flex;
    align-self: center;
    flex-direction: column;
    text-align: center;
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
    display: flex;
    align-self: center;
    flex-direction: column;
    text-align: center;
`;

export const IndicatorWrapper = styled.div`
    grid-area: indicator;
    display: flex;
    align-self: center;
    flex-direction: column;
    text-align: center;
`;

