/* eslint-disable dot-notation, consistent-this */

const fetch = require('node-fetch')
const { HttpLink } = require('apollo-link-http')
const { introspectSchema, makeRemoteExecutableSchema, mergeSchemas } = require('graphql-tools')
// const { weaveSchemas, transformExtendedSchema } = require('graphql-weaver')


const priceFetcher = ({ query, variables, operationName, context }) => {
  const token = context && context.graphqlContext.securityToken
  const headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const req = fetch(process.env.REACT_APP_PRICE_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables, operationName })
  })
  return req.then(_ => _.json())
}

const priceSchema = introspectSchema(priceFetcher)
  .then(schema => makeRemoteExecutableSchema({ schema, fetcher: priceFetcher }))


const searchLink = new HttpLink({ uri: process.env.REACT_APP_SEARCH_ENDPOINT, fetch })

const searchSchema = introspectSchema(searchLink)
  .then(schema => makeRemoteExecutableSchema({ schema, link: searchLink }))

const schemas = Promise.all([ priceSchema, searchSchema ])

/*
class TypeOverrideModule {

  constructor(typeName) {
    this.typeName = typeName
    this.count = 0

    this.getAndInc = this.getAndInc.bind(this)
  }

  getAndInc() {
    this.count = this.count + 1
    return this.count
  }

  transformExtendedSchema(schema) {
    const self = this

    return transformExtendedSchema(schema, {
      transformScalarType(type) {
        if (type.name !== self.typeName) {
          return type
        }

        return {
          ...type,
          name: `${self.typeName}_${self.getAndInc()}`
        }
      }
    })
  }
}

const extraModules = [
  new TypeOverrideModule('NonEmptyString'),
  new TypeOverrideModule('Price'),
  new TypeOverrideModule('PositiveInt'),
  new TypeOverrideModule('PositiveIntOrZero'),
  new TypeOverrideModule('OffsetDateTime')
]

const weaveSchema = weaveSchemas({
  endpoints: [
    {
      // namespace: 'price',
      // typePrefix: 'Price',
      url: process.env.REACT_APP_PRICE_ENDPOINT
    },
    {
      // namespace: 'search',
      // typePrefix: 'Search',
      url: process.env.REACT_APP_SEARCH_ENDPOINT
    }
  ],
  pipelineConfig: {
    transformPreMergePipeline(modules) {
      return modules.concat(extraModules)
    }
  }
})
*/

module.exports = { schema: schemas.then(schemas => mergeSchemas({ schemas })) }
