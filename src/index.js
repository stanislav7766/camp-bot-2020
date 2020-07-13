import deps from './dependencies'
import logger from './tools/logger'
import application from './app'

const { dotenv, path } = deps

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const bootstap = () => {
  try {
    application.init()
    application.start()
  } catch (err) {
    logger.error(err.stack)
  }
}
bootstap()
