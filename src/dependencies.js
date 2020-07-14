const deps = { dotenv: require('dotenv') }
import Telegraf, { Markup } from 'telegraf'
import path from 'path'
import util from 'util'

deps.Telegraf = Telegraf
deps.Markup = Markup
deps.path = path
deps.util = util
deps.markupKeyboard = (...args) =>
  Markup.keyboard(...args)
    .oneTime()
    .resize()
    .extra()

export default Object.freeze(deps)
