import React from 'react';
import {Wrapper} from './style';
import Button from '../../../../components/Button';

/**
 * WindowPicker
 * Responsible for providing a time window selector across a range of values including 1d, 1w, 1m, 1y etc.
 * will set the container state which will adjust the query. This will be set by a uni-directional handler passed
 * down as a prop.
 *
 */

class WindowPicker extends React.Component {
    render() {
        const {options, selectedOption, onSelect, theme} = this.props;
        const buttons = options.values.map(value => (
            <Button
                theme={theme}
                key={value}
                value={value}
                selected={value === selectedOption}
                handleSelect={onSelect}
            />
        ));
        return (
            <Wrapper {...theme}>
                <div className="buttons">{buttons}</div>
            </Wrapper>
        );
    }
}

export default WindowPicker;
