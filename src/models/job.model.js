import mongoose, { SchemaTypes } from 'mongoose'
const { ObjectId } = SchemaTypes

const JobSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // userId: { type: ObjectId, required: true }, // leave without this while there is no user to handle
    description: { type: String },
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