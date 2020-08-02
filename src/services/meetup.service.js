import { context, contextTreeAdmin } from '../tools/context'
import { commands, subCommands } from '../tools/markup'
import { papyrus } from '../tools/papyrus'
import { isTime, isValidAudience, isURL, isDay } from '../tools/validation'
import { DAYS_DATES_MAP } from '../constants'

const mapMeetupsToText = meetups =>
  meetups.reduce((accum, { title, time }, ind) => `${accum}${ind + 1}.  ${title}   ${time}\n `, '')

const addMeetup = async (body, models) => {
  const { dayCmd } = body
  const { meetup } = context.getContext()
  meetup.day = dayCmd.substring(1)
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_MEETUP_TITLE)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}

const deleteMeetup = async (body, models) => {
  const { dayCmd } = body
  const { meetupModel } = models
  const meetups = await meetupModel.find({ day: dayCmd.substring(1) })
  const textList = mapMeetupsToText(meetups)
  const node = contextTreeAdmin.getCurrentCtx(subCommands.DELETE_MEETUP_CHOOSE_ONE)
  context.emit('changeContext', { ...node })
  return { result: 'ok', papyrus: node.papyrus(textList), keyboard: node.keyboard }
}
const editMeetup = async (body, models) => {
  const { dayCmd } = body
  const { meetupModel } = models
  const meetups = await meetupModel.find({ day: dayCmd.substring(1) })
  const textList = mapMeetupsToText(meetups)
  const node = contextTreeAdmin.getCurrentCtx(subCommands.EDIT_MEETUP_CHOOSE_ONE)
  context.emit('changeContext', { ...node })
  return { result: 'ok', papyrus: node.papyrus(textList), keyboard: node.keyboard }
}

const typedMeetupTitle = async (body, models) => {
  const { title } = body
  const { meetup } = context.getContext()
  meetup.title = title
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_MEETUP_TIME)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}

const typedMeetupTime = async (body, models) => {
  const { time } = body
  const { meetup } = context.getContext()
  if (!isTime(time)) return incorrectTime()
  meetup.time = time
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_MEETUP_FACILITATOR)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const typedMeetupFacilitator = async (body, models) => {
  const { facilitator } = body
  const { meetup } = context.getContext()

  meetup.facilitator = facilitator.replace(/\s/g, '').split(',')
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_MEETUP_AUDIENCE)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const typedMeetupAudience = async (body, models) => {
  const { audience } = body
  const { meetup } = context.getContext()
  if (!isValidAudience(audience)) return incorrectAudience()

  meetup.audience = audience
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_MEETUP_LINK)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const typedMeetupLink = async (body, models) => {
  const { link } = body
  const { meetup } = context.getContext()
  if (!isURL(link)) return incorrectLink()
  meetup.link = link
  const text = Object.keys(meetup).reduce((accum, key) => `${accum}${key} - ${meetup[key]}\n `, '')
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_MEETUP_CONFIRM)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus(text), keyboard: node.keyboard }
}
const typedDeleteMeetup = async (body, models) => {
  const { title } = body
  const { meetupModel } = models
  const meetup = await meetupModel.findOne({ title })
  if (!meetup) {
    const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
    context.emit('changeContext', { ...node })
    return { result: 'failed', papyrus: papyrus.IncorrectMeetupTitle, keyboard: node.keyboard }
  }
  const node = contextTreeAdmin.getCurrentCtx(subCommands.DELETE_MEETUP_CONFIRM)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const typedEditMeetup = async (body, models) => {
  const { title } = body
  const { meetupModel } = models
  const meetup = await meetupModel.findOne({ title })
  if (!meetup) {
    const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
    context.emit('changeContext', { ...node })
    return { result: 'failed', papyrus: papyrus.IncorrectMeetupTitle, keyboard: node.keyboard }
  }
  const node = contextTreeAdmin.getCurrentCtx(subCommands.EDIT_MEETUP_CHOOSE_PROP)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const confirmTypedMeetup = async (body, models) => {
  const { answer } = body
  const { meetupModel, notificationModel } = models

  let additional = ``
  const { meetup } = context.getContext()
  if (answer === 'yes') {
    const notification = {}
    notification.title = meetup.title

    notification.date = DAYS_DATES_MAP[meetup.day]
    notification.msg = 'Hey meeting in 5 min'
    notification.time = trimTime(meetup.time)
    await meetupModel.create(meetup)
    await notificationModel.create(notification)

    additional = `You’ve added the following meetup.\n`
  }
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node, meetup: {} })
  return { result: 'ok', papyrus: additional + node.papyrus, keyboard: node.keyboard }
}
const confirmTypedDeleteMeetup = async (body, models) => {
  const { answer } = body
  const { meetupModel, notificationModel } = models
  let additional = ``
  const { meetup } = context.getContext()
  if (answer === 'yes') {
    await notificationModel.findOneAndRemove({ title: meetup.title })
    await meetupModel.findOneAndRemove({ title: meetup.title })
    additional = `You’ve deleted the following meetup.\n`
  }
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node, meetup: {} })
  return { result: 'ok', papyrus: additional + node.papyrus, keyboard: node.keyboard }
}
const confirmTypedEditMeetup = async (body, models) => {
  const { answer } = body
  const { meetupModel, notificationModel } = models
  let additional = ``
  const { meetup } = context.getContext()
  if (answer === 'yes') {
    const notification = {}
    notification.title = meetup.title
    notification.date = DAYS_DATES_MAP[meetup.day]
    notification.msg = 'Hey meeting in 5 min'
    notification.time = trimTime(meetup.time)
    await meetupModel.findOneAndUpdate({ title: meetup.title }, { $set: meetup }, { new: true })
    await notificationModel.findOneAndUpdate(
      { title: meetup.title },
      { $set: notification },
      { new: true },
    )

    additional = `You’ve edited the following meetup.\n`
  }
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node, meetup: {}, meetupProp: '' })
  return { result: 'ok', papyrus: additional + node.papyrus, keyboard: node.keyboard }
}

