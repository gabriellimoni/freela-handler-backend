import ClientModel from '../models/client.model.js'
import request from "supertest"
import Server from "../server/server.js"
const server = new Server()
let app = null

let clientMock = {
    "name": "First Client",
    "email": "firstClient@client.com12",
    "phone": "14981135119",
    "notes": [{ "text": "teste 12312323" }],
    "address": {
        "city": "Dois Córregos",
        "state": "SP",
        "country": "Brazil",
        "street": "Rua joão graell",
        "number": 322,
        "complement": "complement test",
    },
}

describe ('Testing creating clients', () => {
    beforeAll(async () => {
        app = await server.getAppForTesting()
        await ClientModel.deleteMany({})
    })
    afterAll(async () => {
        await server.closeAppForTesting()
    })

    it ('should add new client', (done) => {
        request(app)
            .post('/v1/clients')
            .send(clientMock)
            .then(async response => {
                const responseStatus = response.status
                expect(responseStatus).toBe(201)
                
                const clients = await ClientModel.find({})
                expect(clients).toHaveLength(1)
                
                const body = response.body
                expect(body.id).not.toBeNull()
                expect(String(body.id)).toEqual(String(clients[0]._id))

                done()
            })
    })

    it ('should return one client only', (done) => {
        request(app)
            .get('/v1/clients')
            .then(response => {
                const responseStatus = response.status
                expect(responseStatus).toBe(200)

                const body = response.body
                expect(body).toHaveLength(1)

                done()
            })
    })

    it ('should return status 400 error for missing email', (done) => {
        const missingEmailMock = {...clientMock}
        delete missingEmailMock.email
        request(app)
            .post('/v1/clients')
            .send(missingEmailMock)
            .then(async response => {
                const responseStatus = response.status
                expect(responseStatus).toBe(400)

                done()
            })
    })

    it ('should return status 400 error for missing name', (done) => {
        const missingNameMock = {...clientMock}
        delete missingNameMock.name
        request(app)
            .post('/v1/clients')
            .send(missingNameMock)
            .then(async response => {
                const responseStatus = response.status
                expect(responseStatus).toBe(400)

                done()
            })
    })
})
