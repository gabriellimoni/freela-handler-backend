import express from 'express'
import ClientController from '../controllers/clients.controller.js'
import JobController from '../controllers/jobs.controller.js'

export default class V1Routes {
    clientController = new ClientController()
    jobController = new JobController()
    router = express.Router()
    
    constructor () {
        this._initializeRootRoute()
        this._initializeClientRoutes()
        this._initializeJobRoutes()
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
    
    _initializeJobRoutes () {
        this.router
            .get('/jobs', this.jobController.list)
            .post('/jobs', this.jobController.create)
            .put('/jobs/:id', this.jobController.update)
    }

    getRouter() {
        return this.router
    }
}
