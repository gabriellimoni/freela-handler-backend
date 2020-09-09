export default class APIError extends Error {
    message = ''
    statusCode = 0
    referenceCode = ''
    
    constructor (message, statusCode, referenceCode) {
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.referenceCode = referenceCode
    }
}