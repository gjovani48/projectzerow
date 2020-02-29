const mongoose = require('mongoose')
const Schema = mongoose.Schema
// mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

try{
  mongoose.connect('mongodb+srv://projectzerow:projectzerow@cluster0-hux7n.mongodb.net/projectzerow?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true})
}
catch (err) {
 handleError(err);
}

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
