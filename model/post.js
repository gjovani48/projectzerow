const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

const Post = mongoose.model('post', {

    author:{
        type: String,
        require: true
    },

    title:{
        type: String,
        require: true
    },

    body:{
        type: String,
        require: true
    },

    image:{
        type: String,
        require: true
    },

    media_url:{
        type: String,
        require: true
    },

    date_posted:{
        type: Date,
        default: Date.now
    }

})

module.exports = Post