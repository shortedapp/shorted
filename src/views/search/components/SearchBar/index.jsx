import React from 'react';
import ReactDOM from 'react-dom';
import Transition from 'react-transition-group/Transition';
import SearchResults from '../SearchResults';
import {ThemeContext} from 'src/theme-context';
import {Icon} from 'antd';
import {
    SearchBarWrapper,
    SearchBarIconWrapper,
    SearchBarClearIconWrapper,
    CustomInput,
    PrimaryColumn,
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
    onFocus() {
        // this.setState(prevState => ({
        //     focused: !prevState.focused,
        // }));
    }
    onClick() {
        this.setState({focused: true});
        // this.onFocus();
    }
    onBlur() {
        if (this.props.query !== '') {
            this.setState({focused: false});
        } else {
            this.setState(prevState => ({
                focused: !prevState.focused,
            }));
        }
    }

    render() {
        console.log(this.props.query);
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
                                onClick={() => this.props.onClear()}>
                                <Icon
                                    fill={theme.searchClearIconColor}
                                    style={{
                                        fontSize: '15px',
                                        visibility:
                                            this.props.query !== '' &&
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
                                            this.state.focused
                                                ? 'Search for company'
                                                : ''
                                        }
                                        onFocus={() => this.onFocus()}
                                        onChange={e =>
                                            this.props.onQueryChange(e)
                                        }
                                        value={this.props.query}
                                    />
                                )}
                            </Transition>
                        </PrimaryColumn>
                    </SearchBarWrapper>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default SearchBar;
