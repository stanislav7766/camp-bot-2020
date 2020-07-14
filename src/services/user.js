import { context, contextTreeAdmin, contextTreeUser } from '../tools/context'
import { commands } from '../tools/markup'

export const getMyScore = async (body, model) => {
  const { nickname } = body
  const { keyboard } = context.getContext()

  if (!nickname) return { result: 'failed', papyrus: 'твой ник скрыт, измени настройки', keyboard }
  const user = await model.findOne({ nickname })
  const node = contextTreeUser.getCurrentCtx(commands.MY_SCORE)

  context.emit('changeContext', { ...node })

  return { result: 'ok', papyrus: node.papyrus(user.score), keyboard: node.keyboard }
}

export default model => ({
  getMyScore: body => getMyScore(body, model),
})
