import React from 'react';
import {
    Button,
    OptionsWrapper,
    OptionWrapper,
    Option,
    Wrapper
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
        return (<Wrapper>
            <Button onClick={() => this.handleSelect()} >   
            </Button>
            <Options open={this.state.open} />
            </Wrapper>
        )
    }
}

export default ChartOptions;