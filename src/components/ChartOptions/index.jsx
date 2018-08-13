import React from 'react';
import {
    Wrapper,
    OptionsWrapper,
    OptionWrapper,
    Option,
    } from './style';


const Options = (props) => (<OptionsWrapper {...props}>
    <Option>Option 1</Option>
    <Option>Option 1</Option>
    <Option>Option 1</Option>
    <Option>Option 1</Option>

    

</OptionsWrapper>)
class ChartOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
    }
    handleSelect() {
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }

    render() {
        return (
            <Wrapper>
                <div className="cog" onClick={() => this.handleSelect()} ></div>
                <Options open={this.state.open} />    
            </Wrapper>
        )
    }
}

export default ChartOptions;