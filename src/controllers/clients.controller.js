import ClientRepository from '../repositories/client.repository.js'
const clientRepository = new ClientRepository()

export default class ClientController {
    async create (req, res) {
        try {
            const client = req.body
            const newClient = await clientRepository.create(client)
            return res.json(newClient)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
    
    update (req, res) {
        res.send('Update Client')
    }
    
    list (req, res) {
        res.send('List Client')
    }
}