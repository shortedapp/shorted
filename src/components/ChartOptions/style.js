import styled from 'styled-components';


export const Wrapper = styled.div`
    background: black;
    width: 30px;
    height: 30px;
    display: flex;
    vertical-align: middle;
    justify-content:center;
    align-content: center;
    flex-direction: column;
`
export const OptionsWrapper = styled.div`
    display: ${props => props.open ? `block` : `none`};
`
export const Option = styled.div`
`
export const OptionWrapper = styled.div`
`