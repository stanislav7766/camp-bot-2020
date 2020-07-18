import ContextTree from './contextTree'
import { commands, markupAdmin } from '../markup'
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
    command: commands.GET_ALL_SCORES,
    keyboard: markupAdmin.afterAuthorize(),
    papyrus: papyrus.getAllScoresMsgPdf,
  },
  commands.AUTHORIZE,
)

export const contextTreeAdmin = ctxTreeAdmin
