const deps = { dotenv: require('dotenv') }
import Telegraf, { Markup } from 'telegraf'
import path from 'path'
deps.Telegraf = Telegraf
deps.Markup = Markup
deps.path = path
export default Object.freeze(deps)
