import commandHandlers from '../handlers'
import { commands } from '../tools/markup'
import { contextTreeUser, contextTreeAdmin, context } from '../tools/context'
import logger from '../tools/logger'
import deps from '../dependencies'

const { markupKeyboard } = deps
const { authorizeHandler, userHandler, meetupHandler } = commandHandlers

export const commandSelecter = (command, ctx) =>
  ({
    [commands.START]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.INFO]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.HELP]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.TODAY]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.TOMORROW]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.WHOLE]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.MY_SCHEDULE]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.ALL_CAMP_SCHEDULE]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.ADD_POINTS]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.ADD_MEETUP]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.EDIT_MEETUP]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.DELETE_MEETUP]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.MANAGE_MEETUPS]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.GROUP1]: () => checkGroupCommands(ctx, command),
    [commands.GROUP2]: () => checkGroupCommands(ctx, command),
    [commands.GROUP3]: () => checkGroupCommands(ctx, command),
    [commands.DAY1]: () => checkDaysCommands(ctx, command),
    [commands.DAY2]: () => checkDaysCommands(ctx, command),
    [commands.DAY3]: () => checkDaysCommands(ctx, command),
    [commands.DAY4]: () => checkDaysCommands(ctx, command),
    [commands.DAY5]: () => checkDaysCommands(ctx, command),
    [commands.DAY6]: () => checkDaysCommands(ctx, command),
    [commands.AUTHORIZE]: () => authorizeCommand(ctx),
    [commands.MY_SCORE]: () => myScoreCommand(ctx),
    [commands.ALL_CAMP_SCORE]: () => allCampScoreCommand(ctx),
    [commands.GET_ALL_SCORES]: () => getAllScoresCommand(ctx),
  }[command])

export const isSubcommand = command => {
  if (isNumberPoints(command)) return true
  else if (isYesNo(command)) return true
  else if (context.getContext().command === commands.ADD_MEETUP_TITLE) return true
  else if (context.getContext().command === commands.ADD_MEETUP_TIME) return true
  else if (context.getContext().command === commands.ADD_MEETUP_FACILITATOR) return true
  else if (context.getContext().command === commands.ADD_MEETUP_AUDIENCE) return true
  else if (context.getContext().command === commands.ADD_MEETUP_LINK) return true
  else if (context.getContext().command === commands.ADD_MEETUP_CONFIRM) return true
  else return false
}
export const subcommandSelector = async (cmd, ctx) => {
  const { command } = context.getContext()
  if (command === commands.ADD_POINTS) checkTypedPointsCommand(ctx, { typedPoints: cmd })
  else if (command === commands.ADD_POINTS_TYPED_NUMBER)
    confirmTypedPointsCommand(ctx, { answer: cmd })
  else if (command === commands.ADD_MEETUP_TITLE) typedMeetupTitleCommand(ctx, { title: cmd })
  else if (command === commands.ADD_MEETUP_TIME) typedMeetupTimeCommand(ctx, { time: cmd })
  else if (command === commands.ADD_MEETUP_FACILITATOR)
    typedMeetupFacilitatorCommand(ctx, { facilitator: cmd })
  else if (command === commands.ADD_MEETUP_AUDIENCE)
    typedMeetupAudienceCommand(ctx, { audience: cmd })
  else if (command === commands.ADD_MEETUP_LINK) typedMeetupLinkCommand(ctx, { link: cmd })
  else if (command === commands.ADD_MEETUP_CONFIRM) confirmTypedMeetupCommand(ctx, { answer: cmd })
}

const checkGroupCommands = async (tg, cmd) => {
  const { command } = context.getContext()
  if (command === commands.ADD_POINTS) {
    await addPointsCommand(tg, cmd)
    return
  }
  textMessageResponse(cmd, tg.reply, markupKeyboard)
}
const checkDaysCommands = async (tg, cmd) => {
  const { command } = context.getContext()
  if (command === commands.ADD_MEETUP) {
    await addMeetupCommand(tg, { dayCmd: cmd })
    return
  }
  textMessageResponse(cmd, tg.reply, markupKeyboard)
}
const addMeetupCommand = async (tg, { dayCmd }) => {
  try {
    const res = await meetupHandler.addMeetup({ dayCmd })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
const typedMeetupLinkCommand = async (tg, { link }) => {
  try {
    const res = await meetupHandler.typedMeetupLink({ link })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}

const confirmTypedMeetupCommand = async (tg, { answer }) => {
  try {
    const res = await meetupHandler.confirmTypedMeetup({ answer })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}

const typedMeetupTitleCommand = async (tg, { title }) => {
  try {
    const res = await meetupHandler.typedMeetupTitle({ title })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}

const typedMeetupAudienceCommand = async (tg, { audience }) => {
  try {
    const res = await meetupHandler.typedMeetupAudience({ audience })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
const typedMeetupFacilitatorCommand = async (tg, { facilitator }) => {
  try {
    const res = await meetupHandler.typedMeetupFacilitator({ facilitator })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}

const typedMeetupTimeCommand = async (tg, { time }) => {
  try {
    const res = await meetupHandler.typedMeetupTime({ time })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}

const checkTypedPointsCommand = async (tg, { typedPoints }) => {
  try {
    const res = await userHandler.checkTypedPoints({ typedPoints })
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.log(err.stack)
  }
}

const confirmTypedPointsCommand = async (tg, { answer }) => {
  try {
    const res = await userHandler.confirmTypedPoints({ answer })
    console.log(res)
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.log(err.stack)
  }
}

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

const addPointsCommand = async (tg, cmd) => {
  try {
    const res = await userHandler.getGroupList({ group: cmd.substring(1) })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}

const textMessageResponse = async (command, fn, keyboard) => {
  try {
    const { status } = context.getContext()
    const ctx =
      status === 'user'
        ? contextTreeUser.getCurrentCtx(command)
        : contextTreeAdmin.getCurrentCtx(command)

    context.emit('changeContext', ctx)
    await fn(ctx.papyrus, keyboard(ctx.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}

const isNumberPoints = text => !!/^[0-9]?[0-9]-[0-9]?[0-9,\.]$/.test(text)
const isYesNo = text => !!(text === 'yes' || text === 'no')
