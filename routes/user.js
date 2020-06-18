const express = require('express')
const randstr = require('randomstring')
const nodemailer = require('nodemailer')
const router = new express.Router()

const User = require('../model/user')
const Sale = require('../model/sale')
const Cart = require('../model/cart')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

var fs = require('fs');

const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

process.env.SECRET_KEY = 'secret'

var transporter  = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user:'projectzerowdevs@gmail.com',
    pass: '!1Projectzerow',
  }
});

// Get All Userss
router.get('/', (req,res) => {
    User.find({is_verified:true},(err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

router.get('/arc', (req,res) => {
    User.find({is_archive:true},(err,data)=>{
        if(err) throw err
        res.json(data)
    })
})



router.post('/archive', urlEncoded, (req,res) => {
    User.updateOne({_id:req.body._id}, { $set: { is_archive: true } },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Product Updated"}])
    })
})

router.post('/unarchive', urlEncoded, (req,res) => {
    User.updateOne({_id:req.body._id}, { $set: { is_archive: false } },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Product Updated"}])
    })
})


router.get('/profile', (req, res)=>{

    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        _id: decoded._id
    }).then(user=>{
        if(user){
            res.json(user)
        }
        else{
            res.send("User does not exists")
        }
    })
    .catch(err =>{
        res.send('error : '+ err)
    })

})


// Get User by ID
router.get('/:id', (req,res) => {
    User.findOne({_id:req.params.id},{firstname:1,middlename:1,lastname:1,is_verified:1}).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

// Get User by Fingerprint
router.get('/fingerprint/:id', (req,res) => {
    User.findOne({fingerprint_id:req.params.id},{firstname:1,middlename:1,lastname:1,pzwpoints:1,is_verified:1,fingerprint_id:1}).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

// Add New User
router.post('/', urlEncoded,(req,res) => {

    console.log(req.body)


    var userData = new User({

        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        phone:  req.body.phone,
        email: req.body.email,
        password: req.body.password,
        registration_code: randstr.generate({length:10,charset:'numeric'})

    })

    User.findOne({
      email: req.body.email
    })
    .then((user) => {
      if(!user){
        bcrypt.hash(req.body.password, 10,(err, hash) => {

          userData.password = hash

          User.create(userData).then((user) =>{

            var mailOptions = {
              from: 'Project ZeroW',
              to: user.email,
              subject: 'Account Verification',
              text: 'Your account verification code is '+user.registration_code
            }

            transporter.sendMail(mailOptions,(err,data)=>{
              if (err) throw err
              res.json({status: user.email + ' created successfully'})
            })


            //res.json({status: user.email + ' created successfully'})
          })
          .catch(err => {
            res.send('error: '+ err)
          })

        })
      }
      else{
        res.json({error:"User already exists"})
      }
    }).catch(err => {
      res.send('error: '+ err)
    })

    // user.save( (err) => {
    //     if(err) res.json({msg:"Invalid Request"})
    //     res.json({msg:"User Added"})
    // })
})

router.get('/verify/:registration_code', urlEncoded, (req, res) => {

  User.findOne({registration_code:req.params.registration_code})
  .then(user=>{

    if(user){

            User.updateOne({_id: user._id}, {$set:{
              "is_verified": true
            }},(err) => {
                if(err) res.json({msg:"Invalid Request"})

                User.findOne({_id: user._id},{firstname:1,middlename:1,lastname:1,is_verified:1},(err,data)=>{
                  if(err) throw err
                  res.json(data)
                })

            })

    }
    else{
      res.send('error: '+ "verification failed")
    }

  })
  .catch(err => {
    res.send('error: '+ err)
  })


})

router.post('/login', urlEncoded, (req,res)=>{
  User.findOne({email: req.body.email})
  .then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                const payload = {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    middlename: user.middlename,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY,{
                    expiresIn: 10440
                })

                res.json({token: token})
            }
            else{
                res.json({error:'user does not exists'})
            }
        }

        res.json({error: 'user does not exists'})
  })
  .catch(err => {
      res.send('error: ' + err)
  })

})




// Add Fingerprint ID
router.put('/:id/fingerprintid', urlEncoded, (req,res) => {
    User.updateOne({_id: req.params.id}, {
        fingerprint_id: req.body.fingerprint_id
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Fingerprint Added"}])
    })
})


// Add PZW Points

    

