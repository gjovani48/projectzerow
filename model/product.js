const mongoose = require('mongoose')
const Schema = mongoose.Schema
//mongoose.connect('mongodb://127.0.0.1:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

try{
  mongoose.connect('mongodb+srv://projectzerow:projectzerow@cluster0-hux7n.mongodb.net/projectzerow?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true})
}
catch (err) {
 handleError(err);
}

const Product = mongoose.model('product', {

    category_id: {
        type: Schema.Types.ObjectId,
        ref:'category',
        require: true
    },
    name: {
        type: String,
        max: 50,
        require: true
    },
    description: {
        type: String,
        max: 100,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity:{
        type: Number,
        require: false
    },
    pzwpoints_req:{
        type: Number,
        require: false
    },
    image: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }

})

module.exports = Product
