import JobRepository from '../repositories/job.repository.js'
const jobRepository = new JobRepository()

export default class JobController {
    async create (req, res) {
        try {
            const job = req.body
            const newJob = await jobRepository.create(job)
            return res.status(201).send(newJob)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
    
    async update (req, res) {
        try {
            const jobId = req.params.id
            const jobData = req.body
            const updatedJob = await jobRepository.updateById(jobId, jobData)
            return res.status(200).json(updatedJob)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
    
    async list (req, res) {
        try {
            const jobs = await jobRepository.listAll()
            return res.status(200).send(jobs)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}