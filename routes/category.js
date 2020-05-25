const express = require('express')
const router = new express.Router()
const Category = require('../model/category')
const Product = require('../model/product')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()
const path = require('path');
const multer = require('multer');


const DIR = './src/assets/img/category';

var file_name ;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    
    file_name = "category_"+Date.now()+"_pzw"+ path.extname(file.originalname)

    cb(null, file_name);
  }
});

let upload = multer({storage: storage});


router.post('/upload',upload.single('file'), function (req, res) {
  if (!req.file) {
      console.log("Your request doesn’t have any file");
      return res.send({
        success: false
      });
  
    } else {
      console.log('Your file has been received successfully');
      return res.json({
        success: file_name
      })
    }
});

// Get All Categorys
router.get('/', (req,res) => {
    Category.find({is_archive:false},(err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

router.get('/arc', (req,res) => {
     Category.find({is_archive:true},(err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

router.post('/archive', urlEncoded, (req,res) => {
    Category.updateOne({_id:req.body._id}, { $set: { is_archive: true } },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Product Updated"}])
    })
})

router.get('/productlist/:id', (req,res) => {
  Product.find({category_id:req.params.id,is_achive: false},(err,data)=>{
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
        image:  file_name,
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

router.post('/archiveall', urlEncoded, (req,res) => {
    Category.updateMany({}, { $set: { is_archive: false } },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Product Updated"}])
    })
})

router.post('/archive', urlEncoded, (req,res) => {
    Category.updateOne({_id:req.body.id}, { $set: { is_archive: true } },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Product Updated"}])
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
