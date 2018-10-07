import styled from 'styled-components'

export const Wrapper = styled.div`
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-top: 40px;
    color: ${props => props.color};
    height: 100%;
    display: grid;
    grid-gap: 10px;
    grid-template-rows: 100px;
    grid-template-columns: 1fr;
    grid-template-areas:
        'sector'
        'stock-pe'
        'stock-mc'
        'asx-link'
        'stock-description'
        'stock-website';
`

export const ProfileSector = styled.div`
    grid-area: sector;
    display: grid;
    justify-self: center;
    text-align: center;
    align-content: center;
    align-self: center;
    width: 100%;
    height: 100%;
    grid-template-columns: 40px 1fr;
    grid-template-areas:
        'icon text';
    .icon {
        grid-area: icon;
        justify-self: center;
        text-align: center;
        align-content: center;
        align-self: center;
    }
    .text {
        grid-area: text;
        font-size: 30px;
        font-family: Avenir Next, sans-serif;
        font-weight: bold;
    }

`
export const ProfileASXLink = styled.div`
    grid-area: asx-link;
    
`
export const ProfileYahooLink = styled.div`
    
`
export const ProfileDescription = styled.div`
    grid-area: stock-description;
    
`
export const ProfilePE = styled.div`
    grid-area: stock-pe;
    
`
export const ProfileMarketCap = styled.div`
    grid-area: stock-mc;
    
`
export const ProfileStockWebsite = styled.div`
    grid-area: stock-website;

`
