import ClientRepository from '../repositories/client.repository.js'
const clientRepository = new ClientRepository()

export default class ClientController {
    async create (req, res) {
        try {
            const client = req.body
            const newClient = await clientRepository.create(client)
            return res.status(201).json(newClient)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
    
    update (req, res) {
        res.send('Update Client')
    }
    
    async list (req, res) {
        try {
            const clients = await clientRepository.listAll()
            return res.status(200).json(clients)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}