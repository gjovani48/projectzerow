const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

try{
  mongoose.connect('mongodb+srv://projectzerow:projectzerow@cluster0-hux7n.mongodb.net/projectzerow?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true})
}
catch (err) {
 handleError(err);
}

const Redeemable = mongoose.model('redeemable', {

    name:{
        type: String,
        max: 50,
        require: true
    },

    description:{
        type: String,
        max: 100,
        require: true
    },

    image:{
        type: String,
        require: true
    },

    pzwcost:{
        type: Number,
        require: true
    }

})

module.exports = Redeemable
