import styled from 'styled-components';
export const themes = {
    light: {
        color: 'black',
        background: 'white',
        fill: 'white',
        stroke: 'black',
        buttonSelected: '#5fa0dd',
        buttonUnselected: '#7d7d7d',
    },
    dark: {
        color: 'white',
        background: '#001529',
        stroke: 'white',
        buttonSelected: '#1890ff',
        buttonUnselected: '#001529',
    },
};
export const DashboardWrapper = styled.div`
    display: grid;
    grid-template-columns: ${props => props.width} 1fr;
    grid-template-rows: 100px 70px 80px 50px 1fr;
    grid-template-areas:
        'logo top-nav'
        'collapse content'
        'theme content'
        'nav content'
        'nav content';
`;
export const ThemeWrapper = styled.div`
    width: ${props => props.width};
    grid-area: theme;
    color: ${props => props.textColor};
    background: ${props => props.background};
`;
export const HeaderWrapper = styled.div`
    grid-area: top-nav;
    background: ${props => props.background};
`;
export const DashboardNavbarWrapper = styled.div`
    grid-area: nav;
    width: ${props => props.width};
    display: block;
    background: ${props => props.background};
    .menu {
        background: ${props => props.background};
    }
`;
export const NavBarCollapseButton = styled.div`
    grid-area: collapse;
    height: 70px;
    padding-top: 10px;
    width: ${props => props.width};
    background: ${props => props.background};
    display: flex;
    align-items: center;
    flex-direction: column;
    align-content: center;
    vertical-align: middle;
    text-align: center;
`;
export const ContentWrapper = styled.div`
    grid-area: content;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    background: ${props => props.background};
    color: ${props => props.color};
    height: 1300px;
`;
