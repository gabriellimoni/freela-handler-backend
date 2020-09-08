import express from 'express'
import ClientController from '../controllers/clients.controller.js'

export default class V1Routes {
    clientController = new ClientController()
    router = express.Router()
    
    constructor () {
        this._initializeRootRoute()
        this._initializeClientRoutes()
    }

    // Testing route
    _initializeRootRoute () {
        this.router.get('/', (req, res) => {
            res.send('Hello World asdasd')
        })
    }

    _initializeClientRoutes () {
        this.router
            .get('/clients', this.clientController.list)
            .post('/clients', this.clientController.create)
            .put('/clients/:id', this.clientController.update)
    }

    getRouter() {
        return this.router
    }
}
