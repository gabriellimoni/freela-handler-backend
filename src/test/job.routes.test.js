import JobModel from '../models/job.model.js'
import request from "supertest"
import Server from "../server/server.js"
const server = new Server()
let app = null

let jobMock = {
    "name": "First Project",
    "description": "First Project description",
    "clients": ["5f56ef3355045c020cbc72e0"],
    "dueDate": "2020-09-08T00:02:00Z",
    "price": "2000",
    "logs": [{
        "timeSpent": "1h20m",
        "description": "A&D",
        "priceReceived": 1000
    }]
}

describe ('Testing creating jobs', () => {
    beforeAll(async () => {
        app = await server.getAppForTesting()
        await JobModel.deleteMany({})
    })
    afterAll(async () => {
        await server.closeAppForTesting()
    })

    it ('should add new job', (done) => {
        request(app)
            .post('/v1/jobs')
            .send(jobMock)
            .then(async response => {
                const responseStatus = response.status
                expect(responseStatus).toBe(201)
                
                const jobs = await JobModel.find({})
                expect(jobs).toHaveLength(1)
                
                const body = response.body
                expect(body.id).not.toBeNull()
                expect(String(body.id)).toEqual(String(jobs[0]._id))

                done()
            })
    })

    it ('should return one job only', (done) => {
        request(app)
            .get('/v1/jobs')
            .then(response => {
                const responseStatus = response.status
                expect(responseStatus).toBe(200)

                const body = response.body
                expect(body).toHaveLength(1)

                done()
            })
    })
})
