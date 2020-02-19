const express = require('express')
const router = new express.Router()
const Redeemable = require('../model/redeemable')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

// Get All Redeemables
router.get('/', (req,res) => {
    Redeemable.find({},(err,data)=>{
        if(err) throw err 
        res.json(data)
    })
})

// Get Redeemable by ID
router.get('/:id', (req,res) => {
    Redeemable.findOne({_id:req.params.id}).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

// Add New Redeemable
router.post('/', urlEncoded,(req,res) => {
    var redeem = new Redeemable({
        name: req.body.name,
        description: req.body.description,
        image:  req.body.image,
        pzwcost: req.body.pzwcost
    })
    
    redeem.save( (err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json({msg:"Redeemable Added"})
    })
})

// Update Redeemable by ID
router.put('/:id', urlEncoded, (req,res) => {
    Redeemable.updateOne({_id: req.params.id}, {
        name: req.body.name,
        description: req.body.description,
        image:  req.body.image,
        pzwcost: req.body.pzwcost
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Redeemable Updated"}])
    })
})

// Delete Redeemable
router.delete('/:id', (req, res) => {
    Redeemable.deleteOne({_id: req.params.id}, (err) => {
        if(err) res.json({msg: "Invalid Request"})
        res.json({msg: "Redeemable Deleted"})
    })
})

module.exports = router