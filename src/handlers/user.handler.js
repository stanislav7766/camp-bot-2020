const getMyScore = async (body, service) => {
  const { nickname } = body
  const { result, papyrus, keyboard } = await service.getMyScore({ nickname })
  return { result, papyrus, keyboard }
}

const getAllCampScore = async (body, service) => {
  const { nickname } = body
  const { result, papyrus, keyboard } = await service.getAllCampScore({ nickname })
  return { result, papyrus, keyboard }
}
const getAllScores = async (body, service) => {
  const { nickname } = body
  const { result, papyrus, keyboard, data } = await service.getAllScores({ nickname })
  return { result, papyrus, keyboard, data }
}
const getGroupList = async (body, service) => {
  const { group, nickname } = body
  const { result, papyrus, keyboard } = await service.getGroupList({ group, nickname })
  return { result, papyrus, keyboard }
}
const checkTypedPoints = async (body, service) => {
  const { typedPoints } = body
  const { result, papyrus, keyboard } = await service.checkTypedPoints({ typedPoints })
  return { result, papyrus, keyboard }
}
const confirmTypedPoints = async (body, service) => {
  const { answer, nickname } = body
  const { result, papyrus, keyboard, additional, chatID } = await service.confirmTypedPoints({
    answer,
    nickname,
  })
  return { result, papyrus, keyboard, additional, chatID }
}
const sendMsgFile = async (body, service) => {
  const { receiver } = body
  const { result, papyrus, keyboard } = await service.sendMsgFile({ receiver })
  return { result, papyrus, keyboard }
}
const typedMsg = async (body, service) => {
  const { msg } = body
  const { result, papyrus, keyboard } = await service.typedMsg({ msg })
  return { result, papyrus, keyboard }
}
const confirmMsgFileSend = async (body, service) => {
  const { answer } = body
  const { result, papyrus, keyboard, msg, file, chatsID } = await service.confirmMsgFileSend({
    answer,
  })
  return { result, papyrus, keyboard, msg, file, chatsID }
}
const typedAskFile = async (body, service) => {
  const { answer } = body
  const { result, papyrus, keyboard } = await service.typedAskFile({ answer })
  return { result, papyrus, keyboard }
}
const loadedFile = async (body, service) => {
  const { file } = body
  const { result, papyrus, keyboard } = await service.loadedFile({ file })
  return { result, papyrus, keyboard }
}
const getAllCampSchedule = async (body, service) => {
  const { nickname } = body
  const { result, papyrus, keyboard } = await service.getAllCampSchedule({ nickname })
  return { result, papyrus, keyboard }
}
const getInfo = async (body, service) => {
  const { nickname } = body
  const { result, papyrus, keyboard } = await service.getInfo({ nickname })
  return { result, papyrus, keyboard }
}

export default service => ({
  getMyScore: body => getMyScore(body, service),
  getAllCampSchedule: body => getAllCampSchedule(body, service),
  getAllCampScore: body => getAllCampScore(body, service),
  getAllScores: body => getAllScores(body, service),
  getGroupList: body => getGroupList(body, service),
  checkTypedPoints: body => checkTypedPoints(body, service),
  confirmTypedPoints: body => confirmTypedPoints(body, service),
  sendMsgFile: body => sendMsgFile(body, service),
  loadedFile: body => loadedFile(body, service),
  typedAskFile: body => typedAskFile(body, service),
  confirmMsgFileSend: body => confirmMsgFileSend(body, service),
  typedMsg: body => typedMsg(body, service),
  getInfo: body => getInfo(body, service),
})
