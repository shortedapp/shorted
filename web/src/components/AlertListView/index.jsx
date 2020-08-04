import React from 'react';
import Transition from 'react-transition-group/Transition';
import {IconContext} from 'react-icons/src/iconContext';
import {ThemeContext} from 'src/theme-context';

import Row from './components/Row';
import {Wrapper, EmptyList, duration, transitionStyles} from './style';
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
        const rows = this.props.data ? (
            this.props.data.alerts.map((row_data, index) => (
                <Row key={`alert-row-${index}`} data={row_data} />
            ))
        ) : (
            <EmptyList>No Alerts Found</EmptyList>
        );
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
                                    <IconContext.Provider
                                        value={{
                                            color:
                                                theme.profileSidePanelTextColor,
                                            size: '2.2em',
                                        }}>
                                        {rows}
                                    </IconContext.Provider>
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
