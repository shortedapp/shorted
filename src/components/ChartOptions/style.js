import styled from 'styled-components';

export const Wrapper = styled.div`
margin: auto;
`
export const Button = styled.div`
    background: black;
    width: 30px;
    height: 30px;
    display: inline-block;
    ${'' /* vertical-align: middle;
    justify-content:center;
    align-content: center;
    flex-direction: column; */}
    position: relative;

`
export const OptionsWrapper = styled.div`
    display: ${props => props.open ? `block` : `none`};
    position: absolute;
    z-index: 1;
    background: white;
`
export const Option = styled.div`
`
export const OptionWrapper = styled.div`
`