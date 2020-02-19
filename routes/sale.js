const express = require('express')
const router = new express.Router()
const Sale = require('../model/sale')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

// Get All Sales
router.get('/', (req,res) => {
    Sale.find({}).populate(['user_id', 'product_id']).exec((err, data) => {
        if(err) throw err
        res.json(data)
    })
})

// Get Sale by ID
router.get('/:id', (req,res) => {
    Sale.findOne({_id:req.params.id}).populate(['user_id', 'product_id']).exec((err, data) => {
        if(err) throw err
        res.json(data)
    })
})

// Add New Sale
router.post('/', urlEncoded,(req,res) => {
    var sale = new Sale({
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        quantity:  req.body.quantity,
        total: req.body.total
    })
    
    sale.save( (err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json({msg:"Sale Added"})
    })
})

// Update Sale by ID
router.put('/:id', urlEncoded, (req,res) => {
    Sale.updateOne({_id: req.params.id}, {
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        quantity:  req.body.quantity,
        total: req.body.total
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Sale Updated"}])
    })

})

// Delete Sale
router.delete('/:id', (req, res) => {
    Sale.deleteOne({_id: req.params.id}, (err) => {
        if(err) res.json({msg: "Invalid Request"})
        res.json({msg: "Sale Deleted"})
    })
})

module.exports = router