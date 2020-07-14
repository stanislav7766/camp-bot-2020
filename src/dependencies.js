const deps = { dotenv: require('dotenv') }
import Telegraf, { Markup } from 'telegraf'
import path from 'path'
import util from 'util'
import mongoose from 'mongoose'

deps.Telegraf = Telegraf
deps.Markup = Markup
deps.path = path
deps.util = util
deps.mongoose = mongoose
deps.markupKeyboard = (...args) =>
  Markup.keyboard(...args)
    .oneTime()
    .resize()
    .extra()

export default Object.freeze(deps)
