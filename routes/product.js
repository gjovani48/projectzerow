const express = require('express')
const router = new express.Router()
const Product = require('../model/product')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()
const path = require('path');
const multer = require('multer');


const DIR = './src/assets/images';

var file_name ;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    
    file_name = "prod_"+Date.now()+"_pzw"+ path.extname(file.originalname)

    cb(null, file_name);
  }
});

let upload = multer({storage: storage});

// router.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });


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

// Get All Products
router.get('/', (req,res) => {
    Product.find({}).populate(['category_id']).exec((err, data) => {
        if(err) throw err
        res.json(data)
    })
})


// router.get('/qty_add', (req,res) => {
//     Product.updateMany({category_id:"5e585e3fcbd1ba001710412c"},{$set:{pzwpoints_req:99}},(err) => {
//         if(err) res.json({msg:"Invalid Request"})
//         res.json([{msg:"quantity Updated"}])
//     })
// })





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

router.post('/findIn', urlEncoded,(req,res)=>{

  Product.find({ category_id: { $in:req.body } }).populate(['category_id']).exec((err, data) => {
    if(err) throw err
    console.log(req.body)
    res.json(data)
  })

})

// Add New Product
router.post('/', urlEncoded,(req,res) => {
  var product = new Product({
      category_id: req.body.category_id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image:  file_name,
      quantity: req.body.quantity,
      pzwpoints_req: req.body.pzwpoints_req,
  })

  product.save( (err) => {
      if(err) res.json({msg:"Invalid Request"})
      console.log(product);
      res.json({msg:"Category Added"})
  })
})


