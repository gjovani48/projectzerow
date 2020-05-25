const mongoose = require('mongoose')

try{
  mongoose.connect('mongodb+srv://projectzerow:projectzerow@cluster0-hux7n.mongodb.net/projectzerow?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true})
}
catch (err) {
  handleError(err);
}

const Message = mongoose.model('message', {

   name:{
        type: String,
        require: false
    },

    email:{
        type: String,
        require: true
    },

    message:{
        type: String,
        require: false
    },

    date_created:{
        type: Date,
        default: Date.now
    },
    is_archive:{
        type: Boolean,
        default: false
    },
    status:{
        type: Boolean,
        default: false
    },


})

module.exports = Message
