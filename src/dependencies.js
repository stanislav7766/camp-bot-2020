const deps = { dotenv: require('dotenv') }
import Telegraf, { Markup } from 'telegraf'
import path from 'path'
import util from 'util'

deps.Telegraf = Telegraf
deps.Markup = Markup
deps.path = path
deps.util = util

export default Object.freeze(deps)
