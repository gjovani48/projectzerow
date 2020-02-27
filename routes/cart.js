const express = require('express')
const router = new express.Router()
const Cart = require('../model/cart')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

router.get('/', (req,res) => {
  Cart.find({}).populate(['product_id','user_id']).exec((err, data) => {
      if(err) throw err
      res.json(data)
  })
})

// router.get('/',(req,res)=>{
//   Cart.find({},(err,data)=>{
//       if(err) throw err;
//       res.json(data);
//   }).sort({count: -1});
// });

// Get Cart by ID
router.get('/:id', (req,res) => {
  Cart.findOne({user_id:req.params.id}).populate(['user_id']).exec((err, data) => {
      if(err) throw err
      res.json(data)
  })

})

// Add New Cart
router.post('/', urlEncoded,(req,res) => {
  var cart = new Cart({
    user_id: req.body.user_id
  })

  Cart.findOne({
    user_id: req.body.user_id
  }).then((user)=>{
    if(!user){
        cart.save( (err) => {
          if(err) res.json({msg:"Invalid Request"})
          res.json({msg:"Cart created"})
      })
    }
    else{
      res.json({error:"Cart already exists"})
    }

  })

})

//addtocart
router.post('/addtocart', urlEncoded, (req,res) => {
  Cart.updateOne({ user_id: req.body.user_id},
    {
      $push: { product: {product_id:req.body.product_id, quantity: req.body.quantity} }
    }
    ,(err) => {
      if(err) res.json({msg:err})

      Cart.updateOne({ user_id: req.body.user_id},{$inc:{items_count:1}},(err)=>{

        if(err) res.json({msg:err})
        res.json([{msg:req.body.user_id}])

      })
  })
})


// Update Cart by ID
router.put('/:id', urlEncoded, (req,res) => {
    Cart.updateOne({_id: req.params.id}, {
      product_id: req.body.product_id,
      user_id: req.body.user_id
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Cart Updated"}])
    })
})

// Delete Cart
router.delete('/:id', (req, res) => {
    Cart.deleteOne({_id: req.params.id}, (err) => {
        if(err) res.json({msg: "Invalid Request"})
        res.json({msg: "Cart Deleted"})
    })
})

module.exports = router
