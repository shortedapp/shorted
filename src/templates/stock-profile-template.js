import React from 'react';
import Helmet from "react-helmet";
import { graphql } from 'gatsby'

const StockProfile = ({data, location}) => {
    console.log(data)
    console.log(location)
    return (
        <div>
        {data.stocksYaml.code}
        </div>
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