import styled from 'styled-components';

export const duration = 500;
export const transitionStyles = {
    entering: {opacity: 0, Ypos: 500},
    entered: {opacity: 1, Ypos: 0},
    exited: {opacity: 0},
};
export const Wrapper = styled.div`
    background: transparent;
    color: ${props => props.textColor};
    opacity: ${props => props.opacity};
    transition: ${props => `${props.duration}ms ease-in-out`};
    transition-property: opacity, transform;
    transform: ${props => `translateY(${props.Ypos}px)`};
    border-radius: 4px;
    grid-area: legend;
    display: grid;
    grid-gap: 5px;
    grid-template-rows: 40px 40px 40px 40px 100px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
        'company-name company-name company-name company-name'
        'company-logo company-logo company-code company-code'
        'company-logo company-logo company-pe company-pe'
        'company-sector company-sector company-sector company-sector'
        'company-mc company-mc company-mc company-mc';
`;
export const UnselectedWrapper = styled.div`
    background: ${props => props.widgetBackgroundColor};
    color: ${props => props.textColor};
    opacity: ${props => props.opacity};
    transition: ${props => `${props.duration}ms ease-in-out`};
    transition-property: opacity, transform;
    transform: ${props => `translateY(${props.Ypos}px)`};
    grid-area: legend;
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    justify-content: center;
    text-align: center;
    border-radius: 4px;
    height: 100%;
    font-family: Avenir Next, sans-serif;
    font-size: 22px;
    font-weight: bold;
    padding-left: 30px;
    padding-right: 30px;
`;
export const CompanyHeader = styled.div`
    background: ${props => props.widgetBackgroundColor};
    color: ${props => props.textColor};
    border: 1px solid ${props => props.widgetRowBorderColor};
    display: flex;
    border-radius: 5px;
    flex-direction: column;
    vertical-align: middle;
    justify-content: center;
    font-size: 0.8vh;
    grid-area: company-header;
`;
export const CompanyMarketCap = styled.div`
    grid-area: company-mc;
    background: ${props => props.widgetBackgroundColor};
    color: ${props => props.textColor};
    border: 1px solid ${props => props.widgetRowBorderColor};
    display: flex;
    flex-direction: column;
    vertical-align: middle;
`;
export const CompanySector = styled.div`
    grid-area: company-sector;
    display: flex;
    border-radius: 5px;
    background: ${props => props.widgetBackgroundColor};
    color: ${props => props.textColor};
    border: 1px solid ${props => props.widgetRowBorderColor};
    font-size: 1vh;
    font-weight: bold;
    font-family: Avenir Next, sans-serif;
    text-align: center;
    flex-direction: column;
    vertical-align: middle;
    justify-content: center;
`;
export const CompanyName = styled.div`
    border-radius: 5px;
    grid-area: company-name;
    display: flex;
    background: ${props => props.widgetBackgroundColor};
    color: ${props => props.textColor};
    border: 1px solid ${props => props.widgetRowBorderColor};
    font-size: 1vh;
    font-weight: bold;
    font-family: Avenir Next, sans-serif;
    text-align: center;
    flex-direction: column;
    vertical-align: middle;
    justify-content: center;
`;
