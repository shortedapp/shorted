import React from 'react';
import ReactDOM from 'react-dom';
import Transition from 'react-transition-group/Transition';
import {search} from 'src/services/elasticsearch/client';
import SearchResults from '../SearchResults3';
import {ThemeContext} from '../../theme-context';
import {Icon} from 'antd';
import {
    SearchBarWrapper,
    SearchBarIconWrapper,
    SearchBarClearIconWrapper,
    CustomInput,
    PrimaryColumn,
    DropDown,
    ResultsWrapper,
    transitionStyles,
    duration,
} from './style';

/**
 * SearchBar
 * THis component is responsible for the rendering of the searchbar view at the top of the header bar. It provides a dropdown list of items
 * matching the elastically searched results entering into the search bar
 * interacts with elastisearch for querying
 * TODO:
 * * handle mobile compaction of navbar component
 *
 */
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            error: false,
            focused: false,
            results: null,
            isLoading: false,
        };
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.escFunction = this.escFunction.bind(this);
    }
    handleOutsideClick(e) {
        const searchBar = ReactDOM.findDOMNode(this);
        if (searchBar.contains(e.target)) {
            this.setState(prevState => ({
                focused: true,
            }));
            return false;
        }
        this.handleSelect(e);
        this.setState(prevState => ({
            focused: false,
        }));
    }
    escFunction(event) {
        if (event.keyCode === 27) {
            this.setState(prevState => ({
                focused: false,
            }));
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false);
    }
    handleSelect(e) {
        if (!this.state.focused) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
            this.setState(prevState => ({
                focused: true,
            }));
        } else {
            const searchBar = ReactDOM.findDOMNode(this);
            if (searchBar.contains(e.target)) {
                this.setState(prevState => ({
                    focused: true,
                }));
            } else {
                document.removeEventListener(
                    'click',
                    this.handleOutsideClick,
                    false,
                );
            }
        }
    }
    fetchResults() {
        console.log('fetching results');
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

    onChange(e) {
        console.log(e);
        console.log(e.target.value);
        this.setState({query: e.target.value}, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.fetchResults();
            }
        });
    }
    onFocus() {
        // this.setState(prevState => ({
        //     focused: !prevState.focused,
        // }));
    }
    onClick() {
        this.setState({focused: true});
        // this.onFocus();
    }
    handleClear() {
        this.setState({query: ''});
    }
    onBlur() {
        if (this.state.query !== '') {
            this.setState({focused: false});
        } else {
            this.setState(prevState => ({
                focused: !prevState.focused,
            }));
        }
    }

    render() {
        console.log(this.state.results);
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <SearchBarWrapper
                        onClick={e => this.handleSelect(e)}
                        {...theme}
                        {...this.state}>
                        <PrimaryColumn {...theme}>
                            <SearchBarIconWrapper {...theme} {...this.state}>
                                <Icon
                                    fill={
                                        this.state.focused
                                            ? theme.searchIconColorFocused
                                            : theme.searchIconColorUnfocused
                                    }
                                    style={{
                                        fontSize: '25px',
                                        color: this.state.focused
                                            ? theme.searchIconColorFocused
                                            : theme.searchIconColorUnfocused,
                                    }}
                                    type="search"
                                    theme="filled"
                                />
                            </SearchBarIconWrapper>
                            <SearchBarClearIconWrapper
                                onClick={() => this.handleClear()}>
                                <Icon
                                    fill={theme.searchClearIconColor}
                                    style={{
                                        fontSize: '15px',
                                        visibility:
                                            this.state.query !== '' &&
                                            this.state.focused
                                                ? 'visible'
                                                : 'hidden',
                                        color: theme.searchClearIconColor,
                                    }}
                                    type="close"
                                    theme="filled"
                                />
                            </SearchBarClearIconWrapper>
                            <Transition
                                in={this.state.focused}
                                timeout={duration}
                                unmountOnExit>
                                {state => (
                                    <CustomInput
                                        autoFocus
                                        {...theme}
                                        duration={duration}
                                        {...transitionStyles[state]}
                                        type="text"
                                        placeholder={
                                            this.state.focused ? 'Company' : ''
                                        }
                                        onFocus={() => this.onFocus()}
                                        onChange={e => this.onChange(e)}
                                        value={this.state.query}
                                    />
                                )}
                            </Transition>
                            {this.state.query && this.state.focused ? (
                                <DropDown {...theme}>
                                    <ResultsWrapper>
                                        <SearchResults
                                            data={this.state.results}
                                        />
                                    </ResultsWrapper>
                                </DropDown>
                            ) : null}
                        </PrimaryColumn>
                    </SearchBarWrapper>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default SearchBar;
