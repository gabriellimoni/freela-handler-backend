import express from 'express'
import ClientController from '../controllers/clients.controller.js'
const clientController = new ClientController()

const router = express.Router()

// Testing route
router.get('/', (req, res) => {
    res.send('Hello World')
})

// client routes
router
    .get('/clients', clientController.list)
    .post('/clients', clientController.create)
    .put('/clients', clientController.update)

export default router