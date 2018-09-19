import React from 'react'
import Transition from 'react-transition-group/Transition'
import { ThemeContext } from '../../theme-context'
import { Icon } from 'antd'
import {
  SearchBarWrapper,
  SearchBarIconWrapper,
  CustomInput,
  PrimaryColumn,
  DropDown,
  SecondaryColumn,
  Button,
  Wrapper,
  transitionStyles,
  duration
} from './style'

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
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      focused: false
    }
  }
  onChange (e, v) {
    console.log(e, v)
    console.log(e.target.value)
    this.setState({ value: e.target.value })
  }
  onFocus () {
    console.log('focused')
    // this.setState(prevState => ({
    //     focused: !prevState.focused,
    // }));
  }
  onClick () {
    console.log('search clicked')
    this.setState({ focused: true })
    // this.onFocus();
  }
  onBlur () {
    console.log('unfocused')
    if (this.state.value !== '') {
      this.setState({ focused: true })
    } else {
      this.setState(prevState => ({
        focused: !prevState.focused
      }))
    }
  }

<<<<<<< HEAD
    render() {
        console.log(this.state.focused);
        return (
            <SearchBarWrapper {...this.state}>
                <PrimaryColumn>
                    <SearchBarIconWrapper {...this.state}>
                        <Icon
                            style={{fontSize: '25px'}}
                            type="search"
                            theme="filled"
                            onClick={() => this.onClick()}
                        />
                    </SearchBarIconWrapper>
                    <Transition
                        in={this.state.focused}
                        timeout={duration}
                        unmountOnExit>
                        {state => (
                            <CustomInput
                                autoFocus
                                {...this.state}
                                duration={duration}
                                {...transitionStyles[state]}
                                type="text"
                                placeholder={
                                    this.state.focused ? 'Company' : ''
                                }
                                onFocus={() => this.onFocus()}
                                onBlur={() => this.onBlur()}
                                onChange={(e, v) => this.onChange(e, v)}
                                value={this.state.value}
                            />
                        )}
                    </Transition>
                </PrimaryColumn>
            </SearchBarWrapper>
        );
    }
=======
  render () {
    console.log(this.state.focused)
    return (
      <ThemeContext.Consumer>
        {theme => (
          <SearchBarWrapper
            onClick={() => this.onClick()}
            {...theme}
            {...this.state}
          >
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
                      : theme.searchIconColorUnfocused
                  }}
                  type='search'
                  theme='filled'
                  onClick={() => this.onClick()}
                />
              </SearchBarIconWrapper>
              <Transition
                in={this.state.focused}
                timeout={duration}
                unmountOnExit
              >
                {state => (
                  <CustomInput
                    autoFocus
                    {...theme}
                    duration={duration}
                    {...transitionStyles[state]}
                    type='text'
                    placeholder={this.state.focused ? 'Company' : ''}
                    onFocus={() => this.onFocus()}
                    onBlur={() => this.onBlur()}
                    onChange={(e, v) => this.onChange(e, v)}
                    value={this.state.value}
                  />
                )}
              </Transition>
              { this.state.value ? (<DropDown>
                  Dropdown content goes here
              </DropDown>) : null}
              
            </PrimaryColumn>
          </SearchBarWrapper>
        )}
      </ThemeContext.Consumer>
    )
  }
>>>>>>> f4df34efdaaa8348176d3ce83d1d538e298082aa
}

export default SearchBar
