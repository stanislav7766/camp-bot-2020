import { context, contextTreeAdmin } from '../tools/context'
import { commands } from '../tools/markup'

const addMeetup = async (body, model) => {
  const { dayCmd } = body
  const { meetup } = context.getContext()
  meetup.day = dayCmd.substring(1)
  const node = contextTreeAdmin.getCurrentCtx(commands.ADD_MEETUP_TITLE)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const typedMeetupTitle = async (body, model) => {
  const { title } = body
  const { meetup } = context.getContext()
  meetup.title = title
  const node = contextTreeAdmin.getCurrentCtx(commands.ADD_MEETUP_TIME)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}

const typedMeetupTime = async (body, model) => {
  const { time } = body
  const { meetup } = context.getContext()
  //valid
  meetup.time = time
  const node = contextTreeAdmin.getCurrentCtx(commands.ADD_MEETUP_FACILITATOR)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const typedMeetupFacilitator = async (body, model) => {
  const { facilitator } = body
  const { meetup } = context.getContext()
  //valid
  meetup.facilitator = facilitator.replace(/\s/g, '').split(',')
  const node = contextTreeAdmin.getCurrentCtx(commands.ADD_MEETUP_AUDIENCE)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const typedMeetupAudience = async (body, model) => {
  const { audience } = body
  const { meetup } = context.getContext()
  //valid
  meetup.audience = audience
  const node = contextTreeAdmin.getCurrentCtx(commands.ADD_MEETUP_LINK)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const typedMeetupLink = async (body, model) => {
  const { link } = body
  const { meetup } = context.getContext()
  //valid
  meetup.link = link
  const text = Object.keys(meetup).reduce((accum, key) => `${accum}${key} - ${meetup[key]}\n `, '')
  const node = contextTreeAdmin.getCurrentCtx(commands.ADD_MEETUP_CONFIRM)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus(text), keyboard: node.keyboard }
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

export default model => ({
  addMeetup: body => addMeetup(body, model),
  typedMeetupTitle: body => typedMeetupTitle(body, model),
  typedMeetupTime: body => typedMeetupTime(body, model),
  typedMeetupFacilitator: body => typedMeetupFacilitator(body, model),
  typedMeetupAudience: body => typedMeetupAudience(body, model),
  typedMeetupLink: body => typedMeetupLink(body, model),
  confirmTypedMeetup: body => confirmTypedMeetup(body, model),
})
