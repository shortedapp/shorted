import React from 'react';
import {Wrapper, Image} from './style';

/**
 * Renders a nicely styled and dynamically scaling header for the legend view which will display the company icon/logo
 * as well as its stock code.
 *
 */
class LegendCompanyLogo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {dimensions: {}};
        this.onImgLoad = this.onImgLoad.bind(this);
    }
    onImgLoad({target:img}) {
        console.log(img)
        this.setState({dimensions:{height:img.offsetHeight,
                                   width:img.offsetWidth}})
    }
    onComponentWillMount() {
        console.log(this.props.logo)
    }
    render () {
        console.log(this.state.dimensions)
        return (
        <Wrapper>
            <Image height={60} width={60} onLoad={this.onImgLoad} src={this.props.logo} />
        </Wrapper>
        )
    }
}
export default LegendCompanyLogo;
