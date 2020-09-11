import MongoBaseRepository from './mongodb/MongoBaseRepository.js'
import JobModel from '../models/job.model.js'

export default class JobRepository extends MongoBaseRepository {
    constructor () {
        super(JobModel, 'JOB')
    }

    _mapRecordData (record) {
        const mappedJob = super._mapRecordData(record)
        
        mappedJob.logs.forEach(log => {
            log.id = log._id
            delete log._id
        })

        return mappedJob
    }
}