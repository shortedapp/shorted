import React from 'react';
import {Icon} from 'antd';
import {
    ResultRowIndustryHeader,
    ResultRowWrapperHovered,
    ResultsShowMore,
    ResultRowImage,
    ResultRowName,
    ResultRowCode,
    ResultRowWrapper,
    SearchResultsWrapper,
    NoResults,
} from './style';

import {ThemeContext} from 'src/theme-context';
const ResultRow = props => {
    const row = (
        <ResultRowWrapper onMouseOver={props.handleHover}>
            <ResultRowImage>
                <Icon
                    type="picture"
                    theme="filled"
                    style={{
                        fontSize: '60px',
                    }}
                />
            </ResultRowImage>
            <ResultRowCode>{props.row.code}</ResultRowCode>
            <ResultRowName>{props.row.name}</ResultRowName>
        </ResultRowWrapper>
    );
    const rowHovered = (
        <ResultRowWrapperHovered onMouseOver={props.handleHover}>
            <ResultRowImage>
                <Icon
                    type="picture"
                    theme="filled"
                    style={{
                        fontSize: '60px',
                    }}
                />
            </ResultRowImage>
            <ResultRowCode>{props.row.code}</ResultRowCode>
            <ResultRowName>{props.row.name}</ResultRowName>
        </ResultRowWrapperHovered>
    );
    return props.selected ? rowHovered : row;
};
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
                    <ResultRowIndustryHeader>{key}</ResultRowIndustryHeader>,
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
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <SearchResultsWrapper>
                        {resultsView.length > 0 ? (
                            resultsView
                        ) : this.props.query.length > 0 ? (
                            <NoResults>No Results Found</NoResults>
                        ) : null}
                    </SearchResultsWrapper>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default SearchResults;
