import React from 'react'
import { SearchResultsWrapper, NoResults } from './style'
import { search } from 'src/services/elasticsearch/client'
import { ThemeContext } from '../../theme-context'
class SearchResults extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      isLoading: false,
      error: null
    }
  }
  componentDidMount() {
    this.setState({ isLoading: true})
    search(this.props.query)
      .then( result => this.setState({
        data: result.data,
        isLoading: false
      }))
      .catch( error => this.setState({
        error,
        isLoading: false
      }))
  }
  render () {
    const resultsView = null
    return (
      <ThemeContext.Consumer>
        {theme => (
          <SearchResultsWrapper>
            {this.props.results
              ? resultsView
              : <NoResults>No Results Found</NoResults>}
          </SearchResultsWrapper>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default SearchResults
