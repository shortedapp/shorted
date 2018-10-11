import React from 'react';
import Transition from 'react-transition-group/Transition';
import {ThemeContext} from 'src/theme-context';
import { Row, RowHeader } from './components';
import {Wrapper, ListViewHeader, ListViewRows, EmptyList, duration, transitionStyles} from './style';
/**
 * Renders a list of Row components. These rows will display an alert card for events occuring for a given stock
 * TODO:
 *  * load alerts async
 *  * render an infinit scroll list box
 *  * dynamically scaling window and rows collapse the amount of information present depending on width
 *  * add themeing
 *  * add animation
 *  * add styling
 */
class AlertListView extends React.Component {
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
        const rows = this.props.data ? this.props.data.map(row_data => (
            <Row></Row>
        )) : <EmptyList>No Alerts Found</EmptyList>
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <Transition timeout={duration} in appear>
                        {state => {
                            return (
                                <Wrapper
                                    {...theme}
                                    onMouseLeave={() => this.handleMouseLeave()}
                                    duration={duration}
                                    {...transitionStyles[state]}>
                                    {this.props.data ? <RowHeader /> : null}
                                    {rows}
                                </Wrapper>
                            );
                        }}
                    </Transition>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default AlertListView;
