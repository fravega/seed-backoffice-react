/* eslint-disable no-console, no-process-exit, no-sync*/
const dev = process.env.NODE_ENV !== 'production'

if (dev) {
  require('dotenv').config({ path: '.env.development' })
}
const logger = require('./logger')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { schema: graphQLSchema } = require('./graphql')

const app = express()

const PORT = process.env.PORT || 3001

app.use(morgan(dev ? 'dev' : 'common'))
app.use(compression({ threshold: 0 }))
app.use(cors())


app.use(cookieParser())

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')))
}

graphQLSchema.then(schema => {
  app.use('/api/graphql', bodyParser.json(), graphqlExpress(req => ({
    schema,
    context:
    { securityToken: req.cookies['X-FVG-TOKEN'] || req.cookies['X-FVG-TOKEN-CORS'] || req.get('Authorization') }
  })))

  app.use('/api/graphiq', graphiqlExpress({ endpointURL: '/api/graphql' }))

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })

  app.use((req, res) => {
    res.render('404', { status: 404, url: req.url })
  })

  app.listen(PORT, error => {
    if (error) {
      logger.error(error)
      return process.exit(1)
    }

    logger.info(`Running in ${process.env.NODE_ENV} mode`)
    logger.info(`Find the server at: http://0.0.0.0:${PORT}/`)
  })
}).catch(err => logger.error(err))
