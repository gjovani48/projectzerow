const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

const Sale = mongoose.model('sale', {

    user_id: {
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true
    },

    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },

    quantity: {
        type: Number,
        require: true
    },

    total: {
        type: Number,
        require: true
    },

    sale_date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Sale