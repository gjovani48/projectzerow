const express = require('express')
const router = new express.Router()
const Message = require('../model/message')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

// Get All Posts
router.get('/', (req,res) => {
    Message.find({},(err,data)=>{
        if(err) throw err 
        res.json(data)
    })
})

// Get Post by ID
router.get('/:id', (req,res) => {
    Message.findOne({_id:req.params.id}).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

// Add New Post
router.post('/', urlEncoded,(req,res) => {
    var message = new Message({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    })
    
    message.save( (err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json({status:true})
        console.log({status:true})
    })
})

// Update Post by ID
router.put('/:id', urlEncoded, (req,res) => {
    Message.updateOne({_id: req.params.id}, {
       name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Post Updated"}])
    })
})

// Delete Post
router.delete('/:id', (req, res) => {
    Message.deleteOne({_id: req.params.id}, (err) => {
        if(err) res.json({msg: "Invalid Request"})
        res.json({msg: "Post Deleted"})
    })
})

module.exports = router