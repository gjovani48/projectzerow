const express = require('express')
const router = new express.Router()
const Redeem = require('../model/redeem')
const Product = require('../model/product')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

// Get All Redeems
router.get('/', (req,res) => {
    Redeem.find({is_archive:false}).sort({redeem_date:-1}).populate(['redeemable_id', 'user_id']).exec((err, data) => {
        if(err) throw err
        res.json(data)
    })
})

router.get('/arc', (req,res) => {
    Redeem.find({is_archive:true}).sort({redeem_date:-1}).populate(['redeemable_id', 'user_id']).exec((err, data) => {
        if(err) throw err
        res.json(data)
    })
})

router.post('/archive', urlEncoded, (req,res) => {
    Redeem.updateOne({_id:req.body._id}, { $set: { is_archive: true } },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Product Updated"}])
    })
})


// Get Redeem by ID
router.get('/:id', (req,res) => {
    Redeem.find({user_id:req.params.id}).sort({redeem_date:-1}).populate(['redeemable_id', 'user_id']).exec((err, data) => {
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


router.post('/archiveall', urlEncoded, (req,res) => {
    Redeem.updateMany({}, { $set: { is_archive: false } },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Product Updated"}])
    })
})


router.post('/archive', urlEncoded, (req,res) => {
    Redeem.updateOne({_id:req.body.id}, { $set: { is_archive: true } },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Product Updated"}])
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