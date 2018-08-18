import React from 'react';
import {Wrapper} from './style';
import Button from '../Button';

/**
 * WindowPicker
 * Responsible for providing a time window selector across a range of values including 1d, 1w, 1m, 1y etc.
 * will set the container state which will adjust the query. This will be set by a uni-directional handler passed
 * down as a prop.
 *
 */

class WindowPicker extends React.Component {
    render() {
        const {options, selectedOption, onSelect} = this.props;
        const buttons = options.values.map(value => (
            <Button
                key={value}
                value={value}
                selected={value === selectedOption}
                handleSelect={onSelect}
            />
        ));
        return (
            <Wrapper>
                <div className="buttons">{buttons}</div>
            </Wrapper>
        );
    }
}

export default WindowPicker;
