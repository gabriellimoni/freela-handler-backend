export default class ClientController {
    async create (req, res) {
        return res.send('Create jobs')
    }
    
    async update (req, res) {
        return res.send('Update jobs')
    }
    
    async list (req, res) {
        return res.send('List jobs')
    }
}