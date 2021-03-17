const mongoose = require('mongoose')
const valid = require('validator')


const userSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        trim: true
    },
    total_services: {
        type: Number,
        default: 10,
        validate(value) {
            if (value < 0) {
                throw new Error('total services must be a postive number')
            }
        }

    },
    total_bill: {
        type: Number,
        default: 10.5,
        validate(value) {
            if (value < 0) {
                throw new Error('total bill must be a postive number')
            }
        }
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User