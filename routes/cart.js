const express = require('express')
const router = new express.Router()
const Cart = require('../model/cart')
const Product = require('../model/product')
const User = require('../model/user')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

router.get('/', (req,res) => {
  try{
    Cart.find({}).populate(['product.product_id','user_id']).exec((err, data) => {
      if(err) throw err
      res.json(data)
    })
  }
  catch(error){
    handleError(error);
  }
})

// router.get('/',(req,res)=>{
//   Cart.find({},(err,data)=>{
//       if(err) throw err;
//       res.json(data);
//   }).sort({count: -1});
// });

// Get Cart by ID
router.get('/:id', (req,res) => {

  try{
    Cart.find({user_id:req.params.id}).populate(['user_id', 'product.product_id']).exec((err, data) => {
      if(err) throw err
      res.json(data)
    })
  }
  catch(error){
    handleError(error);
  }

})


router.post('/item', (req,res) => {

  try{
    Cart.findOne({user_id:req.body.user_id,$and:[{'product.product_id._id':req.body.product_id}]},(err,data)=>{
      if(err) throw err
        res.json(data)
    })
  }
  catch(error){
    handleError(error);
  }

})

router.post('/change',(req,res)=>{
    try {
      Cart.updateOne({'user_id._id':req.body.user_id,'product.product_id._id':req.body.product_id},
      {$inc:{'product.$.quantity':req.body.quantity}},(err)=>{
        if(err) res.json({msg:err})

        res.json({msg:"Cart updated"})

      })
    }
    catch (error) {
      handleError(error);
    }
})

// Add New Cart
router.post('/', urlEncoded,(req,res) => {
  try{

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
  }
  catch (error) {
    handleError(error);
  }

})



//addtocart
// router.post('/addtocart', urlEncoded, (req,res) => {
//   try {

//     var cart = new Cart({
//       user_id: req.body.user_id
//     })

//     Cart.findOne({
//       user_id: req.body.user_id
//     }).then((user)=>{
//       if(!user){
//           cart.save( (err) => {
//             if(err) res.json({msg:"Invalid Request"})
//             res.json({msg:"Cart created"})
//         })
//       }
//       else{

//         Cart.updateOne({ user_id: req.body.user_id},
//           {
//             $push: { product: {product_id:req.body.product_id, quantity: req.body.quantity} }
//           }
//           ,(err) => {
//             if(err) res.json({msg:err})

//             Cart.updateOne({ user_id: req.body.user_id},{$inc:{items_count:1}},(err)=>{

//               if(err) res.json({msg:err})
//               res.json([{msg:req.body.user_id}])

//             })
//         })
//       }

//     })

//   } catch (error) {
//     handleError(error);
//   }

// })


router.post('/addtocart',urlEncoded, (req,res)=>{

  try{
      var cart = new Cart({
        user_id: req.body.user_id,
        status:"paid"
      })

      cart.save((err,data) => {
        if(err) res.json({msg:"Invalid Request"})

          Cart.updateOne({ _id:data._id},
            {
              $push: { product: {product_id:req.body.product_id, quantity: req.body.quantity} }
            }
            ,(err) => {
              if(err) res.json({msg:err})

              Product.findOne({_id:req.body.product_id},(err,product_data)=>{
                if(err) res.json({msg:err})

                let total_price = parseInt(product_data.price)*parseInt(req.body.quantity);

                Cart.updateOne({ _id: data._id},{total:total_price,$inc:{items_count:1}},(err,result)=>{

                  if(err) res.json({msg:err})


                    let added_pzwpoints = total_price*.05;

                    User.updateOne({_id:req.body.user_id},{$inc:{pzwpoints:added_pzwpoints}},(err)=>{
                      if(err) res.json({msg:err})
                          res.json([{msg:result}])
                    })


                })

              })

          })

      })
    }
    catch(err) {
      res.json(err);
    }



})


// Update Cart by ID
router.put('/:id', urlEncoded, (req,res) => {
    try {

      Cart.updateOne({user_id: req.params.id}, {
        product_id: req.body.product_id,
        user_id: req.body.user_id,
        quantity:  req.body.quantity
      },(err) => {
          if(err) res.json({msg:"Invalid Request"})
          res.json([{msg:"Cart Updated"}])
      })

    } catch (error) {
      handleError(error);
    }
})

// Delete Cart
router.delete('/:id', (req, res) => {
    try {
      Cart.deleteOne({_id: req.params.id}, (err) => {
        if(err) res.json({msg: "Invalid Request"})
        res.json({msg: "Cart Deleted"})
       })

    } catch (error) {
      handleError(error);
    }
})

module.exports = router
