import topShorts from './fixtures/data/topShortsFormatted.json';
import topShortsList from './fixtures/data/topShortsList.json';
import CBAStockSummary from './fixtures/data/CBAStockSummary.json';
import TLSStockSummary from './fixtures/data/TLSStockSummary.json';
import JBHStockSummary from './fixtures/data/JBHStockSummary.json';
import OREStockSummary from './fixtures/data/OREStockSummary.json';

import CBALogo from './fixtures/images/cba-logo.png';
import TLSLogo from './fixtures/images/tls-logo.png';
import JBHLogo from './fixtures/images/jbh-logo.png';
import ORELogo from './fixtures/images/ore-logo.png';
import StockLogo from './fixtures/images/stockLogo.png';
/**
 * ShortedAPI
 * main class responsible for implementing a given API contract from the shorted.com.au backend systems.
 * Manages the interaction with available api capabilities including:
 *  * Authentication
 *  * Async/parallelised fetch
 *  * data manipulation
 *  * analytics
 *  * error handing and retry interface
 * 
 * TODO:
 *   * implment interaction with backend when available
 *   * represent more data fetch interactions via fixtures as needed
 *   * add logging capability in a sharable/maintainable way
 *   * authentication functions
 *   
 * 
 * 
 */
class ShortedAPI {
    constructor() {
        console.log('constructing stub client')
    }
    /**
     * getTopShorts
     * get the top 10 short positioned stocks time series data from shorted api endpoint
     */
    getTopShorts(period) {
        const slice_map_hourly = {
            d: 24,
            w: 168,
            m: 672,
            y: 8064,
            y3: 24192
        }
        const slice_map_daily = {
            d: 8,
            w: 28,
            m: 180,
            y: 365,
            y3: 1095,
        }
        // console.log(topShorts)
        // return topShorts.slice(-1 * slice_map_hourly[period], -1)
        return {
            data: topShorts.data.slice(-1 * slice_map_daily[period], -1),
            dataKeys: topShorts.dataKeys
        }
    }
    /**
     * getTopShortsList
     * fetch the top 20 short positions for presentation in tabular/list format. Providing a more numerical interface for the data
     * and a mechansim to click/route to stocks.
     * @param {*} total 
     */
    getTopShortsList(total = 20) {
        return topShortsList.stocks.slice(0, total)
    }
    /**
     * getStockSummary
     * fetches a lightweight bundle of metdata related to the stock including the following:
     *  * stock logo
     *  * minified market cap timeseries (1-3 years in say 14day intervals)
     *  * stock name
     *  * P/E ratio
     *  * sentiment index (TODO: work out qualitative factors to construct an index for stock perception)
     * 
     */
    getStockSummary(code) {
        switch(code) {
            case "CBA":
                return CBAStockSummary
            case "TLS":
                return TLSStockSummary
            case "ORE":
                return OREStockSummary
            case "JBH":
                return JBHStockSummary
            default:
                return false
        }
    }
    /**
     * getStockLogo
     * 
     * 
     */
    getStockLogo(code) {
        switch(code) {
            case "CBA":
                return CBALogo
            case "TLS":
                return TLSLogo
            case "JBH":
                return JBHLogo
            case "ORE":
                return ORELogo
            default:
                return StockLogo
        }
    }
}


export default ShortedAPI