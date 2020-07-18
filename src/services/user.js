import { context, contextTreeAdmin, contextTreeUser } from '../tools/context'
import { commands } from '../tools/markup'
import { TEAMS, STATUS } from '../constants'
import { textToPdf } from '../tools/pdf'
// todo move contex to db
const getEmptyTeamScores = teams => teams.reduce((accum, team) => ({ ...accum, [team]: 0 }), {})

const getMyScore = async (body, model) => {
  const { nickname } = body
  const { keyboard } = context.getContext()

  if (!nickname) return { result: 'failed', papyrus: 'твой ник скрыт, измени настройки', keyboard }
  const user = await model.findOne({ nickname })
  const node = contextTreeUser.getCurrentCtx(commands.MY_SCORE)

  context.emit('changeContext', { ...node })

  return { result: 'ok', papyrus: node.papyrus(user.score), keyboard: node.keyboard }
}

const getAllCampScore = async (body, model) => {
  const { status } = context.getContext()
  const users = await model.find({ status: STATUS[0] })

  const emptyTeamScores = getEmptyTeamScores(TEAMS)
  const filledTeamScores = users.reduce(
    (accum, { score, team }) =>
      accum.hasOwnProperty(team) ? { ...accum, [team]: accum[team] + score } : emptyTeamScores,
    emptyTeamScores,
  )
  const textScores = Object.keys(filledTeamScores).reduce(
    (accum, team) => `${accum}${team} - ${filledTeamScores[team]}\n `,
    '',
  )
  const node =
    status === STATUS[0]
      ? contextTreeUser.getCurrentCtx(commands.ALL_CAMP_SCORE)
      : contextTreeAdmin.getCurrentCtx(commands.ALL_CAMP_SCORE)
  context.emit('changeContext', { ...node })

  return { result: 'ok', papyrus: node.papyrus(textScores), keyboard: node.keyboard }
}

const getAllScores = async (body, model) => {
  const users = await model.find({ status: STATUS[0] })

  const textScores = users.reduce((accum, { name, score }) => `${accum}${name} - ${score}\n `, '')
  const data = await textToPdf(textScores)
  const node = contextTreeAdmin.getCurrentCtx(commands.GET_ALL_SCORES)
  context.emit('changeContext', { ...node })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard, data }
}

export default model => ({
  getMyScore: body => getMyScore(body, model),
  getAllCampScore: () => getAllCampScore(null, model),
  getAllScores: () => getAllScores(null, model),
})
