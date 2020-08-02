import deps from './dependencies'
import { commands, subCommands } from './tools/markup'
import { commandSelector, subcommandSelector, isCommand, isSubCommand } from './selector/'
import logger from './tools/logger'

const { Telegraf } = deps

class Application {
  constructor() {
    this.app = new Telegraf(process.env.BOT_ACCOUNT_TOKEN)
  }
  async mapCronJobs() {
    commandSelector(commands.START_CRONS)
  }
  init() {
    this.app.start(ctx => {
      commandSelector(commands.START, ctx)
    })
    this.app.on('message', async ctx => {
      const { text, document } = ctx.message
      if (!text && document !== undefined)
        subcommandSelector(subCommands.SEND_MSG_FILE_LOAD_FILE, ctx, document)
      else
        isCommand(text)
          ? commandSelector(text, ctx)
          : isSubCommand()
          ? subcommandSelector(text, ctx)
          : ctx.reply('чет ты не команду ввел-_-')
    })

    this.app.catch(err => {
      logger.error(err.stack)
    })
  }
  async start() {
    await this.app.launch()
    // await this.mapCronJobs()
    logger.log('Bot is running ✅')
  }
}

export default new Application()
