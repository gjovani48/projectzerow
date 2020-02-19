const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

mongoose.connect('mongodb://projectzerow:projectzerow@cluster0-shard-00-00-hux7n.mongodb.net:27017,cluster0-shard-00-01-hux7n.mongodb.net:27017,cluster0-shard-00-02-hux7n.mongodb.net:27017/projectzerow?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true})


const Redeem = mongoose.model('redeem', {

    redeemable_id:{
        type: Schema.Types.ObjectId,
        ref:'Redeemable',
        require: true
    },

    user_id:{
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true
    },

    redeem_date:{
        type: Date,
        default: Date.now
    }

})

module.exports = Redeem
