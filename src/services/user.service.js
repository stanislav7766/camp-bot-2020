import { context, contextTreeAdmin, contextTreeUser } from '../tools/context'
import { commands, subCommands } from '../tools/markup'
import { TEAMS, STATUS } from '../constants'
import { textToPdf } from '../tools/pdf'
import { isNumberPoints, isYesNo } from '../tools/validation'
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
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_POINTS_CHOOSE_ONE)
  context.emit('changeContext', { ...node })
  return { result: 'ok', papyrus: node.papyrus(textList), keyboard: node.keyboard }
}
const checkTypedPoints = async (body, model) => {
  const { typedPoints } = body
  if (!isNumberPoints(typedPoints)) {
    const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
    context.emit('changeContext', { ...node })
    return { result: 'failed', papyrus: papyrus.incorrectTypedPoints, keyboard: node.keyboard }
  }
  const node = contextTreeAdmin.getCurrentCtx(subCommands.ADD_POINTS_TYPED_NUMBER)
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
const sendMsgFile = async (body, model) => {
  const { receiver } = body
  const { msgFile } = context.getContext()
  msgFile.receiverMsg = receiver
  const node = contextTreeAdmin.getCurrentCtx(subCommands.SEND_MSG_FILE_TYPE_MSG)
  context.emit('changeContext', { ...node, msgFile })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const typedMsg = async (body, model) => {
  const { msg } = body
  const { msgFile } = context.getContext()
  msgFile.msg = msg
  const node = contextTreeAdmin.getCurrentCtx(subCommands.SEND_MSG_FILE_ASK_FILE)
  context.emit('changeContext', { ...node, msgFile })
  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}
const loadedFile = async (body, model) => {
  const { file } = body
  const { msgFile } = context.getContext()
  msgFile.file = file
  const node = contextTreeAdmin.getCurrentCtx(subCommands.SEND_MSG_FILE_CONFIRM_SENDING)
  context.emit('changeContext', { ...node, msgFile })
  return {
    result: 'ok',
    papyrus: node.papyrus({
      msg: msgFile.msg,
      filename: msgFile.file && msgFile.file.file_name,
      receiver: msgFile.receiverMsg,
    }),
    keyboard: node.keyboard,
  }
}

const typedAskFile = async (body, model) => {
  const { answer } = body
  const { msgFile } = context.getContext()
  if (!isYesNo(answer)) return incorrectYesNo()
  const node = contextTreeAdmin.getCurrentCtx(
    answer === 'yes'
      ? subCommands.SEND_MSG_FILE_LOAD_FILE
      : subCommands.SEND_MSG_FILE_CONFIRM_SENDING,
  )

  context.emit('changeContext', { ...node })
  return {
    result: 'ok',
    papyrus:
      answer === 'yes'
        ? node.papyrus
        : node.papyrus({ msg: msgFile.msg, receiver: msgFile.receiverMsg }),
    keyboard: node.keyboard,
  }
}
const confirmMsgFileSend = async (body, model) => {
  const { answer } = body
  const { msgFile } = context.getContext()
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node })
  if (answer === 'yes') {
    return {
      result: 'ok',
      papyrus: node.papyrus,
      keyboard: node.keyboard,
      msg: msgFile.msg,
      file: msgFile.file,
    }
  }

  return { result: 'ok', papyrus: node.papyrus, keyboard: node.keyboard }
}

const incorrectYesNo = () => {
  const node = contextTreeAdmin.getCurrentCtx(commands.AUTHORIZE)
  context.emit('changeContext', { ...node })
  return { result: 'failed', papyrus: papyrus.incorrectYesNo, keyboard: node.keyboard }
}

export default model => ({
  getMyScore: body => getMyScore(body, model),
  getAllCampScore: () => getAllCampScore(null, model),
  getAllScores: () => getAllScores(null, model),
  getGroupList: body => getGroupList(body, model),
  checkTypedPoints: body => checkTypedPoints(body, model),
  confirmTypedPoints: body => confirmTypedPoints(body, model),
  sendMsgFile: body => sendMsgFile(body, model),
  typedAskFile: body => typedAskFile(body, model),
  loadedFile: body => loadedFile(body, model),
  typedMsg: body => typedMsg(body, model),
  confirmMsgFileSend: body => confirmMsgFileSend(body, model),
})
