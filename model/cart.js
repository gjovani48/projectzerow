const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

const Cart = mongoose.model('cart', {

    product_id:{
        type: Schema.Types.ObjectId,
        ref:'product',
        require: true
    },

    user_id:{
        type: Schema.Types.ObjectId,
        ref:'user',
        require: true
    },

    created_date:{
        type: Date,
        default: Date.now
    }

})

module.exports = Cart
