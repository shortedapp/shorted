import styled from 'styled-components';

export const Wrapper = styled.button`
    width: 40px;
    height: 30px;
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
    margin: 5px;
    border-radius: 2px;
    border: solid 1px ${props => props.buttonBorder};
    color: ${props => props.buttonTextColor};
    background: ${props =>
        props.selected ? props.buttonSelected : props.buttonUnselected};
    outline: 0;
    font-size: 17px;
    font-family: Avenir Next, sans-serif;
    font-weight: bold;
`;
