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
  afterAddPoints: () => [[commands.GROUP1], [commands.GROUP2], [commands.GROUP3]],
  afterManageMeetups: () => [
    [commands.ADD_MEETUP],
    [commands.EDIT_MEETUP],
    [commands.DELETE_MEETUP],
  ],
  chooseMeetupsDay: () => [
    [commands.DAY1],
    [commands.DAY2],
    [commands.DAY3],
    [commands.DAY4],
    [commands.DAY5],
    [commands.DAY6],
  ],
}
