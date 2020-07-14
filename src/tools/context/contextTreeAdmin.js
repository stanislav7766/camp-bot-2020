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

export const contextTreeAdmin = ctxTreeAdmin
