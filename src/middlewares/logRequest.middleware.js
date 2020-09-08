import Logger from '../services/logger.service.js'
const logger = new Logger('api-request')

export default function logApiCall (req, res, next) {
    logger.logInfo({
        headers: req.headers,
        url: req.url,
        method: req.method,
        body: req.body,
        query: req.query,
    })

    next()
}