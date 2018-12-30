import express from 'express'
import config from 'config'
import apolloConnect from './startup/apolloServer'
import middlewares from './startup/middlewares'
import database from './startup/database'
import logger from './utils/logging'
import seedDB from './utils/seed'

const app = express()

middlewares(app)
database()
seedDB()
apolloConnect(app)

app.listen(config.get('PORT'), () => {
  logger.info(`💭 running env: ${config.get('env')}`)
  logger.info(`🚀 Server ready @port: ${config.get('PORT')}`)
})
