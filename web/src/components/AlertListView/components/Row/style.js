import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    margin: 5px;
    padding: 5px;
    display: grid;
    background: ${props => props.profileCardRowBackground};
    grid-gap: 5px;
    grid-template-rows: 30px 20px 40px;
    grid-template-columns: 30px 30px 1fr 2fr 20px;
    grid-template-areas:
        'icon type type type na'
        'description description description todo todo'
        'direction value z todo todo';
`;

export const IconWrapper = styled.div`
    grid-area: icon;
    display: flex;
    margin: 5px;
    background: ${props => props.color};
    height: 30px;
    width: 30px;
    display: flex;
    flex-direction: center;
    justify-content: center;
    align-self: center;
    align-items: center;
    border-radius: 50px;
`;
export const TypeWrapper = styled.div`
    grid-area: type;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    text-align: left;
    vertical-align: middle;
    justify-content: center;
    font-family: Avenir Next, sans-serif;
    font-weight: bold;
    font-size: 16px;
    color: ${props => props.color};
`;
export const DescriptionWraper = styled.div`
    grid-area: description;
    font-family: Avenir Next, sans-serif;
    color: ${props => props.color};
    text-align: left;
`;
export const DirectionWrapper = styled.div`
    grid-area: direction;
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    justify-content: center;
`;
export const ValueWrapper = styled.div`
    grid-area: value;
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    justify-content: center;
    font-size: 20px;
    color: ${props => props.positive ? 'red' : 'green'};
`;
export const SparkWrapper = styled.div`

`;
