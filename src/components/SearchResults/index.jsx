import React from 'react';
import {
    ResultRowIndustryHeader,
    ResultsShowMore,
    ResultRowName,
    ResultRowCode,
    ResultRowWrapper,
    SearchResultsWrapper,
    NoResults,
} from './style';
const ResultRow = props => (
    <ResultRowWrapper onMouseOver={props.handleHover} selected={props.selected}>
        <ResultRowCode>{props.row.code}</ResultRowCode>
        <ResultRowName>{props.row.name}</ResultRowName>
    </ResultRowWrapper>
);
class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowLimit: 10,
            selectedRow: null,
        };
    }
    componentDidMount() {
        this.setState({isLoading: true});
    }
    onHover(code) {
        console.log(code);
        this.setState({selectedRow: code});
    }
    render() {
        const resultsStructured = this.props.data
            ? this.props.data.items.reduce((acc, item) => {
                  acc.hasOwnProperty(item._source.industry)
                      ? acc[item._source.industry].push(item)
                      : (acc[item._source.industry] = [item]);
                  return acc;
              }, {})
            : null;
        const structuredResultsView = [];
        if (this.props.data) {
            for (const [key, results] of Object.entries(resultsStructured)) {
                structuredResultsView.push(
                    <ResultRowIndustryHeader key={`key-${key}`}>{key}</ResultRowIndustryHeader>,
                );
                results.map(result =>
                    structuredResultsView.push(
                        <ResultRow
                            handleHover={() =>
                                this.onHover(result._source.code)
                            }
                            selected={
                                this.state.selectedRow === result._source.code
                            }
                            key={result._source.code}
                            row={result._source}
                        />,
                    ),
                );
            }
        }
        const resultsView = this.props.data ? (
            this.props.data.items.map(result => (
                <ResultRow
                    handleHover={() => this.onHover(result._source.code)}
                    selected={this.state.selectedRow === result._source.code}
                    key={result._source.code}
                    row={result._source}
                />
            ))
        ) : (
            <NoResults>No Results Found</NoResults>
        );
        console.log(structuredResultsView);
        const theme = this.props.theme
        return (
                    <SearchResultsWrapper>
                        {structuredResultsView.length > 0 ? (
                            structuredResultsView
                        ) : (
                            <NoResults>No Results Found</NoResults>
                        )}
                        {this.props.data ? (
                            this.props.data.hits > this.state.rowLimit ? (
                                <ResultsShowMore {...theme} href="/search">
                                    Show More Results
                                </ResultsShowMore>
                            ) : null
                        ) : null}
                    </SearchResultsWrapper>
        );
    }
}

export default SearchResults;
