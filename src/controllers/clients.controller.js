import ClientRepository from '../repositories/client.repository.js'
const clientRepository = new ClientRepository()

export default class ClientController {
    async create (req, res) {
        const client = req.body
        const newClient = await clientRepository.create(client)
        return res.status(201).json(newClient)
    }
    
    async update (req, res) {
        const clientId = req.params.id
        const clientData = req.body
        const updatedClient = await clientRepository.updateById(clientId, clientData)
        return res.status(200).json(updatedClient)
    }
    
    async list (req, res) {
        const clients = await clientRepository.listAll()
        return res.status(200).json(clients)
    }
}