import styled from 'styled-components';


export const Wrapper = styled.div`
width: 40px;
height: 40px;
display: flex;
justify-content: center; /* align horizontal */
align-items: center; /* align vertical */
/* flex-direction: column; */
margin: 5px;
border-radius: 7px;
color: white;
background: ${ props => props.selected ? `green` : `blue`};
`