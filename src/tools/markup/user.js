import { commands } from './commands'
const sharedMarkup = [[commands.ALL_CAMP_SCHEDULE], [commands.ALL_CAMP_SCORE], [commands.LYRICS]]

export const markupUser = {
  initialKeyboard: () => [[commands.HELP], [commands.AUTHORIZE]],
  afterAuthorize: () => [
    ...sharedMarkup,
    [commands.INFO],
    [commands.MY_SCHEDULE],
    [commands.MY_SCORE],
  ],
  afterMySchedule: () => [[commands.TODAY], [commands.TOMORROW], [commands.WHOLE]],
  afterAllSchedule: () => [[commands.GROUP1], [commands.GROUP2], [commands.GROUP3]],
}
