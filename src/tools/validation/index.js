import { GROUPS, TEAMS, DAYS, ALL_CAMP_AUDIENCE } from '../../constants'
export const isTime = text => /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(text)
export const isValidAudience = text => [...GROUPS, ...TEAMS, ALL_CAMP_AUDIENCE].includes(text)
export const isURL = url =>
  /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(url) ||
  url === 'later'

export const isNumberPoints = text => !!/^[0-9]?[0-9]-[0-9]?[0-9]$/.test(text)

export const isDay = text => DAYS.includes(text)
export const isYesNo = text => text === 'yes' || text === 'no'
