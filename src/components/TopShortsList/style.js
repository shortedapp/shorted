import styled from 'styled-components';

export const duration = 300;
export const transitionStyles = {
    entering: { opacity: 0, Ypos: 500},
    entered: { opacity: 1, Ypos: 0},
    exited: { opacity: 0}
  };

export const Wrapper = styled.div`
  height: 100%;
  grid-area: top-list;
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 55px;
  border: 1px solid black;
  opacity: ${props => props.opacity};
  transition: ${props => `${props.duration}ms ease-in-out`};
  transition-property: opacity, transform;
  transform: ${props => `translateY(${props.Ypos}px)`};
`
export const Header = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 35px;
  font-weight: bold;
`
export const More = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  background: #dadada;
  border-radius: 0 0 60px 60px;
  margin: 4px;
`