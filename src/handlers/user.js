const getMyScore = async (body, service) => {
  const { nickname } = body
  const { result, papyrus, keyboard } = await service.getMyScore({ nickname })
  return { result, papyrus, keyboard }
}

export default service => ({
  getMyScore: body => getMyScore(body, service),
})
