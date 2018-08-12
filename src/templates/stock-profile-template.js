import React from 'react';
// import Helmet from "react-helmet";
import { graphql } from 'gatsby';
import StockProfileView from '../views/stockprofile';


const StockProfile = ({data, location}) => {
    // console.log(data)
    // console.log(location)
    return (
        <StockProfileView data={data} />
    )
}

export const query = graphql`
    query TemplateStockProfile($code: String!) {
        stocksYaml(code: {eq: $code}) {
            code,
            sector
        }
    }`

export default StockProfile;