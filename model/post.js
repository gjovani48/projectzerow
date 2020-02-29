const mongoose = require('mongoose')

try{
  mongoose.connect('mongodb+srv://projectzerow:projectzerow@cluster0-hux7n.mongodb.net/projectzerow?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true})
}
catch (err) {
 handleError(err);
}
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
