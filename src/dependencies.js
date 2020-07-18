const deps = { dotenv: require('dotenv') }
import Telegraf, { Markup } from 'telegraf'
import path from 'path'
import util from 'util'
import mongoose from 'mongoose'
import PdfPrinter from 'pdfmake'

deps.Telegraf = Telegraf
deps.Markup = Markup
deps.path = path
deps.util = util
deps.mongoose = mongoose
deps.PdfPrinter = PdfPrinter
deps.markupKeyboard = (...args) =>
  Markup.keyboard(...args)
    .oneTime()
    .resize()
    .extra()

export default Object.freeze(deps)
