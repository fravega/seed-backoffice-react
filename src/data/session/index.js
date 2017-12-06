// @flow
import { createAction, handleAction } from 'redux-actions'

export type Session = {
  email: string,
  permissions: Array<string>
}

export const storeSession = createAction('STORE-SESSION')

export const reducer = handleAction(storeSession, (state, { payload }) => ({ ...payload }), {})
