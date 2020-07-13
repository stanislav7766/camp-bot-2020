import deps from './dependencies'
import { contextTree, context } from './tools/context'
import { commands } from './tools/markup'
import logger from './tools/logger'

const { Telegraf, Markup } = deps

class Application {
  constructor() {
    this.app = new Telegraf(process.env.BOT_ACCOUNT_TOKEN)
  }
  init() {
    this.app.start(async ctx => {
      const reply = (...args) => ctx.reply(...args)
      textMessageResponse(commands.START, reply, keyboard)
    })
    this.app.on('message', async ctx => {
      const reply = (...args) => ctx.reply(...args)
      const { text } = ctx.message

      Object.values(commands).includes(text)
        ? textMessageResponse(text, reply, keyboard)
        : reply('чет ты не команду ввел-_-')
    })

    this.app.catch(err => {
      logger.error(err.stack)
    })
  }
  async start() {
    await this.app.launch()
    logger.log('Bot is running')
  }
}

const textMessageResponse = async (command, fn, keyboard) => {
  try {
    const ctx = contextTree.getCurrentCtx(command)

    context.emit('changeContext', ctx)
    await fn(ctx.papyrus, keyboard(ctx.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
const keyboard = (...args) =>
  Markup.keyboard(...args)
    .oneTime()
    .resize()
    .extra()

export default new Application()
