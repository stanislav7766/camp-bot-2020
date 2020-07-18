import commandHandlers from '../handlers'
import { commands } from '../tools/markup'
import { contextTreeUser, context } from '../tools/context'
import logger from '../tools/logger'
import deps from '../dependencies'

const { markupKeyboard } = deps
const { authorizeHandler, userHandler } = commandHandlers

export const commandSelecter = (command, ctx) =>
  ({
    [commands.START]: () => {
      textMessageResponse(command, ctx.reply, markupKeyboard)
    },
    [commands.INFO]: () => {
      textMessageResponse(command, ctx.reply, markupKeyboard)
    },
    [commands.HELP]: () => {
      textMessageResponse(command, ctx.reply, markupKeyboard)
    },
    [commands.TODAY]: () => {
      textMessageResponse(command, ctx.reply, markupKeyboard)
    },
    [commands.TOMORROW]: () => {
      textMessageResponse(command, ctx.reply, markupKeyboard)
    },
    [commands.WHOLE]: () => {
      textMessageResponse(command, ctx.reply, markupKeyboard)
    },
    [commands.MY_SCHEDULE]: () => {
      textMessageResponse(command, ctx.reply, markupKeyboard)
    },
    [commands.ALL_CAMP_SCHEDULE]: () => {
      textMessageResponse(command, ctx.reply, markupKeyboard)
    },
    [commands.GROUP1]: () => {
      textMessageResponse(command, ctx.reply, markupKeyboard)
    },
    [commands.GROUP2]: () => {
      textMessageResponse(command, ctx.reply, markupKeyboard)
    },
    [commands.GROUP3]: () => {
      textMessageResponse(command, ctx.reply, markupKeyboard)
    },
    [commands.AUTHORIZE]: () => authorizeCommand(ctx),
    [commands.MY_SCORE]: () => myScoreCommand(ctx),
    [commands.ALL_CAMP_SCORE]: () => allCampScoreCommand(ctx),
    [commands.GET_ALL_SCORES]: () => getAllScoresCommand(ctx),
  }[command])

const authorizeCommand = async tg => {
  const nickname = tg.from.username

  try {
    const res = await authorizeHandler.authorizeUser({ nickname })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}

const myScoreCommand = async tg => {
  const nickname = tg.from.username

  try {
    const res = await userHandler.getMyScore({ nickname })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}

const allCampScoreCommand = async tg => {
  try {
    const res = await userHandler.getAllCampScore()
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
const getAllScoresCommand = async tg => {
  const { id } = tg.from
  try {
    const res = await userHandler.getAllScores()
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
    console.log(res.data)
    await tg.replyWithDocument({
      source: res.data,
      filename: `${commands.GET_ALL_SCORES}.pdf`,
    })
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
