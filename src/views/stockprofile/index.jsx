import React from 'react';
import Transition from 'react-transition-group/Transition';
import headerBackground from '../../assets/images/header-background.svg';
import AppViewWrapper from '../../components/AppViewWrapper';
import { StockProfileWrapper, duration, transitionStyles } from './style';


/**
 * View:TopShorts
 * Overarching container for the top short view.
 * Showing the following key widgets/displays:
 *  * top 10 short positions graphically.
 *  * table of top short position changes
 *  * alerts/anomalies
 *  * reactive-widget on hover/select of a given graph
 * TODO:
 * * add Transitions of components such as window picker, graph and background etc.
 * * add graph integration via recharts etc.
 * * add legend component for on-select animation/effect
 * 
 */

class StockProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                values: ['d', 'w', 'm', 'y'],
            },
            selectedOption: 'w',
            inside: false,
        }
    }
    handleOptionSelected(value) {
        this.setState({
            selectedOption: value,
        })
    }
    componentDidMount() {
        this.toggleEnterState();
    }
    toggleEnterState() {
        this.setState({ inside: true });
    }

    render() {
        return (
            <Transition timeout={duration} in={true} appear={true}>
            {
                state => {
                    return (
                    <AppViewWrapper
                        background={headerBackground}
                        duration={duration}
                        {...transitionStyles[state]}
                        >
                        <StockProfileWrapper>
                            <div>
                            {this.props.data.stocksYaml.code}
                            </div>
                        </StockProfileWrapper>
                    </AppViewWrapper>
                    )
                }
            }
            </Transition>
            )
            
    }
}


export default StockProfileView;
