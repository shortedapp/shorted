import React from 'react';
import Transition from 'react-transition-group/Transition';
import TopShortsListRow from '../../components/TopShortsListRow';
import {Wrapper, Header, More, duration, transitionStyles} from './style';
/**
 * Renders a list of TopShortsListRow components. These rows will display the stock code, stock name, and percentage shorted
 * for the top say 20 stocks. With a "show more" button present at the bottom, taking them to a different view which will me dedicated to showing more short position
 * information for more stocks (maybe top 100). Will perhaps a more verbose set of properties and graphics.
 * TODO:
 *  * load profile on select of a specific stock in list
 */
class TopShortsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inside: false,
            hovered: false,
        };
    }
    componentDidMount() {
        this.toggleEnterState();
    }

    toggleEnterState() {
        this.setState({inside: true});
    }
    handleHover(value) {
        this.setState({hovered: value});
    }
    handleMouseLeave() {
        this.setState({
            hovered: false,
        });
    }

    render() {
        const theme = this.props.theme;
        const rows = this.props.data.map(row_data => (
            <TopShortsListRow
                row
                theme={theme}
                isHovered={this.state.hovered === row_data.code}
                onHover={() => this.handleHover(row_data.code)}
                key={row_data.code}
                {...row_data}
            />
        ));
        return (
            <Transition timeout={duration} in appear>
                {state => {
                    return (
                        <Wrapper
                            {...theme}
                            onMouseLeave={() => this.handleMouseLeave()}
                            duration={duration}
                            {...transitionStyles[state]}>
                            <Header {...theme}>Top Short List</Header>
                            <TopShortsListRow header />
                            {rows}
                            <More {...theme}>show more</More>
                        </Wrapper>
                    );
                }}
            </Transition>
        );
    }
}

export default TopShortsList;