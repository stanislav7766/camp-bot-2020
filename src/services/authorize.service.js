import { context, contextTreeAdmin, contextTreeUser } from '../tools/context'
import { commands, markupUser } from '../tools/markup'
import { STATUS } from '../constants'
import { papyrus } from '../tools/papyrus'

const { getNotAuthorizedMsg, privacySettings } = papyrus

export const authorizeUser = async (body, model) => {
  const { nickname, chatID } = body
  // const { keyboard } = context.getContext()

  if (!nickname || !chatID)
    return { result: 'failed', papyrus: privacySettings, keyboard: markupUser.initialKeyboard() }
  const user = await model.findOneAndUpdate({ nickname }, { $set: { chatID } }, { new: true })
  if (!STATUS.includes(user.status))
    return { result: 'failed', papyrus: privacySettings, keyboard: markupUser.initialKeyboard() }
  // await model.findOne({ nickname })
  if (!user)
    return {
      result: 'failed',
      papyrus: getNotAuthorizedMsg,
      keyboard: markupUser.initialKeyboard(),
    }

  const node =
    user.status === STATUS[0]
      ? contextTreeUser.getCurrentCtx(commands.AUTHORIZE)
      : contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)

  context.emit('changeContext', { ...node, status: user.status })

  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
export const authorizeUser1 = async (body, model) => {
  const { nickname, chatID } = body

  if (!nickname || !chatID)
    return { result: 'failed', papyrus: privacySettings, keyboard: markupUser.initialKeyboard() }
  const user = await model.findOneAndUpdate({ nickname }, { $set: { chatID } }, { new: true })
  console.log({ status: user.status, nickname })
  if (!STATUS.includes(user.status))
    return { result: 'failed', papyrus: privacySettings, keyboard: markupUser.initialKeyboard() }
  // await model.findOne({ nickname })
  if (!user)
    return {
      result: 'failed',
      papyrus: getNotAuthorizedMsg,
      keyboard: markupUser.initialKeyboard(),
    }

  const node =
    user.status === STATUS[0]
      ? contextTreeUser.getCurrentCtx(commands.AUTHORIZE)
      : contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)

  // context.emit('changeContext', { ...node, status: user.status })

  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}

export default model => ({
  authorizeUser: body => authorizeUser(body, model),
  authorizeUser1: body => authorizeUser1(body, model),
})
