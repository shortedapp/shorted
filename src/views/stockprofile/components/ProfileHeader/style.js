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
`;

export const CompanyLogoWrapper = styled.div`
    grid-area: company-logo;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    align-self: center;
`;

export const CompanyNameWrapper = styled.div`
    grid-area: company-name;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
`;

export const CompanyPEWrapper = styled.div`
`;

export const CompanySectorWrapper = styled.div`
`;
