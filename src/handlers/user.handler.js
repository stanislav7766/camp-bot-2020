const getMyScore = async (body, service) => {
  const { nickname } = body
  const { result, papyrus, keyboard } = await service.getMyScore({ nickname })
  return { result, papyrus, keyboard }
}

const getAllCampScore = async (body, service) => {
  const { result, papyrus, keyboard } = await service.getAllCampScore()
  return { result, papyrus, keyboard }
}
const getAllScores = async (body, service) => {
  const { result, papyrus, keyboard, data } = await service.getAllScores()
  return { result, papyrus, keyboard, data }
}
const getGroupList = async (body, service) => {
  const { group } = body
  const { result, papyrus, keyboard } = await service.getGroupList({ group })
  return { result, papyrus, keyboard }
}
const checkTypedPoints = async (body, service) => {
  const { typedPoints } = body
  const { result, papyrus, keyboard } = await service.checkTypedPoints({ typedPoints })
  return { result, papyrus, keyboard }
}
const confirmTypedPoints = async (body, service) => {
  const { answer } = body
  const { result, papyrus, keyboard } = await service.confirmTypedPoints({ answer })
  return { result, papyrus, keyboard }
}

export default service => ({
  getMyScore: body => getMyScore(body, service),
  getAllCampScore: () => getAllCampScore(null, service),
  getAllScores: () => getAllScores(null, service),
  getGroupList: body => getGroupList(body, service),
  checkTypedPoints: body => checkTypedPoints(body, service),
  confirmTypedPoints: body => confirmTypedPoints(body, service),
})
