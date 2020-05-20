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
    pzwpoints:{
      type: Number,
      require: false
    },
    quantity: {
      type: Number,
      require: false
    }
});


const Sale = mongoose.model('redeem', {

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

    remaining_points: {
        type: Number,
        require: true
    },

    redeem_date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Sale
