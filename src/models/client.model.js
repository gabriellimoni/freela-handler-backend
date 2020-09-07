import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    address: { 
        city: { type: String },
        state: { type: String },
        country: { type: String, default: 'Brazil' },
        street: { type: String },
        number: { type: Number },
        complement: { type: String },
    },
    notes: [{
        text: { type: String },
    }],
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
})

const ClientModel = mongoose.model('Client', ClientSchema)
export default ClientModel