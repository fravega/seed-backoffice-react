/* eslint-disable dot-notation, consistent-this */
const fetch = require('node-fetch')
const { HttpLink } = require('apollo-link-http')
const { introspectSchema, makeRemoteExecutableSchema, mergeSchemas } = require('graphql-tools')

const externalAppLink = new HttpLink({ uri: 'ENV_ENDPOINT', fetch })

const externalAppSchema = introspectSchema(externalAppLink)
  .then(schema => makeRemoteExecutableSchema({ schema, link: externalAppLink }))

const schemas = Promise.all([ externalAppSchema ])

module.exports = { schema: schemas.then(schemas => mergeSchemas({ schemas })) }
