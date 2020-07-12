import dotenv from 'dotenv'
import { logger } from './tools/logger'
import application from './app'

dotenv.config({ path: '../.env' })

const bootstap = () => {
  try {
    application.init()
    application.start()
  } catch (err) {
    logger.useLogger('error', { msg: err.msg, name: error.name })
  }
}
bootstap()
