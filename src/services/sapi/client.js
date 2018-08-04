import topShorts from './fixtures/topShortsFormatted.json';
import topShortsList from './fixtures/topShortsList.json';

class ShortedAPI {
    constructor() {

    }
    /**
     * getTopShorts
     * get the top 10 short positioned stocks time series data from shorted api endpoint
     */
    getTopShorts(datapoints) {
        return topShorts.slice(0, datapoints)
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