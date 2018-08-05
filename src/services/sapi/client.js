import topShorts from './fixtures/topShortsFormatted.json';
import topShortsList from './fixtures/topShortsList.json';

class ShortedAPI {
    constructor() {

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
        return topShorts.slice(-1 * slice_map_hourly[period], -1)
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