const editMeetupProp = async (body, models) => {
  const { prop } = body
  const node = contextTreeAdmin.getCurrentCtx(subCommands.EDIT_MEETUP_TYPED_PROP)
  context.emit('changeContext', { ...node, meetupProp: prop })
  return { result: 'ok', papyrus: node.papyrus(prop), keyboard: node.keyboard }
}
const typedEditMeetupProp = async (body, models) => {
  const { prop } = body
  const { meetupProp, meetup } = context.getContext()

  if (meetupProp === 'time' && !isTime(prop)) return incorrectTime()
  if (meetupProp === 'day' && !isDay(prop)) return incorrectDay()
  if (meetupProp === 'link' && !isURL(prop)) return incorrectLink()
  if (meetupProp === 'audience' && !isValidAudience(prop)) return incorrectAudience()

  const oldProp = meetup[meetupProp]
  meetup[meetupProp] = prop
  const node = contextTreeAdmin.getCurrentCtx(subCommands.EDIT_MEETUP_CONFIRM)
  context.emit('changeContext', { ...node, meetup })
  return {
    result: 'ok',
    papyrus: node.papyrus({ prop: meetupProp, from: oldProp, to: prop }),
    keyboard: node.keyboard,
  }
}
const incorrectTime = () => {
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node })
  return { result: 'failed', papyrus: papyrus.incorrectMeetupTime, keyboard: node.keyboard }
}
const incorrectAudience = () => {
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node })
  return { result: 'failed', papyrus: papyrus.incorrectMeetupAudience, keyboard: node.keyboard }
}
const incorrectLink = () => {
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node })
  return { result: 'failed', papyrus: papyrus.incorrectMeetupLink, keyboard: node.keyboard }
}
const incorrectDay = () => {
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node })
  return { result: 'failed', papyrus: papyrus.incorrectMeetupDay, keyboard: node.keyboard }
}
const trimTime = text => {
  const [startTime, endTime] = text.split('-')
  return startTime
}

export default models => ({
  addMeetup: body => addMeetup(body, models),
  deleteMeetup: body => deleteMeetup(body, models),
  editMeetup: body => editMeetup(body, models),
  typedMeetupTitle: body => typedMeetupTitle(body, models),
  typedMeetupTime: body => typedMeetupTime(body, models),
  typedMeetupFacilitator: body => typedMeetupFacilitator(body, models),
  typedMeetupAudience: body => typedMeetupAudience(body, models),
  typedMeetupLink: body => typedMeetupLink(body, models),
  confirmTypedMeetup: body => confirmTypedMeetup(body, models),
  confirmTypedDeleteMeetup: body => confirmTypedDeleteMeetup(body, models),
  confirmTypedEditMeetup: body => confirmTypedEditMeetup(body, models),
  typedDeleteMeetup: body => typedDeleteMeetup(body, models),
  typedEditMeetup: body => typedEditMeetup(body, models),
  editMeetupProp: body => editMeetupProp(body, models),
  typedEditMeetupProp: body => typedEditMeetupProp(body, models),
})
