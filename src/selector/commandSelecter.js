import commandHandlers from '../handlers'
import { commands } from '../tools/markup'
import { contextTreeUser, context } from '../tools/context'
import logger from '../tools/logger'
import deps from '../dependencies'

const { markupKeyboard } = deps
const { authorizeHandler } = commandHandlers

export const commandSelecter = (command, ctx) =>
  ({
    [commands.START]: () => {
      textMessageResponse(command, ctx.reply, markupKeyboard)
    },
    [commands.HELP]: () => {
      textMessageResponse(command, ctx.reply, markupKeyboard)
    },
    [commands.AUTHORIZE]: () => authorizeCommand(ctx),
  }[command])

const authorizeCommand = async tg => {
  const nickname = tg.from.username

  try {
    const res = await authorizeHandler.authorizeUser({ nickname })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, res.keyboard)
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}

const textMessageResponse = async (command, fn, keyboard) => {
  try {
    const ctx = contextTreeUser.getCurrentCtx(command)

    context.emit('changeContext', ctx)
    await fn(ctx.papyrus, keyboard(ctx.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