router.post('/productseeder', urlEncoded,(req,res) => {
  // var product = new Product({
  //     category_id: req.body.category_id,
  //     name: req.body.name,
  //     description: req.body.description,
  //     price: req.body.price,
  //     image:  req.body.image,
  // })
 products = [

    {
      category_id: "5e575c6b7ab1f500178dc72f",
      name: "Nido Junior Advanced Protectus",
      description: "100 grams of Nido milk supplement for children 1-3 years old.",
      price: "100",
      image: "prod_nido3.jpg",
  },

  {
      category_id: "5e575c6b7ab1f500178dc72f",
      name: "Nido Advanced Protectus 5+",
      description: "100 grams of Nido milk supplement for children 5 years old and up.",
      price: "100",
      image: "prod_nido5.jpg",
  },

  {
      category_id: "5e575c6b7ab1f500178dc72f",
      name: "Pediasure",
      description: "100 grams of Pediasure milk supplement for children 1-3 years old.",
      price: "100",
      image: "prod_pediasure.jpg",
  },

  {
      category_id: "5e575c6b7ab1f500178dc72f",
      name: "Enfagrow A+",
      description: "100 grams of Enfagrow A+ milk supplement for children 1-3 years old.",
      price: "100",
      image: "prod_enfagrow.jpg",
  },

  {
      category_id: "5e575c6b7ab1f500178dc72f",
      name: "Johnson's Baby Oil",
      description: "100 ml of Johnson's Baby Oil with Aloe Vera.",
      price: "100",
      image: "prod_babyoil.jpg",
  },

  {
      category_id: "5e575c6b7ab1f500178dc72f",
      name: "Johnson's Head to Toe Baby Wash",
      description: "100 ml of Johnson's Head to Toe Baby Wash.",
      price: "100",
      image: "prod_babywash.jpg",
  },

  {
      category_id: "5e575c6b7ab1f500178dc72f",
      name: "Johnson's Baby Powder",
      description: "100 ml of Johnson's Baby Powder.",
      price: "30",
      image: "prod_babypowder.jpg",
  },

  {
      category_id: "5e575c6b7ab1f500178dc72f",
      name: "Off! Kids",
      description: "100 ml of Off! Insect repellent lotion for kids.",
      price: "100",
      image: "prod_offkids.jpg",
  },

  {
      category_id: "5e575c6b7ab1f500178dc72f",
      name: "Off!",
      description: "100 ml of Off! Insect repellent lotion.",
      price: "100",
      image: "prod_off.jpg",
  },

  {
      category_id: "5e575c6b7ab1f500178dc72f",
      name: "Washable Diapers",
      description: "Cloth Washable Diapers for babies.",
      price: "100",
      image: "prod_diaper.jpg",
  },
  {
    category_id: "5e575ca57ab1f500178dc730",
    name: "Novellino Classic Sweet Red Wine",
    description: "100 ml of Novellino Rosso Classico Sweet Red Wine.",
    price: "50",
    image: "prod_novellinosweetred.jpg",
},

{
    category_id: "5e575ca57ab1f500178dc730",
    name: "Novellino Classic Sweet White Wine",
    description: "100 ml of Novellino Rosso Classico Sweet White Wine.",
    price: "50",
    image: "prod_novellinosweetwhite.jpg",
},

{
    category_id: "5e575ca57ab1f500178dc730",
    name: "Novellino Classic Strawberry Passion",
    description: "100 ml of Novellino Rosso Classico Strawberry Passion.",
    price: "50",
    image: "prod_novellinostrawberry.jpg",
},

{
    category_id: "5e575ca57ab1f500178dc730",
    name: "Emperador",
    description: "100 ml of Emperador Brandy.",
    price: "20",
    image: "prod_empe.jpg",
},

{
    category_id: "5e575ca57ab1f500178dc730",
    name: "Emperador Light",
    description: "100 ml of Emperador Light Brandy.",
    price: "20",
    image: "prod_empelight.jpg",
},

{
    category_id: "5e575ca57ab1f500178dc730",
    name: "Emperador Double Light",
    description: "100 ml of Emperador Double Light Brandy.",
    price: "20",
    image: "prod_empedouble.jpg",
},

{
    category_id: "5e575ca57ab1f500178dc730",
    name: "Fundador",
    description: "100 ml of Fundador Brandy.",
    price: "50",
    image: "prod_funda.jpg",
},

{
    category_id: "5e575ca57ab1f500178dc730",
    name: "Fundador Light",
    description: "100 ml of Fundador Light Brandy.",
    price: "50",
    image: "prod_fundalight.jpg",
},

{
    category_id: "5e575ca57ab1f500178dc730",
    name: "Red Horse Beer",
    description: "100 ml of Red Horse Beer.",
    price: "10",
    image: "prod_redhorse.jpg",
},

{
    category_id: "5e575ca57ab1f500178dc730",
    name: "San Miguel Beer",
    description: "100 ml of San Miguel Beer Pale Pilsen.",
    price: "7",
    image: "prod_pilsen.jpg",
},

{
    category_id: "5e575ca57ab1f500178dc730",
    name: "San Mig Light",
    description: "100 ml of San Mig Light.",
    price: "7",
    image: "prod_sanmig.jpg",
},

{
    category_id: "5e575ca57ab1f500178dc730",
    name: "San Mig Apple",
    description: "100 ml of San Mig Apple.",
    price: "7",
    image: "prod_sanmigapple.jpg",
},
{
  category_id: "5e5861d8cbd1ba001710412d",
  name: "Drinking Water",
  description: "100 ml of Drinking Water",
  price: "1",
  image: "prod_water.jpg",
},

{
  category_id: "5e5861d8cbd1ba001710412d",
  name: "Apple Juice",
  description: "100 ml of Apple Juice",
  price: "10",
  image: "prod_applej.jpg",
},

{
  category_id: "5e5861d8cbd1ba001710412d",
  name: "Mango Juice",
  description: "100 ml of Mango Juice",
  price: "10",
  image: "prod_mangoj.jpg",
},

{
  category_id: "5e5861d8cbd1ba001710412d",
  name: "Orange Juice",
  description: "100 ml of Orange Juice",
  price: "10",
  image: "prod_orangej.jpg",
},

{
  category_id: "5e5861d8cbd1ba001710412d",
  name: "Pineapple Juice",
  description: "100 ml of Pineapple Juice",
  price: "10",
  image: "prod_pineapplej.jpg",
},

{
  category_id: "5e5861d8cbd1ba001710412d",
  name: "Coke",
  description: "100 ml of Coke",
  price: "5",
  image: "prod_coke.jpg",
},

{
  category_id: "5e5861d8cbd1ba001710412d",
  name: "Coke Diet",
  description: "100 ml of Coke Diet",
  price: "5",
  image: "prod_cokediet.jpg",
},

{
  category_id: "5e5861d8cbd1ba001710412d",
  name: "Coke Zero",
  description: "100 ml of Coke Zero",
  price: "5",
  image: "prod_cokezero.jpg",
},

{
  category_id: "5e5861d8cbd1ba001710412d",
  name: "Fanta",
  description: "100 ml of Fanta",
  price: "5",
  image: "fanta.jpg",
},

{
  category_id: "5e5861d8cbd1ba001710412d",
  name: "Sprite",
  description: "100 ml of Sprite",
  price: "5",
  image: "prod_sprite.jpg",
},
{
  category_id: "5e626b79ac649d001730563b",
  name: "Gardenia Classic White Bread",
  description: "100 grams or 4 slices of Gardenia Classic White Bread",
  price: "12",
  image: "prod_gardeniaclassic.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Gardenia High Fiber Whole Wheat",
  description: "100 grams or 4 slices of Gardenia High Fiber Whole Wheat Bread",
  price: "12",
  image: "prod_gardeniawholewheat.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Gardenia High Fiber Wheat Raisin",
  description: "100 grams or 4 slices of Gardenia High Fiber Wheat Raisin Bread",
  price: "12",
  image: "prod_gardeniaraisin.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Gardenia Chocolate Chip Loaf",
  description: "100 grams or 4 slices of Gardenia Chocolate Chip Loaf Bread",
  price: "12",
  image: "prod_gardeniachocoloaf.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Gardenia Pandesal",
  description: "70 grams or 2pcs. of Gardenia Pandesal",
  price: "5",
  image: "prod_gardeniapandesal.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Chocolate Crinkles",
  description: "Chocolate Crinkles.",
  price: "3",
  image: "prod_chococrinkle.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Ensaymada",
  description: "Cheesy Ensaymada.",
  price: "15",
  image: "prod_ensaymada.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Brownies",
  description: "Chocolate Brownies.",
  price: "10",
  image: "prod_brownies.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Biscuits",
  description: "25 grams of any kinds of biscuits.",
  price: "5",
  image: "prod_biscuits.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Nestle Koko Crunch",
  description: "100 grams of Nestle Koko Crunch Cereal.",
  price: "40",
  image: "prod_kokocrunch.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Nestle Honey Stars",
  description: "100 grams of Nestle Honey Stars cereal.",
  price: "40",
  image: "prod_kellogscornflakes.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Kellogs Corn Flakes",
  description: "100 grams of Kellogs Corn Flakes.",
  price: "40",
  image: "prod_kellogscornflakes.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Milo Choco Malt Powdered Milk Drink",
  description: "100 grams of Milo Choco Malt Powdered Milk Drink.",
  price: "30",
  image: "prod_milo.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Nescafe Original Coffee Mix",
  description: "100 grams of Nescafe Original Coffee Mix.",
  price: "20",
  image: "prod_nescafe.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Coffee Mate Creamer",
  description: "100 grams of Coffee Mate Creamer.",
  price: "30",
  image: "prod_creamer.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Quaker Oats",
  description: "100 grams of Quaker Oatmeal.",
  price: "20",
  image: "prod_quakeroats.jpg",
},

{
  category_id: "5e626b79ac649d001730563b",
  name: "Maya Original Pancake Mix",
  description: "100 grams of Maya Original Pancake Mix.",
  price: "15",
  image: "prod_mayapancakemix.jpg",
},
{
  category_id: "5e626b9bac649d001730563c",
  name: "Century Tuna Flakes in Vegetable Oil",
  description: "Century Tuna Flakes in Vegetable Oil 180 grams.",
  price: "50",
  image: "prod_centurytuna.jpg",
},

{
  category_id: "5e626b9bac649d001730563c",
  name: "Century Tuna Hot and Spicy",
  description: "Century Tuna Hot and Spicy 180 grams.",
  price: "50",
  image: "prod_centurytunaspicy.jpg",
},

{
  category_id: "5e626b9bac649d001730563c",
  name: "Mega Sardines",
  description: "Mega Sardines in can 155 grams.",
  price: "20",
  image: "prod_sardines.jpg",
},

{
  category_id: "5e626b9bac649d001730563c",
  name: "Mega Sardines Hot and Spicy",
  description: "Mega Sardines Hot and Spicy in can 155 grams.",
  price: "20",
  image: "prod_sardinesspicy.jpg",
},

{
  category_id: "5e626b9bac649d001730563c",
  name: "Purefoods Corned Beef",
  description: "Purefoods Corned Beef in can 150 grams.",
  price: "70",
  image: "prod_purefoodscornedbeef.jpg",
},

{
  category_id: "5e626b9bac649d001730563c",
  name: "Delimondo Corned Beef",
  description: "Delimondo Corned Beef in can 380 grams.",
  price: "160",
  image: "prod_delimondocornedbeef.jpg",
},

{
  category_id: "5e626b9bac649d001730563c",
  name: "San Marino Corned Tuna",
  description: "San Marino Corned Tuna in can 180 grams.",
  price: "35",
  image: "prod_sanmarino.jpg",
},

{
  category_id: "5e626b9bac649d001730563c",
  name: "San Marino Corned Tuna Spicy",
  description: "San Marino Corned Tuna Spicy in can 180 grams.",
  price: "35",
  image: "prod_sanmarinospicy.jpg",
},

{
  category_id: "5e626b9bac649d001730563c",
  name: "Spam Regular Luncheon Meat",
  description: "Spam Regular Luncheon Meat in can 340 grams.",
  price: "180",
  image: "prod_spam.jpg",
},

{
  category_id: "5e626b9bac649d001730563c",
  name: "Spam Luncheon Meat with Cheese",
  description: "Spam Luncheon Meat with Cheese in can 340 grams.",
  price: "180",
  image: "prod_spam.jpg",
},
{
  category_id: "5e626bc0ac649d001730563d",
  name: "Datu Puti Soy Sauce",
  description: "100 ml of Datu Puti Soy Sauce.",
  price: "5",
  image: "prod_datusoysauce.jpg",
},

{
  category_id: "5e626bc0ac649d001730563d",
  name: "Datu Puti Vinegar",
  description: "100 ml of Datu Puti Vinegar.",
  price: "5",
  image: "prod_datuvinegar.jpg",
},

{
  category_id: "5e626bc0ac649d001730563d",
  name: "Datu Puti Patis",
  description: "100 ml of Datu Puti Patis.",
  price: "5",
  image: "prod_datupatis.jpg",
},

{
  category_id: "5e626bc0ac649d001730563d",
  name: "Vegetable Oil",
  description: "100 ml of Vegetable Cooking Oil.",
  price: "20",
  image: "prod_vegetableoil.jpg",
},

{
  category_id: "5e626bc0ac649d001730563d",
  name: "Palm Oil",
  description: "100 ml of Palm Cooking Oil.",
  price: "20",
  image: "prod_palmoil.jpg",
},

{
  category_id: "5e626bc0ac649d001730563d",
  name: "Olive Oil",
  description: "100 ml of Olive Oil.",
  price: "45",
  image: "prod_oliveoil.jpg",
},

{
  category_id: "5e626bc0ac649d001730563d",
  name: "Rock Salt",
  description: "100 grams of Rock Salt.",
  price: "2",
  image: "prod_rocksalt.jpg",
},

{
  category_id: "5e626bc0ac649d001730563d",
  name: "Iodized Salt",
  description: "100 grams of Iodized Salt.",
  price: "3",
  image: "prod_iodizedsalt.jpg",
},

{
  category_id: "5e626bc0ac649d001730563d",
  name: "Whole Black Pepper",
  description: "100 grams of Whole Black Pepper.",
  price: "50",
  image: "prod_wholeblackpepper.jpg",
},

{
  category_id: "5e626bc0ac649d001730563d",
  name: "Powdered Black Pepper",
  description: "100 grams of Powdered Black Pepper.",
  price: "50",
  image: "prod_powderedblackpepper.jpg",
},

{
  category_id: "5e626bc0ac649d001730563d",
  name: "Sugar",
  description: "100 grams of Sugar.",
  price: "10",
  image: "prod_sugar.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "Cheetos Crunchy Cheese",
  description: "100 grams of Cheetos Crunchy Cheese Flavored Snacks.",
  price: "75",
  image: "prod_cheetoscheese.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "Cheetos Crunchy Cheddar Jalapeno",
  description: "100 grams of Cheetos Crunchy Cheddar Jalapeno Flavored Snacks.",
  price: "75",
  image: "prod_cheetoscheddar.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "Cheetos Crunchy Cheddar Flaming Hot",
  description: "100 grams of Cheetos Crunchy Flaming Hot Flavored Snacks.",
  price: "75",
  image: "prod_cheetosflaming.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "Doritos Cool Ranch",
  description: "100 grams of Doritos Cool Ranch Flavor.",
  price: "75",
  image: "prod_doritoscool.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "Doritos Nacho Cheese Flavored Tortilla Chips",
  description: "100 grams of Doritos Nacho Cheese Flavored Tortilla Chips.",
  price: "75",
  image: "prod_doritoscheese.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "Jack 'N Jill Nova Country Cheddar",
  description: "100 grams of Jack 'N Jill Nova Country Cheddar.",
  price: "40",
  image: "prod_novacheddar.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "Jack 'N Jill Nova BBQ",
  description: "100 grams of Jack 'N Jill Nova BBQ.",
  price: "40",
  image: "prod_novabbq.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "Jack 'N Jill Piattos Cheese",
  description: "100 grams of Jack 'N Jill Piattos Cheese.",
  price: "40",
  image: "prod_piattoscheese.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "Jack 'N Jill Piattos Sour Cream and Onion",
  description: "100 grams of Jack 'N Jill Piattos Sour Cream and Onion.",
  price: "40",
  image: "prod_piattosourcream.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "Jack 'N Jill Vcut Potato Chips",
  description: "100 grams of Jack 'N Jill Vcut Potato Chips.",
  price: "40",
  image: "prod_vcut.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "M and M's Milk Chocolate",
  description: "50 grams of M and M's Milk Chocolate.",
  price: "40",
  image: "prod_mnmsmilk.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "M and M's Peanut Chocolate",
  description: "50 grams of M and M's MiPeanutlk Chocolate.",
  price: "40",
  image: "prod_mnmspeanut.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "Fox's Candy",
  description: "Fox's Candy.",
  price: "1",
  image: "prod_foxs.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "Fres Candy",
  description: "Fres Candy.",
  price: "1",
  image: "prod_fres.jpg",
},

{
  category_id: "5e626be5ac649d001730563e",
  name: "Maxx Candy",
  description: "Maxx Candy.",
  price: "1",
  image: "prod_maxx.jpg",
},

{
  category_id: "5e626c09ac649d001730563f",
  name: "Nestle Fresh Milk",
  description: "100 ml of Nestle Fresh Milk.",
  price: "10",
  image: "prod_nestlefreshmilk.jpg",
},

{
  category_id: "5e626c09ac649d001730563f",
  name: "Magnolia Fresh Milk",
  description: "100 ml of Magnolia Fresh Milk.",
  price: "10",
  image: "prod_magnoliafreshmilk.jpg",
},

{
  category_id: "5e626c09ac649d001730563f",
  name: "Cow Head Fresh Milk",
  description: "100 ml of Cow Head Fresh Milk.",
  price: "10",
  image: "prod_cowhead.jpg",
},

{
  category_id: "5e626c09ac649d001730563f",
  name: "Yakult",
  description: "100 ml of Yakult.",
  price: "10",
  image: "prod_yakult.jpg",
},

{
  category_id: "5e626c09ac649d001730563f",
  name: "Dairy Cream Margarine Butter Milk",
  description: "100 grams of Dairy Cream Margarine Butter Milk.",
  price: "30",
  image: "prod_dairycreambutter.jpg",
},

{
  category_id: "5e626c09ac649d001730563f",
  name: "Dairy Cream Margarine Classic",
  description: "100 grams of Dairy Cream Margarine Classic.",
  price: "30",
  image: "prod_dairycreamclassic.jpg",
},

{
  category_id: "5e626c09ac649d001730563f",
  name: "Eden Cheese",
  description: "100 grams of Eden Cheese.",
  price: "40",
  image: "prod_edencheese.jpg",
},

{
  category_id: "5e626c09ac649d001730563f",
  name: "Small Fresh Eggs",
  description: "Small Fresh Eggs.",
  price: "6",
  image: "prod_eggsm.jpg",
},

{
  category_id: "5e626c09ac649d001730563f",
  name: "Medium Fresh Eggs",
  description: "Medium Fresh Eggs.",
  price: "7",
  image: "prod_eggmd.jpg",
},

{
  category_id: "5e626c09ac649d001730563f",
  name: "Large Fresh Eggs",
  description: "Large Fresh Eggs.",
  price: "8",
  image: "prod_egglg.jpg",
},

{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Mason Jar Cozy Mermaid",
  description: "This mason jar cozy is your solution. This cotton cozy can be thrown in the backyard compost when it reaches the end of its usable life. When properly cared for, your cozy should last many years.",
  price: "200",
  image: "prod_masonmermaid.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Mason Jar Cozy Coral Reef",
  description: "This mason jar cozy is your solution. This cotton cozy can be thrown in the backyard compost when it reaches the end of its usable life. When properly cared for, your cozy should last many years.",
  price: "200",
  image: "prod_masoncoralreef.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Mason Jar Cozy Anemone",
  description: "This mason jar cozy is your solution. This cotton cozy can be thrown in the backyard compost when it reaches the end of its usable life. When properly cared for, your cozy should last many years.",
  price: "200",
  image: "prod_masonanemone.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Mason Jar Cozy Tidepool",
  description: "This mason jar cozy is your solution. This cotton cozy can be thrown in the backyard compost when it reaches the end of its usable life. When properly cared for, your cozy should last many years.",
  price: "200",
  image: "prod_masontidepool",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Mason Jar Cozy Lagoon",
  description: "This mason jar cozy is your solution. This cotton cozy can be thrown in the backyard compost when it reaches the end of its usable life. When properly cared for, your cozy should last many years.",
  price: "200",
image: "prod_masonlagoon.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Mason Jar Cozy Deep Sea",
  description: "This mason jar cozy is your solution. This cotton cozy can be thrown in the backyard compost when it reaches the end of its usable life. When properly cared for, your cozy should last many years.",
  price: "200",
  image: "prod_masondeepsea.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Mason Jar Cozy Seagrass",
  description: "This mason jar cozy is your solution. This cotton cozy can be thrown in the backyard compost when it reaches the end of its usable life. When properly cared for, your cozy should last many years.",
  price: "200",
  image: "prod_masonseagrass.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Bamboo Tootbrush Adult",
  description: "The original bamboo toothbrush. Crafted with certified organic, sustainable bamboo and vegan, bio-based bristles. Start your day sustainably.",
  price: "100",
  image: "prod_bambootoothbrush.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Bamboo Toothbrush Child",
  description: "The original bamboo toothbrush. Crafted with certified organic, sustainable bamboo and vegan, bio-based bristles. Start your day sustainably.",
  price: "80",
  image: "prod_bambootoothbrush.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Silk Dental Floss Blue Waves",
  description: "This refillable silk dental floss is our go-to solution to keep our teeth healthy and bright. The floss itself is silk coated in vegan candelilla wax, and is packaged in stunning glass and stainless steel canisters that can be continually refilled.",
  price: "200",
  image: "prod_silkbluewaves.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Silk Dental Floss Chevron",
  description: "This refillable silk dental floss is our go-to solution to keep our teeth healthy and bright. The floss itself is silk coated in vegan candelilla wax, and is packaged in stunning glass and stainless steel canisters that can be continually refilled.",
  price: "200",
  image: "prod_silkchevron",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Mug Rug Green",
  description: "With proper care, your mug rug should last many years, even decades. Eventually, when it reaches its last days, your mug rug can be composted.",
  price: "250",
  image: "prod_mugruggreen.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Mug Rug Bloom",
  description: "With proper care, your mug rug should last many years, even decades. Eventually, when it reaches its last days, your mug rug can be composted.",
  price: "250",
  image: "prod_mugrugbloom.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Mug Rug Winter",
  description: "With proper care, your mug rug should last many years, even decades. Eventually, when it reaches its last days, your mug rug can be composted.",
  price: "250",
  image: "prod_mugrugwinter.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Mug Rug Stars & Stripes",
  description: "With proper care, your mug rug should last many years, even decades. Eventually, when it reaches its last days, your mug rug can be composted.",
  price: "250",
  image: "prod_mugrugstars.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Recycled  Coconut Bowl",
  description: "Compostable and biodegradable, these eco-friendly bowl is made from coconut.",
  price: "50",
  image: "prod_coconutbowl.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Recycled  Bamboo Water Bottles",
  description: "Compostable and biodegradable, these eco-friendly bottle is made from Bamboo.",
  price: "50",
  image: "prod_bamboobottles.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Biodegradable Wooden Bowl",
  description: "Compostable and biodegradable, these eco-friendly plates and bowls are a perfect environmentally healthy alternative to other disposable tableware. Made from cleaned and steam-treated leaves our leaf plates have no chemicals, dyes, glue or wax! ",
  price: "60",
  image: "prod_biodegradablebowl.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Biodegradable Wooden Spoon",
  description: " Instead of getting boxes full of clear plastic cutlery that can hurt our ecosystem, invest in our wooden utensils that are 100% compostable.",
  price: "20",
  image: "prod_woodenspoon.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Biodegradable Wooden Fork",
  description: "These eco-friendly products aren’t just great for the kitchen. They make creating adorable home crafts a piece of cake!",
  price: "20",
  image: "prod_woodenfork.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Biodegradable Wooden Knife",
  description: "These eco-friendly products aren’t just great for the kitchen. They make creating adorable home crafts a piece of cake!",
  price: "20",
  image: "prod_woodenknife.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Biodegradable Plates",
  description: "erfect substitute for plastic and Styrofoam flatware. Wood Plates are Organic, Gluten Free, Biodegradable and Compostable, 100% Guaranteed to be sourced from Sustainable fast growing renewable plantation timber.",
  price: "100",
  image: "prod_biodegradableplates.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Biodegradable Cups",
  description: "Heat-resistant lids (180° F) made from Nature Works Ingo compostable plastic, derived from corn grown in the USA.",
  price: "5",
  image: "prod_biodegradablecup.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Biodegradable Stir Sticks",
  description: "Bamboo stirrers are stronger than traditional wooden coffee stirrers and won't bend as easily ",
  price: "1",
  image: "prod_stirsticks.jpg",
},
{
  category_id: "5e585e3fcbd1ba001710412c",
  name: "Recycled Wooden Bag",
  description: "Compostable and biodegradable, these eco-friendly bag is made from recycled woods.",
  price: "300",
  image: "prod_woodenbag.jpg",
},
{
  category_id: "5e626c2cac649d0017305640",
  name: "Domex Multi-Purpose Classic Blue",
  description: "100 ml of Domex Multi-Purpose Cleaner Classic Blue.",
  price: "20",
  image: "prod_domexclassic.jpg",
},

{
  category_id: "5e626c2cac649d0017305640",
  name: "Domex Multi-Purpose Lemon Fresh",
  description: "100 ml of Domex Multi-Purpose Cleaner Lemon Fresh.",
  price: "20",
  image: "prod_domexlemon.jpg",
},

{
  category_id: "5e626c2cac649d0017305640",
  name: "Scotch Brite Scrub Sponge",
  description: "Scotch Brite Heavy Duty Scrub Sponge.",
  price: "35",
  image: "prod_scotchbritesponge.jpg",
},

{
  category_id: "5e626c2cac649d0017305640",
  name: "Joy Dishwashing Liquid Lemon",
  description: "100 ml of Joy Dishwashing Liquid Lemon.",
  price: "25",
  image: "prod_joylemon.jpg",
},

{
  category_id: "5e626c2cac649d0017305640",
  name: "Joy Dishwashing Liquid Kalamansi",
  description: "100 ml of Joy Dishwashing Liquid Kalamansi.",
  price: "25",
  image: "prod_joykalamansi.jpg",
},

{
  category_id: "5e626c2cac649d0017305640",
  name: "Joy Dishwashing with Safeguard",
  description: "100 ml of Joy Dishwashing Liquid with Safeguard.",
  price: "25",
  image: "prod_joysafeguard.jpg",
},

{
  category_id: "5e626c2cac649d0017305640",
  name: "Zonrox Bleach",
  description: "100 ml of Zonrox Bleach.",
  price: "10",
  image: "prod_zonrox.jpg",
},

{
  category_id: "5e626c2cac649d0017305640",
  name: "Zonrox Color Safe Bleach",
  description: "100 ml of Zonrox Color Safe Bleach.",
  price: "10",
  image: "prod_zonroxcolor.jpg",
},

{
  category_id: "5e626c2cac649d0017305640",
  name: "Ariel Instashine Powder",
  description: "100 grams of Ariel Instashine Powder Detergent Fresh Clean.",
  price: "25",
  image: "prod_ariel.jpg",
},

{
  category_id: "5e626c2cac649d0017305640",
  name: "Downy Fabric Conditioner",
  description: "100 grams of Downy Fabric Conditioner.",
  price: "20",
  image: "prod_downy.jpg",
},

{
  category_id: "5e626c56ac649d0017305641",
  name: "EcoCarePH Toothpaste Tablet",
  description: "Eco-friendly Toothpaste in Tablet.",
  price: "2",
  image: "prod_toothpaste.jpg",
},

{
  category_id: "5e626c56ac649d0017305641",
  name: "Bamboo Toothbrush",
  description: "Eco-friendly Bamboo Toothbrush.",
  price: "50",
  image: "prod_toothbrush.jpg",
},

{
  category_id: "5e626c56ac649d0017305641",
  name: "Colgate Mouthwash",
  description: "100 ml of Colgate Mouthwash.",
  price: "25",
  image: "prod_mouthwash.jpg",
},

{
  category_id: "5e626c56ac649d0017305641",
  name: "Green Cross Body Soap",
  description: "Green Cross Body Soap.",
  price: "30",
  image: "prod_greencrosssoap.jpg",
},

{
  category_id: "5e626c56ac649d0017305641",
  name: "Bioderm Body Soap",
  description: "Bioderm Body Soap.",
  price: "30",
  image: "prod_biodermsoap.jpg",
},

{
  category_id: "5e626c56ac649d0017305641",
  name: "Safeguard Body Soap",
  description: "Safeguard Body Soap.",
  price: "30",
  image: "prod_safguardsoap.jpg",
},

{
  category_id: "5e626c56ac649d0017305641",
  name: "Dove Bath Soap",
  description: "Dove Bath Soap.",
  price: "65",
  image: "prod_dovesoap.jpg",
},

{
  category_id: "5e626c56ac649d0017305641",
  name: "Dove Men Bath Soap",
  description: "Dove Men Bath Soap.",
  price: "65",
  image: "prod_dovemensoap.jpg",
},

{
  category_id: "5e626c56ac649d0017305641",
  name: "Tawas Powder",
  description: "50 grams of Tawas Powder.",
  price: "15",
  image: "prod_tawaspowder.jpg",
},

{
  category_id: "5e626c56ac649d0017305641",
  name: "Hair Shampoo",
  description: "50 ml of Hair Shampoo.",
  price: "30",
  image: "prod_hairshampoo.jpg",
},

{
  category_id: "5e626c56ac649d0017305641",
  name: "Hair Conditioner",
  description: "50 ml of Hair Conditioner.",
  price: "30",
  image: "prod_hairconditioner.jpg",
},

{
  category_id: "5e626c77ac649d0017305642",
  name: "Real Green Supplement Powder",
  description: "Contains 10 Pieces x 4grams of Real green supplement powder.",
  price: "500",
  image: "prod_realgreensupplement.jpg",
},
{
  category_id: "5e626c77ac649d0017305642",
  name: "Centrum Silver Multi-Vitamin for Adults",
  description: "Contains 200 pieces of Centrum Silver Multi-Vitamin for Adults",
  price: "300",
  image: "prod_centrum.jpg",
},
{
  category_id: "5e626c77ac649d0017305642",
  name: "Little Critters Gummy Bites Multi Vitamins",
  description: "Contains 100 pieces of Gummy Bites Multi Vitamins",
  price: "200",
  image: "prod_gummybites.jpg",
},
{
  category_id: "5e626c77ac649d0017305642",
  name: "Nature Made Fish Oil",
  description: "Contains 100 pieces of Nature Made fish oil",
  price: "600",
  image: "prod_naturemadefishoil.jpg",
},
{
  category_id: "5e626c77ac649d0017305642",
  name: "Scott's Vitamin C ",
  description: "Contains 100 grams of Scott's Vitamin C Mixed Berries Flavour Pastilles",
  price: "204",
  image: "prod_scottvitamin.jpg",
},
{
  category_id: "5e626c77ac649d0017305642",
  name: "Webber Naturals L-Lysine Food Supplement",
  description: "Contains 60 pieces of Webber Naturals L-Lysine Food Supplement",
  price: "700",
  image: "prod_webbernatural",
}
 ];

  Product.insertMany(products, (err,data)=>{
    if (err) throw err;
    res.json(data);
  })
})




// Update Product by ID
router.put('/:id', urlEncoded, (req,res) => {
    Product.updateOne({_id: req.params.id}, {
        category_id: req.body.category_id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image:  req.body.image,
        quantity: req.body.quantity,
        pzwpoints_req: req.body.pzwpoints_req,
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
