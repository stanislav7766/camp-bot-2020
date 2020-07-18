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
export default service => ({
  getMyScore: body => getMyScore(body, service),
  getAllCampScore: () => getAllCampScore(null, service),
  getAllScores: () => getAllScores(null, service),
})
