import styled from 'styled-components';

export const NoResults = styled.div``;
export const ResultRowWrapper = styled.div`
    display: grid;
    grid-gap: 10px;
    margin: 10px;
    margin-left: 10px;
    border: 1px solid black;
    grid-template-rows: 1fr;
    grid-template-columns: 70px 45px 1fr;
    grid-template-areas: 'image code name';
    height: 70px;
    width: 100%;
    background: white;
    transition-duration: 0.1s;
`;
export const ResultRowWrapperHovered = styled.div`
    display: grid;
    grid-gap: 10px;
    margin: 10px;
    margin-left: 10px;
    border: 1px solid black;
    grid-template-rows: 1fr;
    grid-template-columns: 70px 45px 1fr;
    grid-template-areas: 'image code name';
    height: 70px;
    width: 100%;
    background: '#d9d9d9';
    transition-duration: 0.1s;
    -webkit-box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.25);
    box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.25);
    transform: scale(1.03);
`;
export const ResultRowIndustryHeader = styled.div`
    display: flex;
    font-weight: bold;
    font-size: 20px;
    margin-left: 5px;
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
`;
export const ResultRowImage = styled.div`
    grid-area: image;
    align-self: center;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
`;
export const ResultRowCode = styled.div`
    grid-area: code;
    background: gray;
    height: 30px;
    color: white;
    align-self: center;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
`;
export const ResultRowName = styled.div`
    grid-area: name;
    text-align: left;
    align-self: center;
`;

export const SearchResultsWrapper = styled.div`
    width: 100%;
`;
