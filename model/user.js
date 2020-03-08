const mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

try{
   mongoose.connect('mongodb+srv://projectzerow:projectzerow@cluster0-hux7n.mongodb.net/projectzerow?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true})
}
catch (err) {
  handleError(err);
}

const User = mongoose.model('user', {

    firstname: {
        type: String,
        max: 50,
        require: true
    },

    middlename: {
        type: String,
        max: 50,
        require: false
    },

    lastname: {
        type: String,
        max: 50,
        require: true
    },

    phone: {
        type: String,
        max: 20,
        require: true
    },

    email: {
        type: String,
        max: 50,
        require: true
    },

    fingerprint_id: {
        type: String,
        require: false
    },

    password: {
        type: String,
        require: true
    },

    pzwpoints: {
        type: Number,
        require: false
    },

    registration_code: {
        type: String,
        require: true
    },

    is_verified: {
      type: Boolean,
      default: false,
      require: false
    },

    created_at: {
        type: Date,
        default: Date.now
    }

})

module.exports = User
