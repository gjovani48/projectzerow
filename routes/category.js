const express = require('express')
const router = new express.Router()
const Category = require('../model/category')
const Product = require('../model/product')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

// Get All Categorys
router.get('/', (req,res) => {
    Category.find({},(err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

router.get('/productlist/:id', (req,res) => {
  Product.findOne({category_id:req.params.id},(err,data)=>{
    if(err) throw err
    res.json(data)
  })
})

// Get Category by ID
router.get('/:id', (req,res) => {
    Category.findOne({_id:req.params.id}).exec((err,data)=>{
        if(err) throw err

          Product.findOne({category_id:data._id}).exec((err,products)=>{
            if(err) throw err
            res.json({category:data, products: products})
          })

    })
})




// Add New Category
router.post('/', urlEncoded,(req,res) => {
    var category = new Category({
        name: req.body.name,
        description: req.body.description,
        image:  req.body.image,
    })

    category.save( (err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json({msg:"Category Added"})
    })
})

// Update Category by ID
router.put('/:id', urlEncoded, (req,res) => {
    Category.updateOne({_id: req.params.id}, {
        name: req.body.name,
        description: req.body.description,
        image:  req.body.image,
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Category Updated"}])
    })
})

// Delete Category
router.delete('/:id', (req, res) => {
    Category.deleteOne({_id: req.params.id}, (err) => {
        if(err) res.json({msg: "Invalid Request"})
        res.json({msg: "Category Deleted"})
    })
})

module.exports = router
