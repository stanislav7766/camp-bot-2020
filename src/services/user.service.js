import { context, contextTreeAdmin, contextTreeUser } from '../tools/context'
import { papyrus } from '../tools/papyrus'
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

const getGroupList = async (body, model) => {
  const { group } = body
  const users = await model.find({ group, status: STATUS[0] })
  //todo res failed
  //todo sort by numberList
  const textList = users.reduce(
    (accum, { name, nickname }, ind) => `${accum}${ind + 1}.  ${name}   ${nickname}\n `,
    '',
  )
  const node = contextTreeAdmin.getCurrentCtx(commands.ADD_POINTS)
  context.emit('changeContext', { ...node })
  return { result: 'ok', papyrus: papyrus.typeNumberInList(textList), keyboard: [] }
}
const checkTypedPoints = async (body, model) => {
  const { typedPoints } = body

  // const [numberList,countPoints] =typedPoints.split('-')

  const node = contextTreeAdmin.getCurrentCtx(commands.ADD_POINTS_TYPED_NUMBER)
  context.emit('changeContext', { ...node, typedPoints })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}

const confirmTypedPoints = async (body, model) => {
  const { answer } = body
  const { typedPoints } = context.getContext()
  let additional = ``
  if (answer === 'yes') {
    const [numberList, countPoints] = typedPoints.split('-')
    const user = await model.findOne({ numberList })
    user.score += Number(countPoints)
    await model.findOneAndUpdate({ numberList }, { $set: user }, { new: true })
    additional = `You’ve gave the following points: ${countPoints}\n`
  }

  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node, typedPoints: '' })
  return { result: 'ok', papyrus: additional + node.papyrus, keyboard: node.keyboard }
}

const addMeetup = async (body, model) => {
  const { dayCmd } = body
  const { meetup } = context.getContext()
  meetup.day = dayCmd.substring(1)
  const node = contextTreeAdmin.getCurrentCtx(commands.ADD_MEETUP_TITLE)
  context.emit('changeContext', { ...node, meetup })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}

export default model => ({
  getMyScore: body => getMyScore(body, model),
  getAllCampScore: () => getAllCampScore(null, model),
  getAllScores: () => getAllScores(null, model),
  getGroupList: body => getGroupList(body, model),
  checkTypedPoints: body => checkTypedPoints(body, model),
  confirmTypedPoints: body => confirmTypedPoints(body, model),
  addMeetup: body => addMeetup(body, model),
})
