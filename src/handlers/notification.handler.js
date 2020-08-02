const startCronJobs = async (body, service) => {
  const { result } = await service.startCronJobs()
  return { result }
}
const addNotify = async (body, service) => {
  const { dayCmd } = body
  const { result, papyrus, keyboard } = await service.addNotify({ dayCmd })
  return { result, papyrus, keyboard }
}
const deleteNotify = async (body, service) => {
  const { dayCmd } = body
  const { result, papyrus, keyboard } = await service.deleteNotify({ dayCmd })
  return { result, papyrus, keyboard }
}
const editNotify = async (body, service) => {
  const { dayCmd } = body
  const { result, papyrus, keyboard } = await service.editNotify({ dayCmd })
  return { result, papyrus, keyboard }
}
const typedNotifyMsg = async (body, service) => {
  const { msg } = body
  const { result, papyrus, keyboard } = await service.typedNotifyMsg({ msg })
  return { result, papyrus, keyboard }
}
const typedNotifyTime = async (body, service) => {
  const { time } = body
  const { result, papyrus, keyboard } = await service.typedNotifyTime({ time })
  return { result, papyrus, keyboard }
}

const typedNotifyAudience = async (body, service) => {
  const { audience } = body
  const { result, papyrus, keyboard } = await service.typedNotifyAudience({ audience })
  return { result, papyrus, keyboard }
}

const confirmTypedNotify = async (body, service) => {
  const { answer } = body
  const { result, papyrus, keyboard } = await service.confirmTypedNotify({ answer })
  return { result, papyrus, keyboard }
}
const confirmTypedDeleteNotify = async (body, service) => {
  const { answer } = body
  const { result, papyrus, keyboard } = await service.confirmTypedDeleteNotify({ answer })
  return { result, papyrus, keyboard }
}
const confirmTypedEditNotify = async (body, service) => {
  const { answer } = body
  const { result, papyrus, keyboard } = await service.confirmTypedEditNotify({ answer })
  return { result, papyrus, keyboard }
}
const typedDeleteNotify = async (body, service) => {
  const { time } = body
  const { result, papyrus, keyboard } = await service.typedDeleteNotify({ time })
  return { result, papyrus, keyboard }
}
const typedEditNotify = async (body, service) => {
  const { time } = body
  const { result, papyrus, keyboard } = await service.typedEditNotify({ time })
  return { result, papyrus, keyboard }
}
const editNotifyProp = async (body, service) => {
  const { prop } = body
  const { result, papyrus, keyboard } = await service.editNotifyProp({ prop })
  return { result, papyrus, keyboard }
}
const typedEditNotifyProp = async (body, service) => {
  const { prop } = body
  const { result, papyrus, keyboard } = await service.typedEditNotifyProp({ prop })
  return { result, papyrus, keyboard }
}

export default service => ({
  startCronJobs: body => startCronJobs(body, service),
  addNotify: body => addNotify(body, service),
  deleteNotify: body => deleteNotify(body, service),
  editNotify: body => editNotify(body, service),
  typedNotifyMsg: body => typedNotifyMsg(body, service),
  typedNotifyTime: body => typedNotifyTime(body, service),
  typedNotifyAudience: body => typedNotifyAudience(body, service),
  confirmTypedNotify: body => confirmTypedNotify(body, service),
  confirmTypedDeleteNotify: body => confirmTypedDeleteNotify(body, service),
  confirmTypedEditNotify: body => confirmTypedEditNotify(body, service),
  typedDeleteNotify: body => typedDeleteNotify(body, service),
  typedEditNotify: body => typedEditNotify(body, service),
  editNotifyProp: body => editNotifyProp(body, service),
  typedEditNotifyProp: body => typedEditNotifyProp(body, service),
})
