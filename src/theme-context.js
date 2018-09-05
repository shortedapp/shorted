import React from 'react'
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
      graphBackground: '#e7e7e7',
      fill: 'white',
      stroke: 'black',
      upStroke: 'green',
      downStroke: 'red',
      buttonSelected: '#5fa0dd',
      buttonUnselected: '#7d7d7d',
      axisColor: 'black'
    }
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
      widgetRowBackgroundColor: '#646464',
      graphBackground: '#1F1F1F',
      stroke: 'white',
      upStroke: 'green',
      downStroke: 'red',
      buttonSelected: '#1890ff',
      buttonUnselected: '#001529',
      axisColor: 'white'
    }
  }
}

export const ThemeContext = React.createContext(
  themes.dark // default value
)
