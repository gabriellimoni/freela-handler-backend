import APIError from '../server/APIError.js'
import Logger from '../services/logger.service.js'
const logger = new Logger('api-error-middleware')

export default function (err, req, res, next) {
    logger.logError(err)

    if (err instanceof APIError) {
        return res.status(err.statusCode).send({
            message: err.message,
            referenceCode: err.referenceCode,
        })
    }

    return res.status(500).send('Internal server error - unknown')
}