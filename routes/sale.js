const express = require('express')
const router = new express.Router()
const Sale = require('../model/sale')
const Product = require('../model/product')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

// Get All Sales

router.get('/', (req,res) => {
    Sale.find({is_archive:false}).sort({sale_date: -1}).populate(['user_id','item.product_id']).exec((err, data) => {
        if(err) throw err
        res.json(data)
    })
})

router.get('/monthly', (req,res) => {
    Sale.aggregate([
     {
       $group:
         {
           _id: { month: { $month: "$sale_date"}, year: { $year: "$sale_date" } },
           totalAmount: { $sum: "$total" },
           count: { $sum: 1 }
         }
     }
   ],function(err,  sale) {
            if (err) res.send(err);
            res.json(sale);
    });
})

router.get('/latest', (req,res) => {
    Sale.findOne({}).sort({sale_date: -1}).populate(['user_id','item.product_id']).exec((err, data) => {
        if(err) throw err
        res.json(data)
    })
})

router.get('/oldest', (req,res) => {
    Sale.findOne({}).sort({sale_date: 1}).populate(['user_id','item.product_id']).exec((err, data) => {
        if(err) throw err
        res.json(data)
    })
})

router.get('/slug/:id', (req,res) => {
   Sale.findOne({_id:req.params.id}).populate(['user_id', 'product_id']).exec((err, data) => {
        if(err) throw err
        res.json(data)
    })
})

// Get Sale by ID
router.get('/:id', (req,res) => {
    Sale.find({user_id:req.params.id}).sort({sale_date: -1}).populate(['user_id', 'product_id']).exec((err, data) => {
        if(err) throw err
        res.json(data)
    })
})

// Add New Sale
router.post('/', urlEncoded,(req,res) => {


    var user_id = (req.body.user_id=="")? "5e637de1f897de1475f1498a":req.body.user_id;


    var sale = new Sale({
        user_id: user_id,
        item: req.body.item,
        total: req.body.total,
        amount_due: req.body.amount_due,
        change: req.body.change
    })

    itemArray = req.body.item;

    Sale.create(sale).then((sales_data,err)=>{

        if(err) res.json({msg:"Invalid Request"})

        for(var i=0; i<itemArray.length; i++){
            Product.updateOne({_id:itemArray[i]._id }, 
                {$inc:{quantity:-Math.abs(itemArray[i].quantity)}},
            (err) => {
                if(err) res.json({msg:"Invalid Request"})
            })
        }

        res.json({status:true,transaction_code:sales_data._id})

        console.log(sales_data)

    })
})



// Update Sale by ID
router.put('/:id', urlEncoded, (req,res) => {
    Sale.updateOne({_id: req.params.id}, {
        user_id: user_id,
        item: req.body.item,
        total: req.body.total
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Sale Updated"}])
    })

})

// router.put('/:id', urlEncoded, (req,res) => {
//     Product.updateOne({_id: req.params.id}, {
//         category_id: req.body.category_id,
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         image:  req.body.image,
//         quantity: req.body.quantity,
//         pzwpoints_req: req.body.pzwpoints_req,
//     },(err) => {
//         if(err) res.json({msg:"Invalid Request"})
//         res.json([{msg:"Product Updated"}])
//     })
// })


router.post('/archiveall', urlEncoded, (req,res) => {
    Sale.updateMany({}, { $set: { is_archive: false } },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Product Updated"}])
    })
})

router.post('/archive', urlEncoded, (req,res) => {
    Sale.updateOne({_id:req.body.id}, { $set: { is_archive: true } },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Product Updated"}])
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