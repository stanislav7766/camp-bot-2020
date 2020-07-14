const authorizeUser = async (body, service) => {
  const { nickname } = body
  const { result, status } = await service.authorizeUser({ nickname })
  return { result, status }
}

export default service => ({
  authorizeUser: body => authorizeUser(body, service),
})
