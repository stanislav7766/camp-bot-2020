import deps from '../../dependencies'

const { util } = deps

const COLORS = {
  info: '\x1b[1;37m',
  debug: '\x1b[1;33m',
  error: '\x1b[0;31m',
}
class Logger {
  constructor(label) {
    this.label = label
  }

  write(level = 'info', s) {
    const date = new Date().toISOString()
    const color = COLORS[level]
    const line = `[${this.label}] \t ${s} \t ${date}`
    console.log(color + line + '\x1b[0m')
  }

  log(...args) {
    const msg = util.format(...args)
    this.write('info', msg)
  }

  dir(...args) {
    const msg = util.inspect(...args)
    this.write('info', msg)
  }

  debug(...args) {
    const msg = util.format(...args)
    this.write('debug', msg)
  }

  error(...args) {
    const msg = util.format(...args).replace(/[\n\r]{2,}/g, '\n')
    this.write('error', msg.replace(this.regexp, ''))
  }
}
export default new Logger(process.env.BOT_LABEL)
