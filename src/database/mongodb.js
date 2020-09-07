import mongoose from 'mongoose'
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://root:passwdlocal@mongodb:27017'

export default class MongoDatabase {
    async connect () {
        await mongoose.connect(mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    }

    connection = mongoose.connection
}
