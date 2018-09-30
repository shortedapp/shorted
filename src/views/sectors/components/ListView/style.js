import styled from 'styled-components';

export const Wrapper = styled.div`
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    display: grid;
    grid-gap: 5px;
    grid-template-rows: 100px 100px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
        'company-logo company-name company-name company-name'
        'company-logo company-code company-sector company-pe';
    background: gray;
    border-radius: 10px;
`;
