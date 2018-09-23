import styled from 'styled-components';
import {checkPropTypes} from 'prop-types';

export const NoResults = styled.div``;
export const ResultRowWrapper = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-rows: 1fr;
    grid-template-columns: 45px 1fr;
    grid-template-areas: 'code name';
    height: 35px;
    background: ${props => (props.selected ? '#d9d9d9' : 'white')};
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
