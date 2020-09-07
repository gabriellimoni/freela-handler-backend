import ClientModel from '../models/client.model.js'

export default class ClientRepository {
    async create (client) {
        try {
            const newClient = new ClientModel(client)
            await newClient.save()
            
            const mappedClientData = this._mapClientData(newClient)
            return mappedClientData
        } catch (error) {
            // Validates error
            throw error
        }
    }

    _mapClientData (client) {
        const mappedClient = {...client.toJSON()}
        
        mappedClient.id = client._id
        delete mappedClient._id
        delete mappedClient.__v
        mappedClient.notes.forEach(note => delete note._id)

        return mappedClient
    }
}