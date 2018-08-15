import styled from 'styled-components'

// dropdown wrapper
export const Wrapper = styled.div`
margin-top: auto;
margin-bottom: auto;
margin-left: auto;
margin-right: 10px;
display: inline-block;
position: relative;
`
export const buttonStyle = {
  fontSize: 37,
  fill: 'black',
  color: 'black'
}
export const Button = styled.div`
    width: 30px;
    height: 30px;
    margin-right: 7px;
    display: inline-block;
    position: relative;
`
// dropdown-content
export const OptionsWrapper = styled.div`
    padding: 5px;
    display: ${props => (props.open ? `flex` : `none`)};
    position: absolute;
    z-index: 1;
    background: white;
    right: 0;
    border-radius: 15px;
    border: 1px solid #eee;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    flex-direction: column;
    text-align: center;
    align-items: center;
    .chart-modes {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 130px;

    }
`
export const Option = styled.div`
    font-size: 15px;
    font-family: Avenir Next,sans-serif;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    text-align: center;

`
export const OptionHeader = styled.div`
    font-size: 20px;
    font-family: Avenir Next,sans-serif;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    text-align: center;
`

export const OptionWrapper = styled.div`
`

export const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
  margin: 4
}
