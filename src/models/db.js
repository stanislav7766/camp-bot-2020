import deps from '../dependencies'
import logger from '../tools/logger'
import { mongooseConfig } from '../configs'

const { mongoose } = deps

const bootstrapDB = () => {
  try {
    mongoose.connect(process.env.MONGO, mongooseConfig)
    mongoose.connection.once('open', () => {
      logger.log('Connected to database ✅')
    })
    mongoose.connection.on('error', err => {
      logger.error(err.stack)
      process.exit(-1)
    })
  } catch (err) {
    logger.error(err.stack)
  }
}

export default bootstrapDB
