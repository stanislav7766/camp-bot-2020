import ContextTree from './contextTree'
import { commands, subCommands, markupAdmin } from '../markup'
import { papyrus } from '../papyrus'

const ctxTreeAdmin = new ContextTree()

ctxTreeAdmin.insert({
  command: commands.START,
  keyboard: markupAdmin.initialKeyboard(),
  papyrus: papyrus.getInitialGreeting,
})
ctxTreeAdmin.insert(
  {
    command: commands.HELP,
    keyboard: markupAdmin.initialKeyboard(),
    papyrus: papyrus.getHelpInfo,
  },
  commands.START,
)
ctxTreeAdmin.insert(
  {
    command: commands.AUTHORIZE,
    keyboard: markupAdmin.afterAuthorize(),
    papyrus: papyrus.afterAuthorizeMsgAdmin,
  },
  commands.START,
)
ctxTreeAdmin.insert(
  {
    command: commands.ALL_CAMP_SCORE,
    keyboard: markupAdmin.afterAuthorize(),
    papyrus: papyrus.getAllScoresMsg,
  },
  commands.AUTHORIZE,
)
ctxTreeAdmin.insert(
  {
    command: commands.SEND_MSG_FILE,
    keyboard: markupAdmin.afterSendMsgFile(),
    papyrus: papyrus.selectAudience,
  },
  commands.AUTHORIZE,
)
ctxTreeAdmin.insert(
  {
    command: commands.GET_ALL_SCORES,
    keyboard: markupAdmin.afterAuthorize(),
    papyrus: papyrus.getAllScoresMsgPdf,
  },
  commands.AUTHORIZE,
)
ctxTreeAdmin.insert(
  {
    command: commands.ADD_POINTS,
    keyboard: markupAdmin.afterAddPoints(),
    papyrus: papyrus.getChooseGroupMsg,
  },
  commands.AUTHORIZE,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.ADD_POINTS_CHOOSE_ONE,
    keyboard: [],
    papyrus: papyrus.typeNumberInList,
  },
  commands.ADD_POINTS,
)

ctxTreeAdmin.insert(
  {
    command: subCommands.ADD_POINTS_TYPED_NUMBER,
    keyboard: [],
    papyrus: papyrus.checkTypedNumber,
  },
  commands.ADD_POINTS,
)

// ctxTreeAdmin.insert(
//   {
//     command: commands.MANAGE_MEETUPS,
//     keyboard: markupAdmin.afterManageMeetups(),
//     papyrus: papyrus.getManageMeetups,
//   },
//   commands.AUTHORIZE,
// )
// ctxTreeAdmin.insert(
//   {
//     command: commands.ADD_MEETUP,
//     keyboard: markupAdmin.chooseMeetupsDay(),
//     papyrus: papyrus.getMeetupsDayMsg,
//   },
//   commands.MANAGE_MEETUPS,
// )
// ctxTreeAdmin.insert(
//   {
//     command: commands.EDIT_MEETUP,
//     keyboard: markupAdmin.chooseMeetupsDay(),
//     papyrus: papyrus.getMeetupsDayMsg,
//   },
//   commands.MANAGE_MEETUPS,
// )
// ctxTreeAdmin.insert(
//   {
//     command: commands.DELETE_MEETUP,
//     keyboard: markupAdmin.chooseMeetupsDay(),
//     papyrus: papyrus.getMeetupsDayMsg,
//   },
//   commands.MANAGE_MEETUPS,
// )

// ctxTreeAdmin.insert(
//   {
//     command: subCommands.ADD_MEETUP_FACILITATOR,
//     keyboard: [],
//     papyrus: papyrus.getAddMeetupFacilitatorMsg,
//   },
//   commands.ADD_MEETUP,
// )
// ctxTreeAdmin.insert(
//   {
//     command: subCommands.ADD_MEETUP_TITLE,
//     keyboard: [],
//     papyrus: papyrus.getAddMeetupTitleMsg,
//   },
//   commands.ADD_MEETUP,
// )
// ctxTreeAdmin.insert(
//   {
//     command: subCommands.ADD_MEETUP_TIME,
//     keyboard: [],
//     papyrus: papyrus.getAddMeetupTimeMsg,
//   },
//   commands.ADD_MEETUP,
// )
// ctxTreeAdmin.insert(
//   {
//     command: subCommands.ADD_MEETUP_AUDIENCE,
//     keyboard: [],
//     papyrus: papyrus.getAddMeetupAudienceMsg,
//   },
//   commands.ADD_MEETUP,
// )
// ctxTreeAdmin.insert(
//   {
//     command: subCommands.ADD_MEETUP_LINK,
//     keyboard: [],
//     papyrus: papyrus.getAddMeetupLinkMsg,
//   },
//   commands.ADD_MEETUP,
// )

