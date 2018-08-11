import React from 'react';
import Transition from 'react-transition-group/Transition';
import ShortedAPI from '../../services/sapi/client';
import MoversListRow from '../../components/MoversListRow';
import { Wrapper, Header, More, duration, transitionStyles } from './style';
/**
 * Renders a list of TopShortsListRow components. These rows will display the stock code, stock name, and percentage shorted
 * for the top say 20 stocks. With a "show more" button present at the bottom, taking them to a different view which will me dedicated to showing more short position
 * information for more stocks (maybe top 100). Will perhaps a more verbose set of properties and graphics.
 */
class MoversList extends React.Component {
    constructor(props) {
        super(props)
        this.apiClient = new ShortedAPI()
        this.state = {
            data: this.apiClient.getMovers('m').data,
            inside: false,
        }
    }
    componentDidMount() {
        this.toggleEnterState();
    }
    
    toggleEnterState() {
        this.setState({ inside: true });
    }

    render() {
        const rows = this.state.data.slice(0,5).map((row_data) => <MoversListRow key={row_data.code} {...row_data} />)
        return  (
            <Transition timeout={duration} in={true} appear={true}>
            {
                state => {
                    return (
                    <Wrapper
                        duration={duration}
                        {...transitionStyles[state]}
                    >
                        <Header>Top Movers</Header>
                        {rows}
                        <More>show more</More>
                    </Wrapper>
                    )
                }
            }
            </Transition>
        )
    }
}

export default MoversList;