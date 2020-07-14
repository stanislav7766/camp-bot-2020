import commandHandlers from '../handlers'
import { commands } from '../tools/markup'
import { contextTreeUser, contextTreeAdmin, context } from '../tools/context'
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
    [commands.AUTHORIZE]: async () => {
      const nickname = ctx.from.username
      try {
        const res = await authorizeHandler.authorizeUser({ nickname })
        if (res.result !== 'ok') {
          ctx.reply('ты недостоин')
          return
        }
        const { status } = res
        const ctxx =
          status === 'user'
            ? contextTreeUser.getCurrentCtx(command)
            : contextTreeAdmin.getCurrentCtx(command)
        context.emit('changeContext', { ...ctxx, status })
        await ctx.reply(ctxx.papyrus, markupKeyboard(ctxx.keyboard))
      } catch (error) {
        logger.error(err.stack)
      }
    },
  }[command])

const textMessageResponse = async (command, fn, keyboard) => {
  try {
    const ctx = contextTreeUser.getCurrentCtx(command)

    context.emit('changeContext', ctx)
    await fn(ctx.papyrus, keyboard(ctx.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
