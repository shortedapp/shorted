import React from 'react';
import {ThemeContext} from 'src/theme-context';
import {Wrapper, UnitWrapper, ValueWrapper, DescriptionWrapper} from './style';

/**
 * Renders selected value on graph
 * Will also manage the implementation of the navbar collapse on mobile devices i.e transition to burger and burger animation on open/close etc.
 * TODO:
 * * handle mobile compaction of navbar component
 *
 */
class FixedTooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {theme =>
                    this.props.value ? (
                        <Wrapper>
                            <UnitWrapper {...theme}>%</UnitWrapper>
                            <ValueWrapper {...theme}>
                                {this.props.value}
                            </ValueWrapper>
                            <DescriptionWrapper {...theme}>
                                Percentage Shorted
                            </DescriptionWrapper>
                        </Wrapper>
                    ) : null
                }
            </ThemeContext.Consumer>
        );
    }
}

export default FixedTooltip;
