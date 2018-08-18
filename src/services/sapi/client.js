// data for topshorts graph
import topShorts from './fixtures/data/topShortsFormatted.json'
// data for top shorts list
import topShortsList from './fixtures/data/topShortsList.json'
// data for top alerts list
import topAlerts from './fixtures/data/topAlerts.json'
// data for top movers list
import topMoversDaily from './fixtures/data/topMoversDaily.json'
import topMoversWeekly from './fixtures/data/topMoversWeekly.json'
import topMoversMonthly from './fixtures/data/topMoversMonthly.json'
import topMoversYearly from './fixtures/data/topMoversYearly.json'

// legend profile summaries used in legend view
import CBAStockSummary from './fixtures/data/CBAStockSummary.json'
import TLSStockSummary from './fixtures/data/TLSStockSummary.json'
import JBHStockSummary from './fixtures/data/JBHStockSummary.json'
import OREStockSummary from './fixtures/data/OREStockSummary.json'
import SYRStockSummary from './fixtures/data/SYRStockSummary.json'

// logos
import CBALogo from './fixtures/images/cba-logo.png'
import TLSLogo from './fixtures/images/tls-logo.png'
import JBHLogo from './fixtures/images/jbh-logo.png'
import ORELogo from './fixtures/images/ore-logo.png'
import StockLogo from './fixtures/images/stockLogo.png'
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
  constructor () {
    console.log('constructing stub client')
  }
  /**
     * getTopShorts
     * get the top 10 short positioned stocks time series data from shorted api endpoint
     */
  getTopShorts (period) {
    const slice_map = {
      hourly: {
        d: 24,
        w: 168,
        m: 672,
        y: 8064,
        y3: 24192
      },
      daily: {
        d: 8,
        w: 28,
        m: 180,
        y: 365,
        y3: 1095
      }
    }
    // console.log(topShorts)
    // return topShorts.slice(-1 * slice_map_hourly[period], -1)
    return {
      data: topShorts.data.slice(-1 * slice_map.daily[period], -1),
      dataKeys: topShorts.dataKeys
    }
  }
  /**
     * getTopShortsList
     * fetch the top 20 short positions for presentation in tabular/list format. Providing a more numerical interface for the data
     * and a mechansim to click/route to stocks.
     * @param {*} total
     */
  getTopShortsList (total = 20) {
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
  getStockSummary (code) {
    switch (code) {
      case 'CBA':
        return CBAStockSummary
      case 'TLS':
        return TLSStockSummary
      case 'ORE':
        return OREStockSummary
      case 'JBH':
        return JBHStockSummary
      default:
        return false
    }
  }
  /**
     * getStockProfile
     * fetches a more verbose/detailed blob of information for a given stock code.
     * @param {*} code
     */
  getStockProfile (code) {
    switch (code) {
      case 'CBA':
        return CBAStockSummary
      case 'TLS':
        return TLSStockSummary
      case 'ORE':
        return OREStockSummary
      case 'JBH':
        return JBHStockSummary
      case 'SYR':
        return SYRStockSummary
      default:
        return false
    }
  }
  /**
     * getStockLogo
     * TODO: implement actual client call
     *
     */
  getStockLogo (code) {
    switch (code) {
      case 'CBA':
        return CBALogo
      case 'TLS':
        return TLSLogo
      case 'JBH':
        return JBHLogo
      case 'ORE':
        return ORELogo
      default:
        return StockLogo
    }
  }
  /**
     * getTopAlerts
     * get the latest top alerts.
     *
     *
     *
     */
  getTopAlerts () {
    return topAlerts
  }
  /**
     * getAlerts
     * get the latest alerts for a specific stock
     *
     *
     */
  getAlerts (code) {
    return topAlerts.alerts.code
  }
  /**
     *
     * @param {String} period (day,week,month, year)
     */
  getMovers (period) {
    switch (period) {
      case 'd':
        return topMoversDaily
      case 'w':
        return topMoversWeekly
      case 'm':
        return topMoversMonthly
      case 'y':
        return topMoversYearly
      default:
        return topMoversMonthly
    }
  }
}

export default ShortedAPI
