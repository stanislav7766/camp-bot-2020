import winston, { addColors, config, createLogger, transports as _transports } from 'winston'

const {
  format: { combine, label, printf, colorize, timestamp },
} = winston
const logTimeStamp = () => new Date(Date.now()).toUTCString()
const logMessageFormat = printf(info => `[${info.label}]: ${info.message} | ${info.timestamp}`)

addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  verbose: 'blue',
  debug: 'white',
  silly: 'white',
})
const levels = { ...config.syslog.levels }

export const logger = createLogger({
  levels,
  transports: [
    new _transports.Console({
      level: 'info',
      timestamps: true,
      format: combine(
        label({ label: 'camp-bot' }),
        colorize({ all: true }),
        timestamp({ format: logTimeStamp }),
        logMessageFormat,
      ),
    }),
  ],
})

logger.useLogger = (level, { msg, name }) => logger.log(level, `${name} : ${msg}`)
