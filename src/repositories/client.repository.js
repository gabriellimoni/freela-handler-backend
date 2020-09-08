import ClientModel from '../models/client.model.js'

export default class ClientRepository {
    async create (client) {
        try {
            const newClient = new ClientModel(client)
            await newClient.save()
            
            const mappedClientData = this._mapClientData(newClient)
            return mappedClientData
        } catch (error) {
            this._handleError(error)
        }
    }

    async listAll () {
        try {
            const clients = await ClientModel.find()
            
            const mappedClientsData = clients.map(this._mapClientData)
            return mappedClientsData
        } catch (error) {
            this._handleError(error)
        }
    }

    async updateById (clientId, updateClientData) {
        try {
            const clientToUpdate = await ClientModel.findById(clientId).select('_id')
            if (!clientToUpdate) return this._handleNotFoundClient(clientId)

            await ClientModel.updateOne(
                { _id: clientId }, 
                updateClientData
            )

            const updatedClient = await ClientModel.findById(clientId)
            const mappedUpdatedClient = this._mapClientData(updatedClient)
            return mappedUpdatedClient
        } catch (error) {
            this._handleError(error)
        }
    }

    _mapClientData (client) {
        const mappedClient = {...client.toJSON()}
        
        mappedClient.id = client._id
        delete mappedClient._id
        delete mappedClient.__v
        mappedClient.notes.forEach(note => {
            note.id = note._id
            delete note._id
        })

        return mappedClient
    }

    _handleNotFoundClient (clientId) {
        // todo: use some patter to handle this error
        throw { message: `Client not found with this ID: ${clientId}` }
    }

    _handleError (error) {
        // todo: Handle mongodb and other errors
        throw error
    }
}