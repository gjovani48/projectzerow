const express = require('express');
const app = new express();

app.use(express.urlencoded({ extended: true }))

const cors = require('cors');
app.use(cors());

process.env.SECRET_KEY = 'secret'


app.use(express.static(__dirname+'/dist/projectzerow'));

app.get('/',(req,res)=>{
	res.sendFile(__dirname+'dist/projectzerow/index.html');
})


const user = require('./routes/user')
const product = require('./routes/product')
const category = require('./routes/category')
const sale = require('./routes/sale')
const redeemable = require('./routes/redeemable')
const redeem = require('./routes/redeem')

app.use('/user', user)
app.use('/product', product)
app.use('/category', category)
app.use('/sale', sale)
app.use('/redeemable', redeemable)
app.use('/redeem', redeem)

const PORT = process.env.PORT||80

app.listen(PORT,(err)=>{
    console.log(`server running at localhost:${PORT}`)
})
