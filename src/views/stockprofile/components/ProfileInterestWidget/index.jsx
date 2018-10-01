import React from 'react';
import {Popover, Icon} from 'antd';
import {ThemeContext} from 'src/theme-context';
import SimpleSpark from 'src/components/SimpleSpark';
import {
    Wrapper,
    WidgetUnitWrapper,
    WidgetGraphWrapper,
    WidgetValueWrapper,
    WidgetInfoWrapper,
    WidgetDescriptionWrapper,
} from './style';

const infoContent = (
    <div>
        <p>The number of searches or user</p>
        <p>queries for this stock</p>
    </div>
);
/**
 * Top Navbar responsible for rendering the basic site-map layout including: blog | about | disclaimer etc
 * Will also manage the implementation of the navbar collapse on mobile devices i.e transition to burger and burger animation on open/close etc.
 * TODO:
 * * handle mobile compaction of navbar component
 *
 */
class ProfileSectorWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <Wrapper>
                        <WidgetUnitWrapper {...theme}>Users</WidgetUnitWrapper>
                        <WidgetValueWrapper {...theme}>
                            {this.props.data[this.props.data.length - 1].y}
                        </WidgetValueWrapper>
                        <WidgetDescriptionWrapper {...theme}>
                            Total user Interest
                        </WidgetDescriptionWrapper>
                        <WidgetGraphWrapper>
                            <SimpleSpark showMinMax data={this.props.data} />
                        </WidgetGraphWrapper>
                        <WidgetInfoWrapper>
                            <Popover
                                content={infoContent}
                                title="Total User Interest"
                                trigger="hover">
                                <Icon
                                    fill={
                                        theme.profileHeaderWidgetInfoIconColor
                                    }
                                    style={{
                                        color:
                                            theme.profileHeaderWidgetInfoIconColor,
                                    }}
                                    type="info-circle"
                                    theme="outlined"
                                />
                            </Popover>
                        </WidgetInfoWrapper>
                    </Wrapper>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default ProfileSectorWidget;
