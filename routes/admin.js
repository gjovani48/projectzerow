const express = require('express')
const router = new express.Router()
const Admin = require('../model/admin')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

// Get All Admins
router.get('/', (req,res) => {
    Admin.find({},(err,data)=>{
        if(err) throw err 
        res.json(data)
    })
})

// Get Admin by ID
router.get('/:id', (req,res) => {
    Admin.findOne({_id:req.params.id}).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})


// Add New Admin
router.post('/', urlEncoded,(req,res) => {
    var admin = new Admin({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        phone:  req.body.phone,
        email: req.body.email,
    })
    
    admin.save( (err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json({msg:"Admin Added"})
    })
})

// Update Admin by ID
router.put('/:id', urlEncoded, (req,res) => {
    Admin.updateOne({_id: req.params.id}, {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        phone:  req.body.phone,
        email: req.body.email,
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Admin Updated"}])
    })
})

// Delete Admin
router.delete('/:id', (req, res) => {
    Admin.deleteOne({_id: req.params.id}, (err) => {
        if(err) res.json({msg: "Invalid Request"})
        res.json({msg: "Admin Deleted"})
    })
})

module.exports = router