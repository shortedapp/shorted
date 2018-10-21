import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    margin: 5px;
    padding: 5px;
    display: grid;
    background: ${props => props.profileCardRowBackground};
    grid-gap: 2px;
    grid-template-rows: 60px 20px 20px;
    grid-template-columns: 60px 2fr 1fr 20px;
    grid-template-areas:
        'icon type na na'
        'description description todo todo'
        'empty empty todo todo';
`;

export const IconWrapper = styled.div`
    grid-area: icon;
    display: flex;
    margin: 5px;
    background: ${props => props.color};
    height: 50px;
    width: 50px;
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
    font-size: 20px;
    color: ${props => props.color};
`;
export const DescriptionWraper = styled.div`
    grid-area: description;
    font-family: Avenir Next, sans-serif;
    color: ${props => props.color};
    font-size: 25px;
    text-align: left;
    margin-left: 20px;
`;
export const SparkWrapper = styled.div``;
