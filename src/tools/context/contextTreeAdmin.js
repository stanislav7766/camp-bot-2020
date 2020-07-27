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

ctxTreeAdmin.insert(
  {
    command: commands.MANAGE_MEETUPS,
    keyboard: markupAdmin.afterManageMeetups(),
    papyrus: papyrus.getManageMeetups,
  },
  commands.AUTHORIZE,
)
ctxTreeAdmin.insert(
  {
    command: commands.ADD_MEETUP,
    keyboard: markupAdmin.chooseMeetupsDay(),
    papyrus: papyrus.getMeetupsDayMsg,
  },
  commands.MANAGE_MEETUPS,
)
ctxTreeAdmin.insert(
  {
    command: commands.EDIT_MEETUP,
    keyboard: markupAdmin.chooseMeetupsDay(),
    papyrus: papyrus.getMeetupsDayMsg,
  },
  commands.MANAGE_MEETUPS,
)
ctxTreeAdmin.insert(
  {
    command: commands.DELETE_MEETUP,
    keyboard: markupAdmin.chooseMeetupsDay(),
    papyrus: papyrus.getMeetupsDayMsg,
  },
  commands.MANAGE_MEETUPS,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.ADD_MEETUP_TITLE,
    keyboard: [],
    papyrus: papyrus.getAddMeetupTitleMsg,
  },
  commands.ADD_MEETUP,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.ADD_MEETUP_TIME,
    keyboard: [],
    papyrus: papyrus.getAddMeetupTimeMsg,
  },
  commands.ADD_MEETUP,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.ADD_MEETUP_FACILITATOR,
    keyboard: [],
    papyrus: papyrus.getAddMeetupFacilitatorMsg,
  },
  commands.ADD_MEETUP,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.ADD_MEETUP_AUDIENCE,
    keyboard: [],
    papyrus: papyrus.getAddMeetupAudienceMsg,
  },
  commands.ADD_MEETUP,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.ADD_MEETUP_LINK,
    keyboard: [],
    papyrus: papyrus.getAddMeetupLinkMsg,
  },
  commands.ADD_MEETUP,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.ADD_MEETUP_CONFIRM,
    keyboard: [],
    papyrus: papyrus.getAddMeetupConfirmMsg,
  },
  commands.ADD_MEETUP,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.DELETE_MEETUP_CHOOSE_ONE,
    keyboard: [],
    papyrus: papyrus.typeMeetupInList,
  },
  commands.DELETE_MEETUP,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.EDIT_MEETUP_CHOOSE_ONE,
    keyboard: [],
    papyrus: papyrus.typeMeetupInList,
  },
  commands.EDIT_MEETUP,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.EDIT_MEETUP_CHOOSE_PROP,
    keyboard: markupAdmin.editMeetupProp(),
    papyrus: papyrus.selectEditInMeetup,
  },
  commands.EDIT_MEETUP,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.DELETE_MEETUP_CONFIRM,
    keyboard: [],
    papyrus: papyrus.getDeleteMeetupConfirmMsg,
  },
  commands.DELETE_MEETUP,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.EDIT_MEETUP_TYPED_PROP,
    keyboard: [],
    papyrus: papyrus.typeNewMeetupProp,
  },
  commands.EDIT_MEETUP,
)
ctxTreeAdmin.insert(
  {
    command: subCommands.EDIT_MEETUP_CONFIRM,
    keyboard: [],
    papyrus: papyrus.getEditMeetupConfirmMsg,
  },
  commands.EDIT_MEETUP,
)

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

export const contextTreeAdmin = ctxTreeAdmin
