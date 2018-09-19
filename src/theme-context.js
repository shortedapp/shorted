import React from 'react';
export const themes = {
    light: {
        name: 'light',
        style: {
            color: 'black',
            textTitleColor: 'black',
            textSubTitleColor: 'black',
            textColor: 'black',
            background: 'white',
            widgetBorder: 'white',
            widgetBackgroundColor: 'white',
            widgetRowBackgroundColor: 'white',
            widgetRowBorderColor: 'gray',
            graphBackground: '#e7e7e7',
            fill: 'white',
            stroke: 'black',
            upStroke: 'green',
            downStroke: 'red',
            buttonSelected: '#5fa0dd',
            buttonUnselected: '#7d7d7d',
            axisColor: 'black',
            searchIconColorUnfocused: 'black',
            searchIconBackgroundUnfocused: '#d9d9d9',
            searchIconColorFocused: 'white',
            searchIconBackgroundFocused: 'black',
            searchBarBackgroundFocused: 'white',
            searchBarBackgroundUnfocused: '#d9d9d9',
            searchBarBorderUnfocused: 'gray',
            searchBarBorderFocused: '#1890ff'
        },
    },
    dark: {
        name: 'dark',
        style: {
            color: 'white',
            textTitleColor: 'white',
            textSubTitleColor: 'white',
            textColor: 'white',
            background: '#161616',
            widgetBorderColor: '#1C1C1C',
            widgetBackgroundColor: '#1F1F1F',
            // widgetRowBackgroundColor: '#646464',
            widgetRowBackgroundColor: '#242424',
            widgetRowBorderColor: 'gray',
            graphBackground: '#1F1F1F',
            stroke: 'white',
            upStroke: 'green',
            downStroke: 'red',
            buttonSelected: '#1890ff',
            buttonUnselected: '#001529',
            axisColor: 'white',
            searchIconColorUnfocused: 'black',
            searchIconBackgroundUnfocused: '#d9d9d9',
            searchIconColorFocused: 'white',
            searchIconBackgroundFocused: 'black',
            searchBarBackgroundFocused: 'white',
            searchBarBackgroundUnfocused: '#d9d9d9',
            searchBarBorderUnfocused: 'gray',
            searchBarBorderFocused: '#1890ff'
        },
    },
};

export const ThemeContext = React.createContext(
    themes.dark, // default value
);
