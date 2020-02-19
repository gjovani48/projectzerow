const mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

mongoose.connect('mongodb://projectzerow:projectzerow@cluster0-shard-00-00-hux7n.mongodb.net:27017,cluster0-shard-00-01-hux7n.mongodb.net:27017,cluster0-shard-00-02-hux7n.mongodb.net:27017/projectzerow?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true})


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
        default: 0,
        require: false
    },

    registration_code: {
        type: String,
        require: false
    },

    created_at: {
        type: Date,
        default: Date.now
    }

})

module.exports = User
