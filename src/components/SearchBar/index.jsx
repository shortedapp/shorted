import React from 'react';
import {
    SearchBarWrapper,
    CustomInput,
    PrimaryColumn,
    SecondaryColumn,
    Wrapper } from './style';

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
            value: 'Search...',
        };
    }
    onChange(e,v) {
        console.log(e,v)
    }

    render() {
        return <SearchBarWrapper>
            <PrimaryColumn>
                <CustomInput
                    type="text"
                    placeholder="City"
                    onChange={(e,v) => this.props.onChange(e,v)}
                    value={this.props.value} />
            </PrimaryColumn>
            <SecondaryColumn>
                <button label="GO" primary/>
            </SecondaryColumn>
            
            </SearchBarWrapper>;
    }
}

export default SearchBar;
