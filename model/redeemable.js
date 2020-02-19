const mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

mongoose.connect('mongodb://projectzerow:projectzerow@cluster0-shard-00-00-hux7n.mongodb.net:27017,cluster0-shard-00-01-hux7n.mongodb.net:27017,cluster0-shard-00-02-hux7n.mongodb.net:27017/projectzerow?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true})


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
