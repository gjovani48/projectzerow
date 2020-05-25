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
        require: false
    },

    title:{
        type: String,
        require: true
    },

    brief_description:{
        type: String,
        require: false
    },

    body:{
        type: String,
        require: false
    },

    image:{
        type: String,
        require: false
    },

    media_url:{
        type: String,
        require: false
    },

    is_archive:{
        type: Boolean,
        default: false
    },

    date_posted:{
        type: Date,
        default: Date.now
    }

})

module.exports = Post
