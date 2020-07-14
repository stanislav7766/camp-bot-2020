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

export const contextTreeUser = ctxTreeUser
