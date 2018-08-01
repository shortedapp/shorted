import styled from 'styled-components';

export const TopShortsWrapper = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    width: 900px;
    height: 800px;
    background-color: white;
    border-radius: 20px;
    border: 1px solid black;
    background-image: ${props => `url(${props.background})`},
`;

export const PickerWrapper = styled.div`
`

export const ChartWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
vertical-align: middle;
height: 800px;
`