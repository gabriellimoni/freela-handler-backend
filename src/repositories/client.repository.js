import MongoBaseRepository from './mongodb/MongoBaseRepository.js'
import ClientModel from '../models/client.model.js'

export default class ClientRepository extends MongoBaseRepository {
    constructor () {
        super (ClientModel, 'CLI')
    }

    _mapRecordData (record) {
        const mappedRecord = super._mapRecordData(record)

        mappedRecord.notes.forEach(note => {
            note.id = note._id
            delete note._id
        })

        return mappedRecord
    }
}