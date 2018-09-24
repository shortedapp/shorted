import styled from 'styled-components';

export const SearchWrapper = styled.div`
    display: grid;
    grid-gap: 10px;
    justify-content: center;
    grid-template-rows: 140px 1fr 150px;
    grid-template-columns: 1fr;
    grid-template-areas:
        'header'
        'results'
        'footer';
`;
export const SearchHeaderWrapper = styled.div`
    display: grid;
    grid-area: header;
    justify-self: center;
    grid-gap: 10px;
    margin-left: 10px;
    width: 1100px;
    grid-template-rows: 114px;
    grid-template-columns: 220px 1fr;
    grid-template-areas: 'logo searchbar';
    height: 35px;
    background: ${props => (props.selected ? '#d9d9d9' : 'white')};
`;
export const SearchResultWrapper = styled.div`
    display: flex;
    grid-area: results;
    width: 1100px;
    justify-self: center;
`;
export const LogoWrapper = styled.div`
    grid-area: logo;
`;
export const SearchBarWrapper = styled.div`
    grid-area: searchbar;
    width: 100%;
    align-self: auto;
    align-self: center;
`;
