// @flow

import { MuiThemeProvider, withStyles } from 'material-ui/styles'
import React, { Component, type ComponentType } from 'react'
import createContext from '../styles'
import { JssProvider } from 'react-jss'
import wrapDisplayName from 'recompose/wrapDisplayName'

// Apply some reset
const styleSheet = (theme: Object) => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      height: '100%'
    },
    body: {
      margin: 0,
      color: 'rgba(0, 0, 0, 0.87)',
      height: '100%'
    },
    '#root': { height: '100%' }
  }
})

let AppWrapper = props => props.children

AppWrapper = withStyles(styleSheet)(AppWrapper)

const context = createContext()

function withRoot(BaseComponent: ComponentType<*>) {
  class WithRoot extends Component<{}> {
    render() {
      return (
        <JssProvider
          generateClassName={ context.generateClassName }
          jss={ context.jss }
          registry={ context.sheetsRegistry }
        >
          <MuiThemeProvider sheetsManager={ context.sheetsManager } theme={ context.theme }>
            <AppWrapper>
              <BaseComponent />
            </AppWrapper>
          </MuiThemeProvider>
        </JssProvider>
      )
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot')
  }

  return WithRoot
}

export default withRoot
