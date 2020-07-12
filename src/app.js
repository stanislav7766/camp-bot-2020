import Telegraf, { Markup } from 'telegraf'
import { contextTree, context } from './tools/context'
import { commands } from './tools/markup'
import { logger } from './tools/logger'

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
      logger.useLogger('error', { msg: err.msg, name: error.name })
    })
  }
  async start() {
    await this.app.launch()
    logger.useLogger('info', { msg: `Bot is running`, name: 'App' })
  }
}

const textMessageResponse = async (command, fn, keyboard) => {
  try {
    const ctx = contextTree.getCurrentCtx(command)

    context.emit('changeContext', ctx)
    await fn(ctx.papyrus, keyboard(ctx.keyboard))
  } catch (err) {
    logger.useLogger('error', { msg: err.msg, name: error.name })
  }
}
const keyboard = (...args) =>
  Markup.keyboard(...args)
    .oneTime()
    .resize()
    .extra()

export default new Application()
