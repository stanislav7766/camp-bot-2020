import commandHandlers from '../handlers'
import { commands, subCommands } from '../tools/markup'
import { contextTreeUser, contextTreeAdmin, context } from '../tools/context'
import logger from '../tools/logger'
import deps from '../dependencies'

const { markupKeyboard } = deps
const { authorizeHandler, userHandler, meetupHandler } = commandHandlers

export const commandSelector = (command, ctx) =>
  ({
    [commands.START]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.INFO]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.HELP]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
    [commands.SEND_MSG_FILE]: () => textMessageResponse(command, ctx.reply, markupKeyboard),
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
    [commands.GROUP1]: () => checkGroupTeamCommands(ctx, command),
    [commands.GROUP2]: () => checkGroupTeamCommands(ctx, command),
    [commands.GROUP3]: () => checkGroupTeamCommands(ctx, command),
    [commands.ORANGE]: () => checkGroupTeamCommands(ctx, command),
    [commands.PINK]: () => checkGroupTeamCommands(ctx, command),
    [commands.PURPLE]: () => checkGroupTeamCommands(ctx, command),
    [commands.NAVY]: () => checkGroupTeamCommands(ctx, command),
    [commands.WHITE]: () => checkGroupTeamCommands(ctx, command),
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
    [commands.EDIT_MEETUP_DAY]: () => editMeetupPropCommand(ctx, { prop: 'day' }),
    [commands.EDIT_MEETUP_TIME]: () => editMeetupPropCommand(ctx, { prop: 'time' }),
    [commands.EDIT_MEETUP_TITLE]: () => editMeetupPropCommand(ctx, { prop: 'title' }),
    [commands.EDIT_MEETUP_FACILITATOR]: () => editMeetupPropCommand(ctx, { prop: 'facilitator' }),
    [commands.EDIT_MEETUP_AUDIENCE]: () => editMeetupPropCommand(ctx, { prop: 'audience' }),
    [commands.EDIT_MEETUP_LINK]: () => editMeetupPropCommand(ctx, { prop: 'link' }),
  }[command]())

export const subcommandSelector = async (cmd, ctx, document = null) => {
  const { command } = context.getContext()
  return {
    [subCommands.ADD_POINTS_CHOOSE_ONE]: () => checkTypedPointsCommand(ctx, { typedPoints: cmd }),
    [subCommands.ADD_POINTS_TYPED_NUMBER]: () => confirmTypedPointsCommand(ctx, { answer: cmd }),
    [subCommands.ADD_MEETUP_TITLE]: () => typedMeetupTitleCommand(ctx, { title: cmd }),
    [subCommands.ADD_MEETUP_TIME]: () => typedMeetupTimeCommand(ctx, { time: cmd }),
    [subCommands.ADD_MEETUP_FACILITATOR]: () =>
      typedMeetupFacilitatorCommand(ctx, { facilitator: cmd }),
    [subCommands.ADD_MEETUP_AUDIENCE]: () => typedMeetupAudienceCommand(ctx, { audience: cmd }),
    [subCommands.ADD_MEETUP_LINK]: () => typedMeetupLinkCommand(ctx, { link: cmd }),
    [subCommands.ADD_MEETUP_CONFIRM]: () => confirmTypedMeetupCommand(ctx, { answer: cmd }),
    [subCommands.DELETE_MEETUP_CONFIRM]: () =>
      confirmTypedDeleteMeetupCommand(ctx, { answer: cmd }),
    [subCommands.DELETE_MEETUP_CHOOSE_ONE]: () => typedDeleteMeetupCommand(ctx, { title: cmd }),
    [subCommands.EDIT_MEETUP_CHOOSE_ONE]: () => typedEditMeetupCommand(ctx, { title: cmd }),
    [subCommands.EDIT_MEETUP_TYPED_PROP]: () => typedEditMeetupPropCommand(ctx, { prop: cmd }),
    [subCommands.EDIT_MEETUP_CONFIRM]: () => confirmTypedEditMeetupCommand(ctx, { answer: cmd }),
    [subCommands.SEND_MSG_FILE_TYPE_MSG]: () => typedMsgCommand(ctx, { msg: cmd }),
    [subCommands.SEND_MSG_FILE_ASK_FILE]: () => typedAskFileCommand(ctx, { answer: cmd }),
    [subCommands.SEND_MSG_FILE_LOAD_FILE]: () => loadedFileCommand(ctx, { file: document }),
    [subCommands.SEND_MSG_FILE_CONFIRM_SENDING]: () =>
      confirmMsgFileSendCommand(ctx, { answer: cmd }),
  }[command]()
}

const checkGroupTeamCommands = async (tg, cmd) => {
  const { command } = context.getContext()
  if (command === commands.ADD_POINTS) {
    await addPointsCommand(tg, cmd)
    return
  }
  if (command === commands.SEND_MSG_FILE) {
    await sendMsgFileCommand(tg, { receiver: cmd.substring(1) })
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
  if (command === commands.DELETE_MEETUP) {
    await deleteMeetupCommand(tg, { dayCmd: cmd })
    return
  }
  if (command === commands.EDIT_MEETUP) {
    await editMeetupCommand(tg, { dayCmd: cmd })
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
const typedMsgCommand = async (tg, { msg }) => {
  try {
    const res = await userHandler.typedMsg({ msg })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}

const confirmMsgFileSendCommand = async (tg, { answer }) => {
  try {
    const res = await userHandler.confirmMsgFileSend({ answer })
    if (res.result !== 'ok') {
      //344567232
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    res.file && (await tg.telegram.sendDocument('344567232', res.file.file_id, res.file.file_name))
    await tg.telegram.sendMessage('344567232', res.msg)
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
const typedAskFileCommand = async (tg, { answer }) => {
  try {
    const res = await userHandler.typedAskFile({ answer })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}

const loadedFileCommand = async (tg, { file }) => {
  try {
    const res = await userHandler.loadedFile({ file })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
const sendMsgFileCommand = async (tg, { receiver }) => {
  try {
    const res = await userHandler.sendMsgFile({ receiver })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
const editMeetupPropCommand = async (tg, { prop }) => {
  try {
    const res = await meetupHandler.editMeetupProp({ prop })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
const typedEditMeetupPropCommand = async (tg, { prop }) => {
  try {
    const res = await meetupHandler.typedEditMeetupProp({ prop })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
const deleteMeetupCommand = async (tg, { dayCmd }) => {
  try {
    const res = await meetupHandler.deleteMeetup({ dayCmd })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
const editMeetupCommand = async (tg, { dayCmd }) => {
  try {
    const res = await meetupHandler.editMeetup({ dayCmd })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
const typedDeleteMeetupCommand = async (tg, { title }) => {
  try {
    const res = await meetupHandler.typedDeleteMeetup({ title })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
const typedEditMeetupCommand = async (tg, { title }) => {
  try {
    const res = await meetupHandler.typedEditMeetup({ title })
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
const confirmTypedDeleteMeetupCommand = async (tg, { answer }) => {
  try {
    const res = await meetupHandler.confirmTypedDeleteMeetup({ answer })
    if (res.result !== 'ok') {
      tg.reply(res.papyrus, markupKeyboard(res.keyboard))
      return
    }
    await tg.reply(res.papyrus, markupKeyboard(res.keyboard))
  } catch (err) {
    logger.error(err.stack)
  }
}
const confirmTypedEditMeetupCommand = async (tg, { answer }) => {
  try {
    const res = await meetupHandler.confirmTypedEditMeetup({ answer })
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
