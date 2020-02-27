const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

const Category = mongoose.model('category', {

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
    }

})

module.exports = Category