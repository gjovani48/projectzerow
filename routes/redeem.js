const express = require('express')
const router = new express.Router()
const Redeem = require('../model/redeem')
const Product = require('../model/product')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

// Get All Redeems
router.get('/', (req,res) => {
    Redeem.find({}).populate(['redeemable_id', 'user_id']).exec((err, data) => {
        if(err) throw err
        res.json(data)
    })
})

// Get Redeem by ID
router.get('/:id', (req,res) => {
    Redeem.findOne({_id:req.params.id}).populate(['redeemable_id', 'user_id']).exec((err, data) => {
        if(err) throw err
        res.json(data)
    })
})

// Add New Redeem
router.post('/', urlEncoded,(req,res) => {
    var redeem = new Redeem({
        user_id: req.body.user_id,
        item: req.body.item,
        total: req.body.total,
        remaining_points: req.body.remaining_points
    })

    itemArray = req.body.item;
    
    redeem.save( (err) => {

        if(err) res.json({msg:"Invalid Request"})

        for(var i=0; i<itemArray.length; i++){
            Product.updateOne({_id:itemArray[i]._id }, 
                {$inc:{quantity:-Math.abs(itemArray[i].quantity)}},
            (err) => {
                if(err) res.json({msg:"Invalid Request"})
            })
        }

        res.json({status:true})
    })
})

// Update Redeem by ID
router.put('/:id', urlEncoded, (req,res) => {
    Redeem.updateOne({_id: req.params.id}, {
        redeemable_id: req.body.name,
        user_id: req.body.description,
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Redeem Updated"}])
    })
})

// Delete Redeem
router.delete('/:id', (req, res) => {
    Redeem.deleteOne({_id: req.params.id}, (err) => {
        if(err) res.json({msg: "Invalid Request"})
        res.json({msg: "Redeem Deleted"})
    })
})

module.exports = router