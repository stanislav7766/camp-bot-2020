import { commands } from './commands'

const sharedMarkup = [[commands.ALL_CAMP_SCHEDULE], [commands.ALL_CAMP_SCORE], [commands.LYRICS]]

export const markupAdmin = {
  initialKeyboard: () => [[commands.HELP], [commands.AUTHORIZE]],
  afterAuthorize: () => [
    ...sharedMarkup,
    // [commands.MANAGE_MEETUPS],
    [commands.SEND_MSG_FILE],
    [commands.GET_ALL_SCORES],
    [commands.ADD_POINTS],
    // [commands.MANAGE_NOTIFY],
  ],
  afterAddPoints: () => [[commands.GROUP1], [commands.GROUP2], [commands.GROUP3]],
  // afterManageMeetups: () => [
  //   [commands.ADD_MEETUP],
  //   [commands.EDIT_MEETUP],
  //   [commands.DELETE_MEETUP],
  // ],
  afterManageNotify: () => [
    [commands.ADD_NOTIFY],
    [commands.EDIT_NOTIFY],
    [commands.DELETE_NOTIFY],
  ],
  // chooseMeetupsDay: () => [
  //   [commands.DAY1],
  //   [commands.DAY2],
  //   [commands.DAY3],
  //   [commands.DAY4],
  //   [commands.DAY5],
  //   [commands.DAY6],
  // ],
  chooseNotifyDay: () => [
    [commands.DAY1],
    [commands.DAY2],
    [commands.DAY3],
    [commands.DAY4],
    [commands.DAY5],
    [commands.DAY6],
  ],
  // editMeetupProp: () => [
  //   [commands.EDIT_MEETUP_DAY],
  //   [commands.EDIT_MEETUP_TITLE],
  //   [commands.EDIT_MEETUP_TIME],
  //   [commands.EDIT_MEETUP_FACILITATOR],
  //   [commands.EDIT_MEETUP_LINK],
  //   [commands.EDIT_MEETUP_AUDIENCE],
  // ],
  editNotifyProp: () => [
    [commands.EDIT_NOTIFY_DAY],
    [commands.EDIT_NOTIFY_MSG],
    [commands.EDIT_NOTIFY_TIME],
    [commands.EDIT_NOTIFY_AUDIENCE],
  ],
  afterSendMsgFile: () => [
    [commands.ALL_CAMP_AUDIENCE],
    [commands.GROUP1],
    [commands.GROUP2],
    [commands.GROUP3],
    [commands.ORANGE],
    [commands.PINK],
    [commands.PURPLE],
    [commands.WHITE],
    [commands.NAVY],
  ],
  afterMySchedule: () => [[commands.TODAY], [commands.TOMORROW], [commands.WHOLE]],
  afterAllSchedule: () => [[commands.GROUP1], [commands.GROUP2], [commands.GROUP3]],
}
