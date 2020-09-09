import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import logRequestMiddleware from '../middlewares/logRequest.middleware.js'
import errorHandlingMiddleware from '../middlewares/errorHandling.middleware.js'
import V1Routes from './routes/v1Routes.js'
import MongoDB from '../database/mongodb.js'
const mongoDB = new MongoDB()

export default class Server {
    app = express()
    routes = null

    constructor() {
        this._setBodyParser()
        this._setCors()
        this._setLogCallsMiddleware()
        this._initializeV1Routes()
        this._initializeErrorHandlingMiddlewares()
    }

    _setBodyParser () {
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())
    }

    _setCors () {
        this.app.use(cors())
    }

    _setLogCallsMiddleware () {
        this.app.use(logRequestMiddleware)
    }

    _initializeV1Routes () {
        const v1Routes = new V1Routes()
        const v1Router = v1Routes.getRouter()
        this.app.use('/v1', v1Router)
    }

    _initializeErrorHandlingMiddlewares () {
        this.app.use(errorHandlingMiddleware)
    }

    startOnPort (port) {
        mongoDB.connect()

        mongoDB.connection.on('open', () => {
            console.log('MongoDB Database connected')
            this.app.listen(port, function () {
                console.log(`Listening on ${port}`)
            })
        })
    }

    getAppForTesting () {
        return new Promise (resolve => {
            mongoDB.connect()
            mongoDB.connection.on('open', () => {
                resolve(this.app)
            })
        })
    }
    async closeAppForTesting () {
        await mongoDB.disconnect()
    }
}