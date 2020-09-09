import JobModel from '../models/job.model.js'
import APIError from '../errors/APIError.js'

export default class JobRepository {
    async create (job) {
        try {
            const newJob = new JobModel(job)
            await newJob.save()
            
            const mappedJobData = this._mapJobData(newJob)
            return mappedJobData
        } catch (error) {
            this._handleError(error)
        }
    }

    async listAll () {
        try {
            const jobs = await JobModel.find()
            
            const mappedJobsData = jobs.map(this._mapJobData)
            return mappedJobsData
        } catch (error) {
            this._handleError(error)
        }
    }

    async updateById (jobId, updateJobData) {
        try {
            const jobToUpdate = await JobModel.findById(jobId).select('_id')
            if (!jobToUpdate) return this._handleNotFoundJob(jobId)

            await JobModel.updateOne(
                { _id: jobId }, 
                updateJobData
            )

            const updatedJob = await JobModel.findById(jobId)
            const mappedUpdatedJob = this._mapJobData(updatedJob)
            return mappedUpdatedJob
        } catch (error) {
            this._handleError(error)
        }
    }

    _mapJobData (job) {
        const mappedJob = {...job.toJSON()}
        
        mappedJob.id = job._id
        delete mappedJob._id
        delete mappedJob.__v
        mappedJob.logs.forEach(log => {
            log.id = log._id
            delete log._id
        })

        return mappedJob
    }

    _handleNotFoundJob (jobId) {
        const apiError = new APIError(
            `Job not found with this ID: ${jobId}.`,
            404,
            'JOB-004'
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
            'JOB-001',
        )
        throw apiError
    }

    _handleMongoError (error) {
        let message = error.message
        let statusCode = 400
        let referenceCode = 'JOB-002'

        const errorCode = error.code
        if (errorCode == '11000') {
            const duplicateKeys = Object.keys(error.keyValue)
            message = `Duplicated properties: ${duplicateKeys.join(', ')}.`
            referenceCode = 'JOB-003'
        }

        const apiError = new APIError(
            message,
            statusCode,
            referenceCode,
        )
        throw apiError
    }
}