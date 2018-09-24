import styled from 'styled-components';

export const Wrapper = styled.div`
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    display: grid;
    grid-gap: 5px;
    grid-template-rows: 40px 40px 40px 40px 100px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
        'company-logo company-name company-name company-name'
        'company-logo company-sector company-pe company-code';
    background: gray;
`;

export const CompanyLogo = styled.div`
`;

export const CompanyName = styled.div`
`;

export const CompanyPE = styled.div`
`;

export const CompanySector = styled.div`
`;
