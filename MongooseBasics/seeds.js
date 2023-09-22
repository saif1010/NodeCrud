const mongoose = require('mongoose');
const Product = require('./Models/products');
mongoose.connect('mongodb://localhost:27017/farmStand').then(()=>{
    console.log("connected to Database")
}).catch((e)=>{
    console.log("Error connecting to database")
    console.log(e)
});


const seedProducts = [{
    name:'Fairy Eggplant',
    price:1.00,
    category:'vegetable'
},
{
    name:'Organic Goddess Melon',
    price:4.99,
    category:'fruit'
},
{
    name:"Mango",
    price:0.99,
    category:'fruit'
},
{
    name:'Organic Mini Seedless Watermelon',
    price:3.99,
    category:'fruit'
},
{
    name:'Organic Celery',
    price:1.50,
    category:'vegetable'
},
{
    name:'Organic Carrot',
    price:1.09,
    category:'vegetable'
},
{
    name:'Chocolate Whole Milk',
    price:2.69,
    category:'dairy'
}
]

Product.insertMany(seedProducts).then(res=>{
  
    console.log(res)
}).catch((e)=>{
    console.log("Error")
    console.log(e)
})



