import JobRepository from '../repositories/job.repository.js'
const jobRepository = new JobRepository()

export default class JobController {
    async create (req, res) {
        const job = req.body
        const newJob = await jobRepository.create(job)
        return res.status(201).send(newJob)
    }
    
    async update (req, res) {
        const jobId = req.params.id
        const jobData = req.body
        const updatedJob = await jobRepository.updateById(jobId, jobData)
        return res.status(200).json(updatedJob)
    }
    
    async list (req, res) {
        const jobs = await jobRepository.listAll()
        return res.status(200).send(jobs)
    }
}