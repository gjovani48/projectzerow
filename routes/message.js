const express = require('express')
const router = new express.Router()
const Message = require('../model/message')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()
const nodemailer = require('nodemailer')

// var transporter  = nodemailer.createTransport({
//   service: 'gmail',
//   auth:{
//     user:'projectzerowdevs@gmail.com',
//     pass: '!1Projectzerow',
//   }
// });

const transporter = nodemailer.createTransport({
  service: 'gmail',//smtp.gmail.com  //in place of service use host...
  secure: false,//true
  port: 25,//465
  auth: {
    user:'projectzerowdevs@gmail.com',
    pass: '!1Projectzerow',
  }, tls: {
    rejectUnauthorized: false
  }
});

// Get All Posts
router.get('/', (req,res) => {
    Message.find({is_archive:false},(err,data)=>{
        if(err) throw err 
        res.json(data)
    })
})

router.get('/arc', (req,res) => {
    Message.find({is_archive:true},(err,data)=>{
        if(err) throw err 
        res.json(data)
    })
})

router.post('/archive', urlEncoded, (req,res) => {
    Message.updateOne({_id:req.body._id}, { $set: { is_archive: true } },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Product Updated"}])
    })
})

router.post('/archive/many', urlEncoded, (req,res) => {

    console.log(req.body._ids);

    // Message.updateOne({_id:{$in:req.body._ids}}, { $set: { is_archive: true } },(err) => {
    //     if(err) res.json({msg:"Invalid Request"})
    //     res.json([{msg:"Product Updated"}])
    // })
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

router.post('/sendemail',urlEncoded,(req,res)=>{

    // let htmlContent = `
    //             <h1><strong>Contact Form</strong></h1>
    //             <p>Hi,</p>
    //             <p>${name} contacted with the following Details</p>
    //             <br/>
    //             <p>Email: ${email}</p>
    //             <p>Phone: ${phone}</p>
    //             <p>Company Name: ${companyName}</p>
    //             <p>Message: ${message}</p>
    //             `
    // let mailOptions = {
    //     from: "Example <example@gmail.com>",
    //     to: "me@gmail.com",
    //     subject: "Mail Test",
    //     text: "",
    //     html: htmlContent
    // }

    var mailOptions = {
      from: 'Project:ZeroW',
      to: req.body.email,
      subject: 'Message From Project:Zerow Developers',
      text: req.body.message
    }

    transporter.sendMail(mailOptions,(err,data)=>{
      if (err) throw err

      res.json({status: true})
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

router.post('/archiveall', urlEncoded, (req,res) => {
    Message.updateMany({}, { $set: { is_archive: false } },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Product Updated"}])
    })
})

router.post('/archive', urlEncoded, (req,res) => {
    Message.updateOne({_id:req.body._id}, { $set: { is_archive: true } },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Product Updated"}])
    })
})

router.post('/open', urlEncoded, (req,res) => {
    Message.updateOne({_id:req.body._id}, { $set: { status: true } },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json({msg:"status Updated"})
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