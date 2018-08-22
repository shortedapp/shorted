import React from 'react';
import Transition from 'react-transition-group/Transition';
import AppViewWrapper from '../../components/AppViewWrapper';
import AboutHeader from './components/AboutHeader';
import {duration, transitionStyles} from './style';

class AboutPage extends React.Component {
    render() {
        return (
            <Transition timeout={duration} in appear>
                {state => {
                    return (
                        <AppViewWrapper
                            background={null}
                            duration={duration}
                            {...transitionStyles[state]}>
                            <AboutHeader />
                        </AppViewWrapper>
                    );
                }}
            </Transition>
        );
    }
}

export default AboutPage;
