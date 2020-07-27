import { commands, subCommands } from '../tools/markup'
import { context } from '../tools/context'
export { commandSelector, subcommandSelector } from './commandSelector'

export const isCommand = cmd => Object.values(commands).includes(cmd)
export const isSubCommand = () => Object.values(subCommands).includes(context.getContext().command)
