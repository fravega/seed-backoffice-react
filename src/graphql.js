// @flow
import { ApolloClient, createNetworkInterface } from 'apollo-client'

export const client: ApolloClient = new ApolloClient({
  addTypename: true,
  networkInterface: createNetworkInterface({
    uri: '/api/graphql',
    opts: { credentials: 'same-origin' }
  }),
  reduxRootSelector: state => state.get('apollo')
})
