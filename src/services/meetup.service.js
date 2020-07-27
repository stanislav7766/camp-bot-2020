import { context, contextTreeAdmin } from '../tools/context'
import { commands, subCommands } from '../tools/markup'
import { papyrus } from '../tools/papyrus'
import { isTime, isValidAudience, isURL, isDay } from '../tools/validation'
const mapMeetupsToText = meetups =>
  meetups.reduce((accum, { title, time }, ind) => `${accum}${ind + 1}.  ${title}   ${time}\n `, '')

const addMeetup = async (body, model) => {
  const { dayCmd } = body
  const { meetup } = context.getContext()
  meetup.day = dayCmd.substring(1)
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_MEETUP_TITLE)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}

const deleteMeetup = async (body, model) => {
  const { dayCmd } = body
  const meetups = await model.find({ day: dayCmd.substring(1) })
  const textList = mapMeetupsToText(meetups)
  const node = contextTreeAdmin.getCurrentCtx(subCommands.DELETE_MEETUP_CHOOSE_ONE)
  context.emit('changeContext', { ...node })
  return { result: 'ok', papyrus: node.papyrus(textList), keyboard: node.keyboard }
}
const editMeetup = async (body, model) => {
  const { dayCmd } = body
  const meetups = await model.find({ day: dayCmd.substring(1) })
  const textList = mapMeetupsToText(meetups)
  const node = contextTreeAdmin.getCurrentCtx(subCommands.EDIT_MEETUP_CHOOSE_ONE)
  context.emit('changeContext', { ...node })
  return { result: 'ok', papyrus: node.papyrus(textList), keyboard: node.keyboard }
}

const typedMeetupTitle = async (body, model) => {
  const { title } = body
  const { meetup } = context.getContext()
  meetup.title = title
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_MEETUP_TIME)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}

const typedMeetupTime = async (body, model) => {
  const { time } = body
  const { meetup } = context.getContext()
  if (!isTime(time)) return incorrectTime()
  meetup.time = time
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_MEETUP_FACILITATOR)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const typedMeetupFacilitator = async (body, model) => {
  const { facilitator } = body
  const { meetup } = context.getContext()

  meetup.facilitator = facilitator.replace(/\s/g, '').split(',')
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_MEETUP_AUDIENCE)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const typedMeetupAudience = async (body, model) => {
  const { audience } = body
  const { meetup } = context.getContext()
  if (!isValidAudience(audience)) return incorrectAudience()

  meetup.audience = audience
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_MEETUP_LINK)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const typedMeetupLink = async (body, model) => {
  const { link } = body
  const { meetup } = context.getContext()
  if (!isURL(link)) return incorrectLink()
  meetup.link = link
  const text = Object.keys(meetup).reduce((accum, key) => `${accum}${key} - ${meetup[key]}\n `, '')
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_MEETUP_CONFIRM)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus(text), keyboard: node.keyboard }
}
const typedDeleteMeetup = async (body, model) => {
  const { title } = body
  const meetup = await model.findOne({ title })
  if (!meetup) {
    const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
    context.emit('changeContext', { ...node })
    return { result: 'failed', papyrus: papyrus.IncorrectMeetupTitle, keyboard: node.keyboard }
  }
  const node = contextTreeAdmin.getCurrentCtx(subCommands.DELETE_MEETUP_CONFIRM)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const typedEditMeetup = async (body, model) => {
  const { title } = body
  const meetup = await model.findOne({ title })
  if (!meetup) {
    const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
    context.emit('changeContext', { ...node })
    return { result: 'failed', papyrus: papyrus.IncorrectMeetupTitle, keyboard: node.keyboard }
  }
  const node = contextTreeAdmin.getCurrentCtx(subCommands.EDIT_MEETUP_CHOOSE_PROP)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const confirmTypedMeetup = async (body, model) => {
  const { answer } = body
  let additional = ``
  const { meetup } = context.getContext()
  if (answer === 'yes') {
    //run cron job
    await model.create(meetup)
    additional = `You’ve added the following meetup.\n`
  }
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node, meetup: {} })
  return { result: 'ok', papyrus: additional + node.papyrus, keyboard: node.keyboard }
}
const confirmTypedDeleteMeetup = async (body, model) => {
  const { answer } = body
  let additional = ``
  const { meetup } = context.getContext()
  if (answer === 'yes') {
    //delete cron job
    await model.findOneAndRemove({ title: meetup.title })
    additional = `You’ve deleted the following meetup.\n`
  }
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node, meetup: {} })
  return { result: 'ok', papyrus: additional + node.papyrus, keyboard: node.keyboard }
}
const confirmTypedEditMeetup = async (body, model) => {
  const { answer } = body
  let additional = ``
  const { meetup } = context.getContext()
  if (answer === 'yes') {
    //change cron job
    await model.findOneAndUpdate({ title: meetup.title }, { $set: meetup }, { new: true })
    additional = `You’ve edited the following meetup.\n`
  }
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node, meetup: {}, meetupProp: '' })
  return { result: 'ok', papyrus: additional + node.papyrus, keyboard: node.keyboard }
}

const editMeetupProp = async (body, model) => {
  const { prop } = body
  const node = contextTreeAdmin.getCurrentCtx(subCommands.EDIT_MEETUP_TYPED_PROP)
  context.emit('changeContext', { ...node, meetupProp: prop })
  return { result: 'ok', papyrus: node.papyrus(prop), keyboard: node.keyboard }
}
const typedEditMeetupProp = async (body, model) => {
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

export default model => ({
  addMeetup: body => addMeetup(body, model),
  deleteMeetup: body => deleteMeetup(body, model),
  editMeetup: body => editMeetup(body, model),
  typedMeetupTitle: body => typedMeetupTitle(body, model),
  typedMeetupTime: body => typedMeetupTime(body, model),
  typedMeetupFacilitator: body => typedMeetupFacilitator(body, model),
  typedMeetupAudience: body => typedMeetupAudience(body, model),
  typedMeetupLink: body => typedMeetupLink(body, model),
  confirmTypedMeetup: body => confirmTypedMeetup(body, model),
  confirmTypedDeleteMeetup: body => confirmTypedDeleteMeetup(body, model),
  confirmTypedEditMeetup: body => confirmTypedEditMeetup(body, model),
  typedDeleteMeetup: body => typedDeleteMeetup(body, model),
  typedEditMeetup: body => typedEditMeetup(body, model),
  editMeetupProp: body => editMeetupProp(body, model),
  typedEditMeetupProp: body => typedEditMeetupProp(body, model),
})
