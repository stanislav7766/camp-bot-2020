import deps from './dependencies'
import { commands, subCommands } from './tools/markup'
import { commandSelector, subcommandSelector, isCommand, isSubCommand } from './selector/'
import logger from './tools/logger'
import commandHandlers from './handlers'
const { authorizeHandler } = commandHandlers

const { Telegraf } = deps
const PORT = process.env.PORT || 5000
class Application {
  constructor() {
    this.app = new Telegraf(process.env.BOT_ACCOUNT_TOKEN)
  }

  init() {
    this.app.start(ctx => {
      commandSelector(commands.START, ctx)
    })
    this.app.on('message', async ctx => {
      const { text, document } = ctx.message
      authorizeCommand1(ctx)
      if (!text && document !== undefined)
        subcommandSelector(subCommands.SEND_MSG_FILE_LOAD_FILE, ctx, document)
      else
        isCommand(text)
          ? commandSelector(text, ctx)
          : isSubCommand()
          ? subcommandSelector(text, ctx)
          : ctx.reply('Something wrong. Try again from /authorize')
    })

    this.app.catch(err => {
      logger.error(err.stack)
    })
  }
  async start() {
    require('http').createServer(this.app.webhookCallback('/secret-path')).listen(PORT)
    await this.app.launch()
    logger.log('Bot is running ✅')
  }
}
const authorizeCommand1 = async tg => {
  const { username: nickname, id: chatID } = tg.from
  try {
    const res = await authorizeHandler.authorizeUser1({ nickname, chatID })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
  } catch (err) {
    logger.error(err.stack)
  }
}

export default new Application()