// ctxTreeAdmin.insert(
//   {
//     command: subCommands.ADD_MEETUP_CONFIRM,
//     keyboard: [],
//     papyrus: papyrus.getAddMeetupConfirmMsg,
//   },
//   commands.ADD_MEETUP,
// )
// ctxTreeAdmin.insert(
//   {
//     command: subCommands.DELETE_MEETUP_CHOOSE_ONE,
//     keyboard: [],
//     papyrus: papyrus.typeMeetupInList,
//   },
//   commands.DELETE_MEETUP,
// )
// ctxTreeAdmin.insert(
//   {
//     command: subCommands.EDIT_MEETUP_CHOOSE_ONE,
//     keyboard: [],
//     papyrus: papyrus.typeMeetupInList,
//   },
//   commands.EDIT_MEETUP,
// )
// ctxTreeAdmin.insert(
//   {
//     command: subCommands.EDIT_MEETUP_CHOOSE_PROP,
//     keyboard: markupAdmin.editMeetupProp(),
//     papyrus: papyrus.selectEditInMeetup,
//   },
//   commands.EDIT_MEETUP,
// )
// ctxTreeAdmin.insert(
//   {
//     command: subCommands.DELETE_MEETUP_CONFIRM,
//     keyboard: [],
//     papyrus: papyrus.getDeleteMeetupConfirmMsg,
//   },
//   commands.DELETE_MEETUP,
// )
// ctxTreeAdmin.insert(
//   {
//     command: subCommands.EDIT_MEETUP_TYPED_PROP,
//     keyboard: [],
//     papyrus: papyrus.typeNewMeetupProp,
//   },
//   commands.EDIT_MEETUP,
// )
// ctxTreeAdmin.insert(
//   {
//     command: subCommands.EDIT_MEETUP_CONFIRM,
//     keyboard: [],
//     papyrus: papyrus.getEditMeetupConfirmMsg,
//   },
//   commands.EDIT_MEETUP,
// )

