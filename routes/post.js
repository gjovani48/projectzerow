const express = require('express')
const router = new express.Router()
const Post = require('../model/post')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

// Get All Posts
router.get('/', (req,res) => {
    Post.find({},(err,data)=>{
        if(err) throw err 
        res.json(data)
    })
})

// Get Post by ID
router.get('/:id', (req,res) => {
    Post.findOne({_id:req.params.id}).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

// Add New Post
router.post('/', urlEncoded,(req,res) => {
    var post = new Post({
        author: req.body.author,
        title: req.body.title,
        body: req.body.body,
        image:  req.body.image,
        media_url: req.body.media_url
    })
    
    post.save( (err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json({msg:"Post Added"})
    })
})

// Update Post by ID
router.put('/:id', urlEncoded, (req,res) => {
    Post.updateOne({_id: req.params.id}, {
        author: req.body.author,
        title: req.body.title,
        body: req.body.body,
        image:  req.body.image,
        media_url: req.body.media_url
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Post Updated"}])
    })
})

// Delete Post
router.delete('/:id', (req, res) => {
    Post.deleteOne({_id: req.params.id}, (err) => {
        if(err) res.json({msg: "Invalid Request"})
        res.json({msg: "Post Deleted"})
    })
})

module.exports = router