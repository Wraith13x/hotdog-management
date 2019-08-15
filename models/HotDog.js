const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Hot Dog', schema)