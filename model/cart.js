const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

try{
  mongoose.connect('mongodb+srv://projectzerow:projectzerow@cluster0-hux7n.mongodb.net/projectzerow?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true})
}
catch (err) {
 handleError(err);
}

var product_schema = new Schema({
    product_id:{
        type: Schema.Types.ObjectId,
        ref:'product',
        require: false
    },
    quantity: {
      type: Number,
      require: false
    }
});

const Cart = mongoose.model('cart', {

    product:[
      product_schema
    ],
    user_id:{
        type: Schema.Types.ObjectId,
        ref:'user',
        require: false
    },
	  items_count:{
      type:Number,
      require: false,
    },
    status:{
      type:String,
      require: false,
    },
    total:{
      type:Number,
      require: false,
    },
    is_archive:{
        type: Boolean,
        default: false
    },
    created_date:{
        type: Date,
        default: Date.now
    }

})

module.exports = Cart

