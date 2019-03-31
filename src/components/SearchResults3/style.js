import styled from 'styled-components';

export const NoResults = styled.div`
    font-family: Avenir Next, sans-serif;
`;
export const ResultRowWrapper = styled.div`
    display: grid;
    grid-gap: 10px;
    margin-left: 10px;
    grid-template-rows: 1fr;
    grid-template-columns: 45px 1fr;
    grid-template-areas: 'code name';
    height: 35px;
    background: ${props => (props.selected ? '#d9d9d9' : 'white')};
    font-family: Avenir Next, sans-serif;
`;
export const ResultRowIndustryHeader = styled.div`
    display: flex;
    font-weight: bold;
    font-size: 20px;
    margin-left: 5px;
    font-family: Avenir Next, sans-serif;
`;
export const ResultsShowMore = styled.a`
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-weight: bold;
    font-size: 30px;
    background: ${props => props.searchResultsMoreBackgroundColor};
    color: ${props => props.searchResultsMoreColor};
    align-items: center;
    text-decoration: none !important;
    font-family: Avenir Next, sans-serif;
`;
export const ResultRowCode = styled.div`
    grid-area: code;
    background: gray;
    color: white;
    align-self: center;
    text-align: center;
`;
export const ResultRowName = styled.div`
    grid-area: name;
    text-align: left;
    align-self: center;
`;

export const SearchResultsWrapper = styled.div``;
