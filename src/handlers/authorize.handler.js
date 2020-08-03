const authorizeUser = async (body, service) => {
  const { nickname, chatID } = body
  const { result, papyrus, keyboard } = await service.authorizeUser({ nickname, chatID })
  return { result, papyrus, keyboard }
}
const authorizeUser1 = async (body, service) => {
  const { nickname, chatID } = body
  const { result, papyrus, keyboard } = await service.authorizeUser1({ nickname, chatID })
  return { result, papyrus, keyboard }
}
export default service => ({
  authorizeUser: body => authorizeUser(body, service),
  authorizeUser1: body => authorizeUser1(body, service),
})
