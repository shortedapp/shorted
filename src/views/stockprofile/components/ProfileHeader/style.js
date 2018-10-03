import styled from 'styled-components';

export const Wrapper = styled.div`
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    display: grid;
    grid-gap: 20px;
    margin-top: 20px;
    width: 100%;
    grid-template-rows: 130px 70px 50px;
    grid-template-columns: 350px repeat(3, 1fr) 100px;
    grid-template-areas:
        'company-logo stock-history sector-history stock-interest'
        'company-name todo todo todo'
        'company-code todo todo todo';
`;

export const CompanyLogoWrapper = styled.image`
    grid-area: company-logo;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    align-self: center;
    display: flex;
`;

export const CompanyNameWrapper = styled.div`
    grid-area: company-name;
    text-align: center;
    flex-direction: column;
    display: flex;
    font-size: 20px;
    font-weight: bold;
    color: ${props => props.profileHeaderTextColor};
`;
export const CompanyCodeWrapper = styled.div`
    grid-area: company-code;
    width: 160px;
    color: ${props => props.profileHeaderTextColor};
    display: flex;
    background: ${props => props.profileHeaderCodeBackground};
    height: 50px;
    border-radius: 5px;
    position: relative;
    left: 20px;
    top: 25px;
    text-align: center;
    justify-content: center;
    .code {
        text-align: center;
        font-size: 30px;
        font-weight: bold;
    }
`;
export const CompanyPEWrapper = styled.div``;

export const CompanySectorWrapper = styled.div`
    grid-area: sector-history;
    background: ${props => props.profileHeaderWidgetBackground};
    border-radius: 10px;
`;
export const CompanyInterestWrapper = styled.div`
    grid-area: stock-interest;
    background: ${props => props.profileHeaderWidgetBackground};
    border-radius: 10px;
`;
export const CompanyStockWrapper = styled.div`
    grid-area: stock-history;
    background: ${props => props.profileHeaderWidgetBackground};
    border-radius: 10px;
`;
