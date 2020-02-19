const mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})


mongoose.connect('mongodb://projectzerow:projectzerow@cluster0-shard-00-00-hux7n.mongodb.net:27017,cluster0-shard-00-01-hux7n.mongodb.net:27017,cluster0-shard-00-02-hux7n.mongodb.net:27017/projectzerow?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true})


const Admin = mongoose.model('admin', {
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

    username: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    }

})

module.exports = Admin
