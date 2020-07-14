import { context, contextTreeAdmin, contextTreeUser } from '../tools/context'
import { commands } from '../tools/markup'

export const authorizeUser = async (body, model) => {
  const { nickname } = body
  const { keyboard } = context.getContext()

  if (!nickname) return { result: 'failed', papyrus: 'твой ник скрыт, измени настройки', keyboard }
  const user = await model.findOne({ nickname })
  if (!user) return { result: 'failed', papyrus: 'все таки ты не достоин', keyboard }
  const node =
    user.status === 'user'
      ? contextTreeUser.getCurrentCtx(commands.AUTHORIZE)
      : contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)

  context.emit('changeContext', { ...node, status: user.status })

  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}

export default model => ({
  authorizeUser: body => authorizeUser(body, model),
})
