import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import ShortedAPI from '../src/services/sapi/client';
import { Button, Welcome } from '@storybook/react/demo';
import SearchBar from '../src/components/SearchBar';
import AnalyticsRow from '../src/components/AnalyticsRow';
import TopShortsList from '../src/views/summary/components/TopShortsList';
import {ThemeContext, themes} from '../src/theme-context';
const apiClient = new ShortedAPI()
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
storiesOf('SearchBar', module)
    .addDecorator(story => (
        <ThemeContext.Provider value={themes}>
            <ThemeContext.Consumer>
                {themes => { return story(themes)}}
            </ThemeContext.Consumer>
        </ThemeContext.Provider>))
    .add('light', (themes) => <SearchBar theme={themes['light'].style} />)

storiesOf('Summary/TopShortsList', module)
    .addDecorator(story => (
        <ThemeContext.Provider value={themes}>
            <ThemeContext.Consumer>
                {themes => { return story(themes)}}
            </ThemeContext.Consumer>
        </ThemeContext.Provider>))
    .add('light', (themes) => <TopShortsList
        theme={themes['light'].style}
        data={apiClient.getTopShortsList(20)}
    />)
    .add('dark', (themes) => <TopShortsList
        theme={themes['dark'].style}
        data={apiClient.getTopShortsList(20)}
    />)
storiesOf('AnalyticsRow', module)
    .addDecorator(story => (
        <ThemeContext.Provider value={themes}>
            <ThemeContext.Consumer>
                {themes => { return story(themes)}}
            </ThemeContext.Consumer>
        </ThemeContext.Provider>))
    .add('light', (themes) => <AnalyticsRow
        theme={themes['light'].style}
        {...apiClient.getTopShortsList(20)[0]}
    />)