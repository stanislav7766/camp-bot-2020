import deps from '../dependencies'
import { context, contextTreeAdmin } from '../tools/context'
import { commands, subCommands } from '../tools/markup'
import { papyrus } from '../tools/papyrus'
import { TEAMS, GROUPS, DAYS, getTgUrl, DAYS_DATES_MAP } from '../constants'
import { isNotEmptyArr } from '../tools/validation'
import { isTime, isValidAudience, isURL, isDay } from '../tools/validation'

const { fetch, CronJob } = deps
// const isDay = day => DAYS.includes(day)
const mapNotifyToText = notifys =>
  notifys.reduce(
    (accum, { audience, time }, ind) => `${accum}${ind + 1}.  ${audience}   ${time}\n `,
    '',
  )

const addNotify = async (body, models) => {
  const { dayCmd } = body
  const { notify } = context.getContext()
  notify.day = dayCmd.substring(1)
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_NOTIFY_MSG)
  context.emit('changeContext', { ...node, notify })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}

const deleteNotify = async (body, models) => {
  const { dayCmd } = body
  const { notificationModel } = models
  const notifys = await notificationModel.find({ date: DAYS_DATES_MAP[dayCmd.substring(1)] })
  const textList = mapNotifyToText(notifys)
  const node = contextTreeAdmin.getCurrentCtx(subCommands.DELETE_NOTIFY_CHOOSE_ONE)
  context.emit('changeContext', { ...node })
  return { result: 'ok', papyrus: node.papyrus(textList), keyboard: node.keyboard }
}
const editNotify = async (body, models) => {
  const { dayCmd } = body
  const { notificationModel } = models
  const notifys = await notificationModel.find({ date: DAYS_DATES_MAP[dayCmd.substring(1)] })
  const textList = mapNotifyToText(notifys)
  const node = contextTreeAdmin.getCurrentCtx(subCommands.EDIT_NOTIFY_CHOOSE_ONE)
  context.emit('changeContext', { ...node })
  return { result: 'ok', papyrus: node.papyrus(textList), keyboard: node.keyboard }
}

const typedNotifyMsg = async (body, models) => {
  const { msg } = body
  const { notify } = context.getContext()
  notify.msg = msg
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_NOTIFY_TIME)
  context.emit('changeContext', { ...node, notify })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}

const typedNotifyTime = async (body, models) => {
  const { time } = body
  const { notify } = context.getContext()
  if (!isTime(time)) return incorrectTime()
  notify.time = time
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_NOTIFY_AUDIENCE)
  context.emit('changeContext', { ...node, notify })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}

const typedNotifyAudience = async (body, models) => {
  const { audience } = body
  const { notify } = context.getContext()
  if (!isValidAudience(audience)) return incorrectAudience()
  notify.audience = audience
  const text = Object.keys(notify).reduce((accum, key) => `${accum}${key} - ${notify[key]}\n `, '')
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_NOTIFY_CONFIRM)
  context.emit('changeContext', { ...node, notify })
  return { result: 'ok', papyrus: node.papyrus(text), keyboard: node.keyboard }
}

const typedDeleteNotify = async (body, models) => {
  const { time } = body
  const { notificationModel } = models
  const notify = await notificationModel.findOne({ time })
  if (!notify) {
    const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
    context.emit('changeContext', { ...node })
    return { result: 'failed', papyrus: papyrus.IncorrectNotifyTitle, keyboard: node.keyboard }
  }
  const node = contextTreeAdmin.getCurrentCtx(subCommands.DELETE_NOTIFY_CONFIRM)
  context.emit('changeContext', { ...node, notify })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const typedEditNotify = async (body, models) => {
  const { time } = body
  const { notificationModel } = models
  const notify = await notificationModel.findOne({ time })
  if (!notify) {
    const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
    context.emit('changeContext', { ...node })
    return { result: 'failed', papyrus: papyrus.IncorrectNotifyTitle, keyboard: node.keyboard }
  }
  const node = contextTreeAdmin.getCurrentCtx(subCommands.EDIT_NOTIFY_CHOOSE_PROP)
  context.emit('changeContext', { ...node, notify })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const confirmTypedNotify = async (body, models) => {
  const { answer } = body
  const { notificationModel } = models
  let additional = ``
  const { notify } = context.getContext()
  if (answer === 'yes') {
    const notification = {}
    notification.date = DAYS_DATES_MAP[notify.day]
    notification.msg = notify.msg
    notification.audience = notify.audience
    notification.time = notify.time
    await notificationModel.create(notification)
    //start cron job
    additional = `You’ve added the following notify.\n`
    await startCronJobs(body, models)
  }
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node, notify: {} })
  return { result: 'ok', papyrus: additional + node.papyrus, keyboard: node.keyboard }
}
const confirmTypedDeleteNotify = async (body, models) => {
  const { answer } = body
  const { cronJobs } = context.getContext()
  const { notificationModel } = models
  let additional = ``
  const { notify } = context.getContext()
  if (answer === 'yes') {
    const { _id } = await notificationModel.findOne({ time: notify.time })
    await notificationModel.findOneAndRemove({ time: notify.time })
    _id && cronJobs[_id] !== null && cronJobs[_id] !== undefined && cronJobs[_id].stop()

    additional = `You’ve deleted the following notify.\n`
    //remove cron job
  }
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node, notify: {} })
  return { result: 'ok', papyrus: additional + node.papyrus, keyboard: node.keyboard }
}
const confirmTypedEditNotify = async (body, models) => {
  const { answer } = body
  const { notificationModel } = models
  let additional = ``
  const { notify } = context.getContext()
  if (answer === 'yes') {
    const notification = {}
    notification.date = isDay(notify.day) ? DAYS_DATES_MAP[notify.day] : notify.date
    notification.msg = notify.msg
    notification.audience = notify.audience
    notification.time = notify.time
    const { _id } = await notificationModel.findOneAndUpdate(
      { _id: notify._id },
      { $set: notification },
      { new: true },
    )
    //edit cron job

    _id && cronJobs[_id] !== null && cronJobs[_id] !== undefined && cronJobs[_id].stop()
    additional = `You’ve edited the following notify.\n`
    await startCronJobs(body, models)
  }
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node, notify: {}, notifyProp: '' })
  return { result: 'ok', papyrus: additional + node.papyrus, keyboard: node.keyboard }
}

