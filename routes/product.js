const express = require('express')
const router = new express.Router()
const Product = require('../model/product')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

// Get All Products
router.get('/', (req,res) => {
    Product.find({}).populate(['category_id']).exec((err, data) => {
        if(err) throw err
        res.json(data)
    })
})

// router.get('/',(req,res)=>{
//   Product.find({},(err,data)=>{
//       if(err) throw err;
//       res.json(data);
//   }).sort({count: -1});
// });

// Get Product by ID
router.get('/:id', (req,res) => {
    Product.findOne({_id:req.params.id}).populate(['category_id']).exec((err, data) => {
        if(err) throw err
        res.json(data)
    })

})

// Add New Product
router.post('/', urlEncoded,(req,res) => {
    var product = new Product({
        category_id: req.body.category_id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.lapricestname,
        image:  req.body.image,
    })

    product.save( (err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json({msg:"Product Added"})
    })
})

// Update Product by ID
router.put('/:id', urlEncoded, (req,res) => {
    Product.updateOne({_id: req.params.id}, {
        category_id: req.body.category_id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.lapricestname,
        image:  req.body.image,
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Product Updated"}])
    })
})

// Delete Product
router.delete('/:id', (req, res) => {
    Product.deleteOne({_id: req.params.id}, (err) => {
        if(err) res.json({msg: "Invalid Request"})
        res.json({msg: "Product Deleted"})
    })
})

module.exports = router