router.put('/:id/pzwpoints', urlEncoded, (req,res) => {

    var date_now = new Date();
    var points = [];
    var saledate;
    var total_points_ds_month;

    var w_points = [];
    var w_saledate;
    var w_total_points_ds_month;
    

    Cart.find({user_id:req.params.id},(err,res)=>{

       let temp_w_points = [];

       res.forEach((row)=>{

          if(row.created_date.getMonth() == date_now.getMonth()){

              w_points.push(parseFloat(row.total)*0.05);

           }


           console.log("Tubig machine point list");
           console.log(w_points)


       })

       w_total_points_ds_month = w_points.reduce((a, b) => a + b, 0);

       


    })


    

    Sale.find({user_id:req.params.id}).sort({sale_date: -1}).populate(['user_id', 'product_id']).exec((err, sale) => {
        if(err) throw err

         
        
         sale.forEach((row)=>{

           if(row.sale_date.getMonth() == date_now.getMonth()){

              points.push(parseFloat(row.total)*0.05);

           }

           console.log("Store point list");
           console.log(points)

           saledate = row.sale_date;

         })



         total_points_ds_month = points.reduce((a, b) => a + b, 0);

         console.log(w_total_points_ds_month)
         console.log(total_points_ds_month)

         console.log(total_points_ds_month+w_total_points_ds_month)

         var final_total = total_points_ds_month+w_total_points_ds_month;

         console.log("Final "+final_total);

        if(final_total>=200){


          User.findOne({_id: req.params.id},(err,data)=>{

            if(err) throw err

             User.updateOne({_id: req.params.id}, {
              $inc:{pzwpoints: (data.pzwpoints<200)? ((req.body.pzwpoints>200)? 200-data.pzwpoints:req.body.pzwpoints):0}
             },(err) => {
                if(err) res.json({msg:"Invalid Request"})

                res.json({status:true,msg:'reach the maximum points this month'})
                
            })
            


          })

         }
         else{

            User.updateOne({_id: req.params.id}, {
              $inc:{pzwpoints: (req.body.pzwpoints>200)? 200:req.body.pzwpoints}
            },(err) => {
                if(err) res.json({msg:"Invalid Request"})
                res.json({status:true})
            })


         }

         

    })




    

    
})

router.put('/:id/pzwpoints_deduct', urlEncoded, (req,res) => {
    User.updateOne({_id: req.params.id}, {
      $inc:{pzwpoints: -Math.abs(req.body.pzwpoints)}
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json({status:true})
    })
})

// Update User by ID

router.put('/:id', urlEncoded, (req,res) => {


   bcrypt.hash(req.body.password, 10,(err, hash) => {


          User.updateOne({_id: req.params.id}, {
                firstname: req.body.firstname,
                middlename: req.body.middlename,
                lastname: req.body.lastname,
                phone:  req.body.phone,
                email: req.body.email,
                password: hash,
          },(err,result) => {
              if(err) res.json({msg:"Invalid Request"})
              res.json([{msg:result}])
          })

   })



    
})

router.put('/:id/info', urlEncoded, (req,res) => {


    User.updateOne({_id: req.params.id}, {
                firstname: req.body.firstname,
                middlename: req.body.middlename,
                lastname: req.body.lastname,
                phone:  req.body.phone
    },(err,result) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:result}])
    })

    
})


router.post('/archiveall', urlEncoded, (req,res) => {
    User.updateMany({}, { $set: { is_archive: false } },(err) => {
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

router.post('/recover', urlEncoded, (req,res) => {

     console.log(req.body.email)

      User.findOne({
          email: req.body.email
      }).then(user=>{
          if(user){
              console.log(user)

              fs.readFile('form.html', {encoding: 'utf-8'}, function (err, html) {
                    if (err) {
                      console.log(err);
                    } else {
                      var mailOptions = {
                        from: 'Project ZeroW',
                        to: user.email,
                        subject: 'Account Recovery',
                        html: html
                      }

                      transporter.sendMail(mailOptions,(err,data)=>{
                        if (err) throw err
                        res.json({status:true})
                      })
                    }
                  });

          }
          else{
              res.send({status:false})
          }
      })
      .catch(err =>{
          res.send('error : '+ err)
      })
})

// Delete User
router.delete('/:id', (req, res) => {
    User.deleteOne({_id: req.params.id}, (err) => {
        if(err) res.json({msg: "Invalid Request"})
        res.json({msg: "User Deleted"})
    })
})

module.exports = router
