const appRoot = require('app-root-path')
const moment = require('moment-timezone')
const { createLogger, format, transports } = require('winston')

const localTimeZone = 'Europe/Paris'
const { splat, combine, timestamp, printf, colorize } = format

const logFileName = 'resources.log'

const myFormat = printf(({ timestamp, level, message }) => {
	return `${timestamp} ${level} ${message}`
})

const appendTimestamp = format((info, opts) => {
	if (opts.tz)
		info.timestamp = moment()
			.tz(opts.tz)
			.format()
	return info
})

// How to specify format per transport?
let options = {
	file: {
		level: 'info',
		filename: `${appRoot}/log/` + logFileName,
		handleExceptions: true,
		maxsize: 52428800, // 50MB
		maxFiles: 5,
		colorize: true
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		colorize: true
	}
}

export const logger = createLogger({
	format: combine(
		appendTimestamp({ tz: localTimeZone }),
		splat(),
		colorize(),
		myFormat
	),
	transports: [
		new transports.File(options.file),
		new transports.Console(options.console)
	],
	exitOnError: false // do not exit on handled exceptions
})

