import React from 'react';
import {
    ResultRowName,
    ResultRowCode,
    ResultRowWrapper,
    SearchResultsWrapper,
    NoResults,
} from './style';

import {ThemeContext} from '../../theme-context';
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
        // const testData = this.props.data.items.reduce();
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
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <SearchResultsWrapper>{resultsView}</SearchResultsWrapper>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default SearchResults;
