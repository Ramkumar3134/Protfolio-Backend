const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    brief: {
        type: String,
        trim: true
    },
    websiteUrl: {
        type: String,
        trim: true
    },
    companyStage: {
        type: String,
        trim: true
    },
    deadline: {
        type: String,
        trim: true
    },
    budget: {
        type: String,
        trim: true
    },
    howHeard: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Contact', contactSchema)