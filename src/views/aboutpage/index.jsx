import React from 'react';
import Transition from 'react-transition-group/Transition';
import AppViewWrapper from '../../components/AppViewWrapper';
import headerBackground from '../../assets/images/header-background.svg';
import { themes, duration, transitionStyles } from './style';

class AboutPage extends React.Component {
    constructor(props) {
        super(props);
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
                        hello
                    </AppViewWrapper>
                        )
                }
            }
            </Transition>
            )
    }
}

export default AboutPage;