export const authorizeUser = (body, model) => {
  const { nickname } = body
  console.log(nickname)
  return { result: 'ok', status: 'admin' }
}

export default model => ({
  authorizeUser: body => authorizeUser(body, model),
})
