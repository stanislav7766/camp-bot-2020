import ContextTree from './contextTree'
import { commands, subCommands, markupUser } from '../markup'
import { papyrus } from '../papyrus'

const ctxTreeUser = new ContextTree()

ctxTreeUser.insert({
  command: commands.START,
  keyboard: markupUser.initialKeyboard(),
  papyrus: papyrus.getInitialGreeting,
})
ctxTreeUser.insert(
  {
    command: subCommands.LYRICS_CHOOSE_ONE,
    keyboard: [],
    papyrus: papyrus.chooseInListLyrics,
  },
  commands.AUTHORIZE,
)
ctxTreeUser.insert(
  {
    command: commands.HELP,
    keyboard: markupUser.initialKeyboard(),
    papyrus: papyrus.getHelpInfo,
  },
  commands.START,
)
ctxTreeUser.insert(
  {
    command: commands.AUTHORIZE,
    keyboard: markupUser.afterAuthorize(),
    papyrus: papyrus.afterAuthorizeMsgUser,
  },
  commands.START,
)
ctxTreeUser.insert(
  {
    command: commands.MY_SCORE,
    keyboard: markupUser.afterAuthorize(),
    papyrus: papyrus.myScoreMsg,
  },
  commands.AUTHORIZE,
)
// ctxTreeUser.insert(
//   {
//     command: commands.MY_SCHEDULE,
//     keyboard: markupUser.afterMySchedule(),
//     papyrus: papyrus.getMyScheduleMsg,
//   },
//   commands.AUTHORIZE,
// )
ctxTreeUser.insert(
  {
    command: commands.INFO,
    keyboard: markupUser.afterAuthorize(),
    papyrus: papyrus.getInfoMsg,
  },
  commands.AUTHORIZE,
)
// ctxTreeUser.insert(
//   {
//     command: commands.TODAY,
//     keyboard: markupUser.afterAuthorize(),
//     papyrus: papyrus.getTodayMsg,
//   },
//   commands.MY_SCHEDULE,
// )
// ctxTreeUser.insert(
//   {
//     command: commands.TOMORROW,
//     keyboard: markupUser.afterAuthorize(),
//     papyrus: papyrus.getTomorrowMsg,
//   },
//   commands.MY_SCHEDULE,
// )
// ctxTreeUser.insert(
//   {
//     command: commands.WHOLE,
//     keyboard: markupUser.afterAuthorize(),
//     papyrus: papyrus.getWholeMsg,
//   },
//   commands.MY_SCHEDULE,
// )
ctxTreeUser.insert(
  {
    command: commands.ALL_CAMP_SCHEDULE,
    keyboard: markupUser.afterAuthorize(),
    papyrus: papyrus.getAllScheduleMsg,
  },
  commands.AUTHORIZE,
)
ctxTreeUser.insert(
  {
    command: commands.GROUP1,
    keyboard: markupUser.afterMySchedule(),
    papyrus: papyrus.getMyScheduleMsg,
  },
  commands.ALL_CAMP_SCHEDULE,
)
ctxTreeUser.insert(
  {
    command: commands.GROUP2,
    keyboard: markupUser.afterMySchedule(),
    papyrus: papyrus.getMyScheduleMsg,
  },
  commands.ALL_CAMP_SCHEDULE,
)
ctxTreeUser.insert(
  {
    command: commands.GROUP3,
    keyboard: markupUser.afterMySchedule(),
    papyrus: papyrus.getMyScheduleMsg,
  },
  commands.ALL_CAMP_SCHEDULE,
)
ctxTreeUser.insert(
  {
    command: commands.ALL_CAMP_SCORE,
    keyboard: markupUser.afterAuthorize(),
    papyrus: papyrus.getAllScoresMsg,
  },
  commands.AUTHORIZE,
)

export const contextTreeUser = ctxTreeUser
