import JobModel from '../models/job.model.js'

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
        // todo: use some patter to handle this error
        throw { message: `Job not found with this ID: ${jobId}` }
    }

    _handleError (error) {
        // todo: Handle mongodb and other errors
        throw error
    }
}