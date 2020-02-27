const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

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
