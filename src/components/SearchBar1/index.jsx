import React from 'react';
import Transition from 'react-transition-group/Transition';
import {Icon} from 'antd';
import {
    SearchBarWrapper,
    SearchBarIconWrapper,
    CustomInput,
    PrimaryColumn,
    SecondaryColumn,
    Button,
    Wrapper,
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
            value: '',
            focused: false,
        };
        this.setInputRef = element => {
            this.input = element;
        };
    }
    onChange(e, v) {
        console.log(e, v);
        console.log(e.target.value);
        this.setState({value: e.target.value});
    }
    onFocus() {
        console.log('focused');
        // this.setState(prevState => ({
        //     focused: !prevState.focused,
        // }));
    }
    onClick() {
        console.log('search clicked');
        this.setState({focused: true});
        console.log(this.input);
        this.input.focus();
    }
    onBlur() {
        console.log('unfocused');
        if (this.state.value !== '') {
            this.setState({focused: true});
        } else {
            this.setState(prevState => ({
                focused: !prevState.focused,
            }));
        }
    }

    render() {
        console.log(this.state.focused);
        return (
            <SearchBarWrapper {...this.state}>
                <PrimaryColumn>
                    <CustomInput
                        innerRef={e => this.setInputRef(e)}
                        // ref={e => this.setInputRef(e)}
                        {...this.state}
                        type="text"
                        placeholder={this.state.focused ? 'Company' : ''}
                        onFocus={() => this.onFocus()}
                        onBlur={() => this.onBlur()}
                        onChange={(e, v) => this.onChange(e, v)}
                        value={this.state.value}
                    />
                    <SearchBarIconWrapper {...this.state}>
                        <Icon
                            style={{fontSize: '25px'}}
                            type="search"
                            theme="filled"
                            onClick={() => this.onClick()}
                        />
                    </SearchBarIconWrapper>
                </PrimaryColumn>
            </SearchBarWrapper>
        );
    }
}

export default SearchBar;
