import mongoose from 'mongoose'
import config from 'config'
import Joi from 'joi'
import joiBind from 'joi-objectid'
import logger from '../utils/logging'

export default async function() {
  Joi.objectId = joiBind(Joi)
  try {
    await mongoose.connect(
      config.get('DB_URI'),
      { useCreateIndex: true, useFindAndModify: false }
    )
    logger.info(`🎉 connected to ${config.get('env')} db`)
  } catch (error) {
    logger.error(`${error}`)
  }
}
