import topShorts from './fixtures/topShortsFormatted.json';
import topShortsList from './fixtures/topShortsList.json';
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
            m: 720,
            y: 8760
        }
        // console.log(topShorts)
        // return topShorts.slice(-1 * slice_map_hourly[period], -1)
        return {
            data: topShorts.data.slice(-1 * slice_map_hourly[period], -1),
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
}


export default ShortedAPI