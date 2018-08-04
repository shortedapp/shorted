import React from 'react';

import { Wrapper } from './style';
/**
 * Renders a list of TopShortsListRow components. These rows will display the stock code, stock name, and percentage shorted
 * for the top say 20 stocks. With a "show more" button present at the bottom, taking them to a different view which will me dedicated to showing more short position
 * information for more stocks (maybe top 100). Will perhaps a more verbose set of properties and graphics.
 */
class TopShortsList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <Wrapper>
            </Wrapper>
        )
    }
}