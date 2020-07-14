import ContextTree from './contextTree'
import { commands, markupUser } from '../markup'
import { papyrus } from '../papyrus'

const ctxTreeUser = new ContextTree()

ctxTreeUser.insert({
  command: commands.START,
  keyboard: markupUser.initialKeyboard(),
  papyrus: papyrus.getInitialGreeting,
})
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
ctxTreeUser.insert(
  {
    command: commands.INFO,
    keyboard: markupUser.afterAuthorize(),
    papyrus: papyrus.getInfoMsg,
  },
  commands.AUTHORIZE,
)

export const contextTreeUser = ctxTreeUser
