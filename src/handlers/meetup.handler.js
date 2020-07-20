const addMeetup = async (body, service) => {
  const { dayCmd } = body
  const { result, papyrus, keyboard } = await service.addMeetup({ dayCmd })
  return { result, papyrus, keyboard }
}
const typedMeetupTitle = async (body, service) => {
  const { title } = body
  const { result, papyrus, keyboard } = await service.typedMeetupTitle({ title })
  return { result, papyrus, keyboard }
}
const typedMeetupTime = async (body, service) => {
  const { time } = body
  const { result, papyrus, keyboard } = await service.typedMeetupTime({ time })
  return { result, papyrus, keyboard }
}
const typedMeetupFacilitator = async (body, service) => {
  const { facilitator } = body
  const { result, papyrus, keyboard } = await service.typedMeetupFacilitator({ facilitator })
  return { result, papyrus, keyboard }
}

const typedMeetupAudience = async (body, service) => {
  const { audience } = body
  const { result, papyrus, keyboard } = await service.typedMeetupAudience({ audience })
  return { result, papyrus, keyboard }
}
const typedMeetupLink = async (body, service) => {
  const { link } = body
  const { result, papyrus, keyboard } = await service.typedMeetupLink({ link })
  return { result, papyrus, keyboard }
}
const confirmTypedMeetup = async (body, service) => {
  const { answer } = body
  const { result, papyrus, keyboard } = await service.confirmTypedMeetup({ answer })
  return { result, papyrus, keyboard }
}
export default service => ({
  addMeetup: body => addMeetup(body, service),
  typedMeetupTitle: body => typedMeetupTitle(body, service),
  typedMeetupTime: body => typedMeetupTime(body, service),
  typedMeetupFacilitator: body => typedMeetupFacilitator(body, service),
  typedMeetupAudience: body => typedMeetupAudience(body, service),
  typedMeetupLink: body => typedMeetupLink(body, service),
  confirmTypedMeetup: body => confirmTypedMeetup(body, service),
})
