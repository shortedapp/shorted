import React from 'react';
import { Wrapper } from './style';

import Button from '../Button';

/**
 * WindowPicker
 * Responsible for providing a time window selector across a range of values including 1d, 1w, 1m, 1y etc.
 * will set the container state which will adjust the query. This will be set by a uni-directional handler passed
 * down as a
 * 
 */

class WindowPicker extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            values: [ 'd', 'w', 'm', 'y']
        }
    }


    render() {
        const buttons = this.state.values.map( value => (<Button value={value}/>))
        return (
            <Wrapper>
                <div className='buttons' >
                    {buttons}
                </div>
            </Wrapper>
        )
    }
}

export default WindowPicker;