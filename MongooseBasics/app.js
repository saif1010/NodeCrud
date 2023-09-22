const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const Product = require('./Models/products');
mongoose.connect('mongodb://localhost:27017/farmStand').then(()=>{
    console.log("connected to Database")
}).catch((e)=>{
    console.log("Error connecting to database")
    console.log(e)
});

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

const categories = ['fruit','vegetable','dairy'];

app.get('/product/new', (req, res) => {
    res.render('products/new',{categories})
});

app.get('/product', async(req,res)=>{
    
    const products = await Product.find({})
    res.render('products/index',{products})
})

app.post('/product',(req,res)=>{
    const newProduct = new Product(req.body);
    newProduct.save();
    res.redirect('/product')
})

app.get('/product/:id', async (req,res)=>{
    
    const {id} = req.params;
    const productById = await Product.findById(id);
    res.render('products/show',{productById})
})
app.get('/product/:id/edit', async(req, res) => {
    const {id} = req.params; 
    const product = await Product.findById(id);
    res.render('products/edit',{product, categories})
});

app.put('/product/:id', async(req,res)=>{

    const {id} = req.params; 
    const updatedProduct = await Product.findByIdAndUpdate(id,req.body,{runValidators:true, new:true})
    res.redirect(`/product/${updatedProduct._id}`)
})

app.delete('/product/:id', async(req,res)=>{

    const {id} = req.params; 
    const updatedProduct = await Product.findByIdAndDelete(id)
    res.redirect(`/product`)
})

app.listen(8080,()=>{
    console.log('Listening on port 8080');
})

