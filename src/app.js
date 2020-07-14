import deps from './dependencies'
import { commands } from './tools/markup'
import { commandSelecter } from './selector/commandSelecter'
import logger from './tools/logger'

const { Telegraf } = deps

class Application {
  constructor() {
    this.app = new Telegraf(process.env.BOT_ACCOUNT_TOKEN)
  }
  init() {
    this.app.start(ctx => {
      commandSelecter(commands.START, ctx)()
    })
    this.app.on('message', async ctx => {
      const { text } = ctx.message

      Object.values(commands).includes(text)
        ? commandSelecter(text, ctx)()
        : ctx.reply('чет ты не команду ввел-_-')
    })

    this.app.catch(err => {
      logger.error(err.stack)
    })
  }
  async start() {
    await this.app.launch()
    logger.log('Bot is running ✅')
  }
}

export default new Application()
