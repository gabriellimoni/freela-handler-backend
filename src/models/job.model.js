import mongoose from 'mongoose'
const { ObjectId } = mongoose.SchemaTypes

const JobSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    // userId: { type: ObjectId, required: true }, // leave without this while there is no user to handle
    description: { type: String },
    status: { type: String, default: 'active' },
    clients: [{ type: ObjectId }],
    dueDate: { type: Date },
    price: { type: Number },
    currency: { type: String, default: 'BRL' },
    logs: [{
        timeSpent: { type: String },
        description: { type: String },
        priceReceived: { type: Number },
        logTime: { type: Date, default: Date.now },
    }],
    createdAt: { type: Date, default: Date.now },
})

const JobModel = mongoose.model('Job', JobSchema)
export default JobModel