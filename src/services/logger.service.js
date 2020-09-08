import winston from 'winston'
const { createLogger, format, transports } = winston

export default class Logger {
    _logger = createLogger()
    _logService = ''

    constructor (logService='default-log-service') {
        this._logService = logService
        this._createCustomLogger()
    }

    _createCustomLogger () {
        this._logger = createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.errors({ stack: true }),
                format.splat(),
                format.json()
            ),
            defaultMeta: { service: this._logService },
            transports: [
                new transports.File({ filename: 'log-error.log', level: 'error' }),
                new transports.File({ filename: 'log-combined.log' }),
                // TODO: add transport to an log service like Logentries...
            ]
        })

        if (process.env.NODE_ENV !== 'production')
            this._handleDevelopmentLogging()
    }

    _handleDevelopmentLogging () {
        this._logger.add(new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }))
    }

    logInfo (logData) {
        this._logger.info(logData)
    }
    logError (logData) {
        this._logger.error(logData)
    }
}