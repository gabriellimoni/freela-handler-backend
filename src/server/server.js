import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes.js'

export default class Server {
    app = express()
    routes = null

    constructor() {
        this._setBodyParser()
        this._setCors()
        this._initializeV1Routes()
    }

    _setBodyParser () {
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())
    }

    _setCors () {
        this.app.use(cors())
    }

    _initializeV1Routes () {
        this.app.use('/v1', routes)
    }

    startOnPort (port) {
        this.app.listen(port, function () {
            console.log(`Listening on ${port}`)
        })
    }
}