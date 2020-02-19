const mongoose = require('mongoose')

//mongoose.connect('mongodb://localhost:27017/projectzerow',{useNewUrlParser:true, useUnifiedTopology: true})

mongoose.connect('mongodb://projectzerow:projectzerow@cluster0-shard-00-00-hux7n.mongodb.net:27017,cluster0-shard-00-01-hux7n.mongodb.net:27017,cluster0-shard-00-02-hux7n.mongodb.net:27017/projectzerow?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true})


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
