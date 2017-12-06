// @flow
import { client } from '../graphql'
import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'
import { routerReducer } from 'react-router-redux'
import { reducer as sessionReducer } from './session'

export default combineReducers({
  form: formReducer,
  session: sessionReducer,
  router: routerReducer,
  apollo: client.reducer()
})
