import { ctxTree } from './context'
import { commands, markup } from '../markup'
import { papyrus } from '../papyrus'

ctxTree.insert({
  command: commands.START,
  keyboard: markup.initialKeyboard(),
  papyrus: papyrus.getInitialGreeting,
})
ctxTree.insert(
  {
    command: commands.HELP,
    keyboard: markup.initialKeyboard(),
    papyrus: papyrus.getHelpInfo,
  },
  commands.START,
)
ctxTree.insert(
  {
    command: commands.AUTHORIZE,
    keyboard: markup.afterAuthorize(),
    papyrus: papyrus.afterAuthorizeMsg,
  },
  commands.START,
)

export const contextTree = ctxTree
