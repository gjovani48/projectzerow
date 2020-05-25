const mongoose = require('mongoose')
const Schema = mongoose.Schema
// mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

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
    name: {
        type: String,
        max: 50,
        require: true
    },
    image: {
            type: String,
            require: true
    },
    price:{
      type: Number,
      require: false
    },
    quantity: {
      type: Number,
      require: false
    }
});


const Sale = mongoose.model('sale', {

    user_id: {
        type: Schema.Types.ObjectId,
        ref:'user',
        require: false
    },

    item:[product_schema],

    total: {
        type: Number,
        require: true
    },

    amount_due: {
        type: Number,
        require: true
    },

    change: {
        type: Number,
        require: true
    },

    is_archive:{
        type: Boolean,
        default: false
    },

    sale_date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Sale
