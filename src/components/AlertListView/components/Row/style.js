import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    margin: 5px;
    display: grid;
    grid-gap: 2px;
    grid-template-rows: 10px 40px 60px;
    grid-template-columns: 40px 20px 1fr 20px;
    grid-template-areas:
        'type na na info'
        'icon na graph graph'
        'na na graph graph';
`;

export const IconWrapper = styled.div`
    grid-area: type;
`;
