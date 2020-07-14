import { commands } from './commands'

const sharedMarkup = [[commands.ALL_CAMP_SCHEDULE], [commands.ALL_CAMP_SCORE], [commands.LYRICS]]

export const markupAdmin = {
  initialKeyboard: () => [[commands.HELP], [commands.AUTHORIZE]],
  afterAuthorize: () => [
    ...sharedMarkup,
    [commands.MANAGE_MEETUPS],
    [commands.SEND_MSG_FILE],
    [commands.GET_ALL_SCORES],
    [commands.ADD_POINTS],
    [commands.MANAGE_NOTIFY],
  ],
}