const editNotifyProp = async (body, models) => {
  const { prop } = body
  const node = contextTreeAdmin.getCurrentCtx(subCommands.EDIT_NOTIFY_TYPED_PROP)
  context.emit('changeContext', { ...node, notifyProp: prop })
  return { result: 'ok', papyrus: node.papyrus(prop), keyboard: node.keyboard }
}
const typedEditNotifyProp = async (body, models) => {
  const { prop } = body
  const { notifyProp, notify } = context.getContext()

  if (notifyProp === 'time' && !isTime(prop)) return incorrectTime()
  if (notifyProp === 'day' && !isDay(prop)) return incorrectDay()
  if (notifyProp === 'audience' && !isValidAudience(prop)) return incorrectAudience()

  const oldProp = notify[notifyProp]
  notify[notifyProp] = prop

  const node = contextTreeAdmin.getCurrentCtx(subCommands.EDIT_NOTIFY_CONFIRM)
  context.emit('changeContext', { ...node, notify })
  return {
    result: 'ok',
    papyrus: node.papyrus({ prop: notifyProp, from: oldProp, to: prop }),
    keyboard: node.keyboard,
  }
}

const startCronJobs = async (body, models) => {
  const { notificationModel, userModel } = models
  const notifications = await notificationModel.find({})
  isNotEmptyArr(notifications) &&
    (await Promise.all(
      notifications.map(async notification => {
        const { msg, time, date, audience, _id } = notification
        const notifyDate = new Date(date + time)

        const users = await userModel.find(
          audience === 'all' ? {} : { [typeAudience(audience)]: audience },
        )

        isNotEmptyArr(users) &&
          (await Promise.all(
            users.map(async ({ chatID }) => {
              chatID !== null &&
                chatID !== undefined &&
                createJob(notifyDate, _id, async () => {
                  await fetch(getTgUrl({ id: chatID, msg: encodeURIComponent(msg) }))
                  await notificationModel.findOneAndRemove({ _id })
                })
            }),
          ))
      }),
    ))

  return { result: 'ok' }
}

const typeAudience = audience => {
  if (TEAMS.includes(audience)) return 'team'
  if (GROUPS.includes(audience)) return 'group'
}
const incorrectTime = () => {
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node })
  return { result: 'failed', papyrus: papyrus.incorrectNotifyTime, keyboard: node.keyboard }
}
const incorrectAudience = () => {
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node })
  return { result: 'failed', papyrus: papyrus.incorrectNotifyAudience, keyboard: node.keyboard }
}

const incorrectDay = () => {
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node })
  return { result: 'failed', papyrus: papyrus.incorrectNotifyDay, keyboard: node.keyboard }
}

const createJob = (date, id, cb) => {
  const { cronJobs } = context.getContext()
  const job = new CronJob(date, cb)
  cronJobs[id] = job
  job.start()
}
export default models => ({
  startCronJobs: body => startCronJobs(null, models),
  addNotify: body => addNotify(body, models),
  deleteNotify: body => deleteNotify(body, models),
  editNotify: body => editNotify(body, models),
  typedNotifyMsg: body => typedNotifyMsg(body, models),
  typedNotifyTime: body => typedNotifyTime(body, models),
  typedNotifyAudience: body => typedNotifyAudience(body, models),
  confirmTypedNotify: body => confirmTypedNotify(body, models),
  confirmTypedDeleteNotify: body => confirmTypedDeleteNotify(body, models),
  confirmTypedEditNotify: body => confirmTypedEditNotify(body, models),
  typedDeleteNotify: body => typedDeleteNotify(body, models),
  typedEditNotify: body => typedEditNotify(body, models),
  editNotifyProp: body => editNotifyProp(body, models),
  typedEditNotifyProp: body => typedEditNotifyProp(body, models),
})
