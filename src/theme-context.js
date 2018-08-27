import React from 'react'
export const themes = {
  light: {
    name: 'light',
    style: {
      color: 'black',
      background: 'white',
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
      background: '#001529',
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
