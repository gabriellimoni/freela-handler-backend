import mongoose from 'mongoose'
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://root:passwdlocal@mongodb:27017'
mongoose.connect(mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

export default mongoose