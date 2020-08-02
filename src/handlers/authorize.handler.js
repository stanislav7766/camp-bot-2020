const authorizeUser = async (body, service) => {
  const { nickname, chatID } = body
  const { result, papyrus, keyboard } = await service.authorizeUser({ nickname, chatID })
  return { result, papyrus, keyboard }
}

export default service => ({
  authorizeUser: body => authorizeUser(body, service),
})
