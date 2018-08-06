import React from 'react';

import { Wrapper } from './style';
/**
 * Renders a shorted.com.au logo
 */
class Legend extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Wrapper>
                <p>legend goes here</p>
                <p>code: {this.props.code}</p>
            </Wrapper>
        )
    }
}

export default Legend;