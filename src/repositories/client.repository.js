import ClientModel from '../models/client.model.js'
import APIError from '../errors/APIError.js'

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
        const apiError = new APIError(
            `Client not found with this ID: ${clientId}.`,
            404,
            'CLI-004'
        )
        throw apiError
    }

    _handleError (error) {
        if (error.name == 'ValidationError') {
            this._handleValidationError(error)
        } else if (error.name == 'MongoError') {
            this._handleMongoError(error)
        }
        throw error
    }

    _handleValidationError (error) {
        const apiError = new APIError(
            error.message,
            400,
            'CLI-001',
        )
        throw apiError
    }

    _handleMongoError (error) {
        let message = error.message
        let statusCode = 400
        let referenceCode = 'CLI-002'

        const errorCode = error.code
        if (errorCode == '11000') {
            const duplicateKeys = Object.keys(error.keyValue)
            message = `Duplicated properties: ${duplicateKeys.join(', ')}.`
            referenceCode = 'CLI-003'
        }

        const apiError = new APIError(
            message,
            statusCode,
            referenceCode,
        )
        throw apiError
    }
}