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
      fill: 'white',
      stroke: 'black',
      upStroke: 'green',
      downStroke: 'red',
      buttonSelected: '#5fa0dd',
      buttonUnselected: '#7d7d7d'
    }
  },
  dark: {
    name: 'light',
    style: {
      color: 'white',
      textTitleColor: 'white',
      textSubTitleColor: 'white',
      textColor: 'white',
      background: '#001529',
      widgetBorder: '#0e2d4a',
      widgetBackgroundColor: '#233c52',
      widgetRowBackgroundColor: '#7c98b2',
      stroke: 'white',
      upStroke: 'green',
      downStroke: 'red',
      buttonSelected: '#1890ff',
      buttonUnselected: '#001529'
    }
  }
}

export const ThemeContext = React.createContext(
  themes.dark // default value
)
