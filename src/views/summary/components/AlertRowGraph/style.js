import styled from 'styled-components';

export const Wrapper = styled.div`
    grid-area: graph;
    margin: 5px;
    max-width: 245px;
    @media (min-width: 1280px) {
        display: flex;
    }
    display: none;
    margin-right: 10px;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    -webkit-box-shadow: 1px 1px 2px 0px rgba(181, 181, 181, 1);
    -moz-box-shadow: 1px 1px 2px 0px rgba(181, 181, 181, 1);
    box-shadow: 1px 1px 2px 0px rgba(181, 181, 181, 1);
`;
