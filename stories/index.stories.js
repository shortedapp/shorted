import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import SearchBar from '../src/components/SearchBar3';
import {ThemeContext, themes} from '../src/theme-context';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
const searchClient = (query) => [ ]
storiesOf('SearchBar', module)
    .addDecorator(story => (
        <ThemeContext.Provider value={themes}>
            <ThemeContext.Consumer>
                {themes => { return story(themes)}}
            </ThemeContext.Consumer>
        </ThemeContext.Provider>))
    .add('light', (themes) => <SearchBar theme={themes['light'].style} />)
