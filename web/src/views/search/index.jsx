import React from 'react';
import {ThemeContext, themes} from '../../theme-context';
import Logo from 'src/components/Logo';
import { search } from 'src/services/elasticsearch/client'
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import {
    SearchWrapper,
    SearchHeaderWrapper,
    SearchResultWrapper,
    SearchBarWrapper,
    LogoWrapper,
} from './style';
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
                                            client={search}
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
