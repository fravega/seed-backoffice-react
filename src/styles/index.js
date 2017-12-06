// @flow

import { green, purple } from 'material-ui/colors'
import { jss, SheetsRegistry } from 'react-jss'
import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import { createMuiTheme } from 'material-ui/styles'
import jssNested from 'jss-nested'

// Use plugins.
jss.use(jssNested())

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  }
})

const sheetsManager: Map<*, *> = new Map()

const createContext = {
  jss,
  theme,
  // This is needed in order to deduplicate the injection of CSS in the page.
  sheetsManager,
  // This is needed in order to inject the critical CSS.
  generateClassName: createGenerateClassName(),
  sheetsRegistry: new SheetsRegistry()
}

export default function getContext() {
  return createContext
}
