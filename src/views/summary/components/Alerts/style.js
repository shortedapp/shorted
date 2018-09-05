import styled from 'styled-components'

export const duration = 500
export const transitionStyles = {
  entering: { opacity: 0, Ypos: 500 },
  entered: { opacity: 1, Ypos: 0 },
  exited: { opacity: 0 }
}
export const Wrapper = styled.div`
    border-radius: 5px;
    border: 1px solid ${props => props.widgetBorderColor};
    opacity: ${props => props.opacity};
    transition: ${props => `${props.duration}ms ease-in-out`};
    transition-property: opacity, transform;
    transform: ${props => `translateY(${props.Ypos}px)`};
    background: ${props => props.widgetBackgroundColor};
    display: grid;
    grid-template-rows: 60px 1fr 60px;
    grid-template-areas:
        'header'
        'rows'
        'more';
    float: left;
    vertical-align: middle;
    flex-direction: column;
    text-align: center;
    grid-area: top-alerts;
`;
export const Header = styled.div`
    grid-area: header;
    font-size: 30px;
    font-family: Avenir Next,sans-serif;
    font-weight: bold;
`
export const More = styled.div`
    grid-area: more;
    height: 50px;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 35px;
    font-weight: bold;
    background: #dadada;
    border-radius: 0 0 15px 15px;
    margin: 4px;
    justify-content: center;
    font-family: Avenir Next, sans-serif;
`
export const Rows = styled.div`
    grid-area: rows;
    height: 100%;
`
