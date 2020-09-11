import mongoose from 'mongoose'
const typeHolderModel = mongoose.model('Holder', new mongoose.Schema({ holder: String }))

import APIError from '../../errors/APIError.js'

export default class MongoBaseRepository {
    // just to hold JS types
    _model = typeHolderModel
    _modelName = ''
    _referenceCode = ''

    constructor (mongoModel, referenceCode) {
        if (!mongoModel) throw new Error('MongoDB base repository needs a Model to handle')
        if (!mongoModel) throw new Error('MongoDB base repository needs a referenceCode to handle errors')

        this._model = mongoModel
        this._modelName = this._model.modelName.toLowerCase()
        this._referenceCode = referenceCode
    }

    async create (record) {
        try {
            const newRecord = new this._model(record)
            await newRecord.save()
            
            const mappedRecordData = this._mapRecordData(newRecord)
            return mappedRecordData
        } catch (error) {
            this._handleError(error)
        }
    }

    async listAll () {
        try {
            const records = await this._model.find()
            
            const mappedRecordsData = records.map(this._mapRecordData)
            return mappedRecordsData
        } catch (error) {
            this._handleError(error)
        }
    }

    async updateById (recordId, updateRecordData) {
        try {
            const recordToUpdate = await this._model.findById(recordId).select('_id')
            if (!recordToUpdate) return this._handleRecordNotFoundById(recordId)

            await _model.updateOne(
                { _id: recordId }, 
                updateRecordData
            )

            const updatedRecord = await this._model.findById(recordId)
            const mappedUpdatedRecord = this._mapRecordData(updatedRecord)
            return mappedUpdatedRecord
        } catch (error) {
            this._handleError(error)
        }
    }

    _mapRecordData (record) {
        const mappedRecord = {...record.toJSON()}
        
        mappedRecord.id = record._id
        delete mappedRecord._id
        delete mappedRecord.__v

        return mappedRecord
    }

    _handleRecordNotFoundById (recordId) {
        const apiError = new APIError(
            `${this._modelName} not found with this ID: ${recordId}.`,
            404,
            `${this._referenceCode}-004`
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
            `${this._referenceCode}-001`,
        )
        throw apiError
    }

    _handleMongoError (error) {
        let message = error.message
        let statusCode = 400
        let referenceCode = `${this._referenceCode}-002`

        const errorCode = error.code
        if (errorCode == '11000') {
            const duplicateKeys = Object.keys(error.keyValue)
            message = `Duplicated properties: ${duplicateKeys.join(', ')}.`
            referenceCode = `${this._referenceCode}-003`
        }

        const apiError = new APIError(
            message,
            statusCode,
            referenceCode,
        )
        throw apiError
    }
}