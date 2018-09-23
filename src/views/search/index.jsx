import React from 'react';
import Transition from 'react-transition-group/Transition';
import {ThemeContext, themes} from '../../theme-context';
import {search} from 'src/services/elasticsearch/client';
import Logo from 'src/components/Logo';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import {
    SearchWrapper,
    SearchHeaderWrapper,
    SearchResultWrapper,
    SearchBarWrapper,
    LogoWrapper,
} from './style';
import {SearchResultsWrapper} from '../../components/SearchResults3/style';
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: 'dark',
            results: null,
            query: '',
        };
    }
    changeTheme = value => {
        console.log(value);
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    handleQueryChange(e) {
        this.setState({query: e.target.value}, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.fetchResults();
            }
        });
    }
    handleClear() {
        this.setState({query: ''});
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    fetchResults() {
        search(this.state.query)
            .then(result =>
                this.setState({
                    results: result,
                    isLoading: false,
                }),
            )
            .catch(error =>
                this.setState({
                    error,
                    isLoading: false,
                }),
            );
    }

    render() {
        console.log(this.state.results);
        return (
            <ThemeContext.Provider value={themes[this.state.theme].style}>
                <ThemeContext.Consumer>
                    {theme => {
                        return (
                            <SearchWrapper {...theme}>
                                <SearchHeaderWrapper>
                                    <LogoWrapper>
                                        <Logo />
                                    </LogoWrapper>
                                    <SearchBarWrapper>
                                        <SearchBar
                                            query={this.state.query}
                                            onClear={() => this.handleClear()}
                                            onQueryChange={query =>
                                                this.handleQueryChange(query)
                                            }
                                        />
                                    </SearchBarWrapper>
                                </SearchHeaderWrapper>
                                <SearchResultWrapper>
                                    <SearchResults
                                        query={this.state.query}
                                        data={this.state.results}
                                    />
                                </SearchResultWrapper>
                            </SearchWrapper>
                        );
                    }}
                </ThemeContext.Consumer>
            </ThemeContext.Provider>
        );
    }
}

export default Search;
