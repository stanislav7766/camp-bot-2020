const authorizeUser = async (body, service) => {
  const { nickname } = body
  const { result, papyrus, keyboard } = await service.authorizeUser({ nickname })
  return { result, papyrus, keyboard }
}

export default service => ({
  authorizeUser: body => authorizeUser(body, service),
})
