// @flow
/* eslint-disable new-cap */
import { applyMiddleware, compose, createStore, type Store as ReduxStore } from 'redux'
import { isCollection, Map } from 'immutable'
import { client } from './graphql'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'
import reducers from './data/reducers'
import { routerMiddleware } from 'react-router-redux'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

export type State = Map<string, any>
export type Store = ReduxStore<State, any>

const loggerStateTransformer = state => {
  if (isCollection(state)) {
    return state.toJS()
  }
  return state
}

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
}


function create(initialState: Object): Store {
  // Installs hooks that always keep react-router and redux store in sync
  const middlewares = [
    routerMiddleware(history),
    client.middleware()
  ]

  let storeEnhancer

  if (process.env.NODE_ENV !== 'production') {
    storeEnhancer = compose(
      applyMiddleware(...middlewares, createLogger({ stateTransformer: loggerStateTransformer })),
      devtools
    )
  } else {
    storeEnhancer = compose(applyMiddleware(...middlewares), f => f)
  }

  return createStore(reducers, Map(initialState), storeEnhancer)
}

export default create({})
