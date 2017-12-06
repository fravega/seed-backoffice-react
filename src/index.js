// @flow
import 'es6-shim'
import store, { history } from './store'
import { ApolloProvider } from 'react-apollo'
import { client } from './graphql'
import { ConnectedRouter } from 'react-router-redux'
import { CookiesProvider } from 'react-cookie'
import MainPage from './pages'
import React from 'react'
import ReactDOM from 'react-dom'

const root = document.getElementById('root')

if (root) {
  ReactDOM.render((
    <ApolloProvider client={ client } store={ store }>
      <ConnectedRouter history={ history }>
        <CookiesProvider>
          <MainPage />
        </CookiesProvider>
      </ConnectedRouter>
    </ApolloProvider>), root)
}