ctxTreeAdmin.insert(
  {
    command: subCommands.SEND_MSG_FILE_TYPE_MSG,
    keyboard: [],
    papyrus: papyrus.typeMsgForSending,
  },
  commands.SEND_MSG_FILE,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.SEND_MSG_FILE_ASK_FILE,
    keyboard: [],
    papyrus: papyrus.askFileForSendingMsg,
  },
  commands.SEND_MSG_FILE,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.SEND_MSG_FILE_LOAD_FILE,
    keyboard: [],
    papyrus: papyrus.waitLoadFile,
  },
  commands.SEND_MSG_FILE,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.SEND_MSG_FILE_CONFIRM_SENDING,
    keyboard: [],
    papyrus: papyrus.sendMsgFileConfirm,
  },
  commands.SEND_MSG_FILE,
)
// ctxTreeAdmin.insert(
//   {
//     command: commands.TODAY,
//     keyboard: markupAdmin.afterAuthorize(),
//     papyrus: papyrus.getTodayMsg,
//   },
//   commands.MY_SCHEDULE,
// )
// ctxTreeAdmin.insert(
//   {
//     command: commands.TOMORROW,
//     keyboard: markupAdmin.afterAuthorize(),
//     papyrus: papyrus.getTomorrowMsg,
//   },
//   commands.MY_SCHEDULE,
// )
// ctxTreeAdmin.insert(
//   {
//     command: commands.WHOLE,
//     keyboard: markupAdmin.afterAuthorize(),
//     papyrus: papyrus.getWholeMsg,
//   },
//   commands.MY_SCHEDULE,
// )
ctxTreeAdmin.insert(
  {
    command: commands.ALL_CAMP_SCHEDULE,
    keyboard: markupAdmin.afterAuthorize(),
    papyrus: papyrus.getAllScheduleMsg,
  },
  commands.AUTHORIZE,
)
ctxTreeAdmin.insert(
  {
    command: commands.GROUP1,
    keyboard: markupAdmin.afterMySchedule(),
    papyrus: papyrus.getMyScheduleMsg,
  },
  commands.ALL_CAMP_SCHEDULE,
)
ctxTreeAdmin.insert(
  {
    command: commands.GROUP2,
    keyboard: markupAdmin.afterMySchedule(),
    papyrus: papyrus.getMyScheduleMsg,
  },
  commands.ALL_CAMP_SCHEDULE,
)
ctxTreeAdmin.insert(
  {
    command: commands.GROUP3,
    keyboard: markupAdmin.afterMySchedule(),
    papyrus: papyrus.getMyScheduleMsg,
  },
  commands.ALL_CAMP_SCHEDULE,
)
ctxTreeAdmin.insert(
  {
    command: commands.MANAGE_NOTIFY,
    keyboard: markupAdmin.afterManageNotify(),
    papyrus: papyrus.getManageMeetups,
  },
  commands.AUTHORIZE,
)
ctxTreeAdmin.insert(
  {
    command: commands.ADD_NOTIFY,
    keyboard: markupAdmin.chooseNotifyDay(),
    papyrus: papyrus.getNotifyDayMsg,
  },
  commands.MANAGE_NOTIFY,
)
ctxTreeAdmin.insert(
  {
    command: commands.EDIT_NOTIFY,
    keyboard: markupAdmin.chooseNotifyDay(),
    papyrus: papyrus.getNotifyDayMsg,
  },
  commands.MANAGE_NOTIFY,
)
ctxTreeAdmin.insert(
  {
    command: commands.DELETE_NOTIFY,
    keyboard: markupAdmin.chooseNotifyDay(),
    papyrus: papyrus.getNotifyDayMsg,
  },
  commands.MANAGE_NOTIFY,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.ADD_NOTIFY_MSG,
    keyboard: [],
    papyrus: papyrus.getAddNotifyMsg,
  },
  commands.ADD_NOTIFY,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.ADD_NOTIFY_TIME,
    keyboard: [],
    papyrus: papyrus.getAddNotifyTimeMsg,
  },
  commands.ADD_NOTIFY,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.ADD_NOTIFY_AUDIENCE,
    keyboard: [],
    papyrus: papyrus.getAddNotifyAudienceMsg,
  },
  commands.ADD_NOTIFY,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.ADD_NOTIFY_CONFIRM,
    keyboard: [],
    papyrus: papyrus.getAddNotifyConfirmMsg,
  },
  commands.ADD_MEETUP,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.DELETE_NOTIFY_CHOOSE_ONE,
    keyboard: [],
    papyrus: papyrus.typeNotifyInList,
  },
  commands.DELETE_NOTIFy,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.EDIT_NOTIFY_CHOOSE_ONE,
    keyboard: [],
    papyrus: papyrus.typeNotifyInList,
  },
  commands.EDIT_NOTIFY,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.EDIT_NOTIFY_CHOOSE_PROP,
    keyboard: markupAdmin.editNotifyProp(),
    papyrus: papyrus.selectEditInNotify,
  },
  commands.EDIT_NOTIFY,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.DELETE_NOTIFY_CONFIRM,
    keyboard: [],
    papyrus: papyrus.getDeleteNotifyConfirmMsg,
  },
  commands.DELETE_MEETUP,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.EDIT_NOTIFY_TYPED_PROP,
    keyboard: [],
    papyrus: papyrus.typeNewNotifyProp,
  },
  commands.EDIT_NOTIFY,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.EDIT_NOTIFY_CONFIRM,
    keyboard: [],
    papyrus: papyrus.getEditNotifyConfirmMsg,
  },
  commands.EDIT_NOTIFY,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.LYRICS_CHOOSE_ONE,
    keyboard: [],
    papyrus: papyrus.chooseInListLyrics,
  },
  commands.AUTHORIZE,
)
export const contextTreeAdmin = ctxTreeAdmin
