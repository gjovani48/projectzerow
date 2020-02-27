const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

mongoose.connect('mongodb+srv://projectzerow:projectzerow@cluster0-hux7n.mongodb.net/projectzerow?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true})


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

	items_count: {
        type: Number,
        require: true
    }
	
    created_date:{
        type: Date,
        default: Date.now
    }

})

module.exports = Cart
