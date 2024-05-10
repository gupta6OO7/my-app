const express = require('express');
const router = express.Router()

const Product = require('../models/Product');

router.post('/addProduct', async (req, res) => {
    try {
        
        await Product.create({
            Name: req.body.name,
            Price: req.body.price,
            Featured: req.body.featured,
            Rating: req.body.rating,
            Created_At: req.body.created_at,
            Company: req.body.company
        })

        res.json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

router.get('/getAllProducts', async (req, res) => {
    try {
        const all_products = await Product.find({});
        res.send({ success: true, data: all_products });
    }
    catch (error) {
        console.log(error);
    }
})

router.post('/updateProduct', async (req, res) => {
    try {

        await Product.findByIdAndUpdate(req.body.productId, {
            Name: req.body.name,
            Price: req.body.price,
            Featured: req.body.featured,
            Rating: req.body.rating,
            Created_At: req.body.created_at,
            Company: req.body.company
        })

        res.json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

router.post('/deleteProduct', async (req, res) => {
    try {

        await Product.findByIdAndDelete(req.body.productId);

        res.json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

router.get('/getFeaturedProducts', async (req, res) => {
    try {
        const all_products = await Product.find({ Featured: true });
        res.send({ success: true, data: all_products });
    }
    catch (error) {
        console.log(error);
    }
})

router.post('/priceConstraint', async (req, res) => {
    try {

        let all_products = await Product.find({ Price: { $lt: req.body.price } });

        res.json({ success: true, data: all_products });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

router.post('/ratingConstraint', async (req, res) => {
    try {

        let all_products = await Product.find({ Rating: { $gt: req.body.rating } });

        res.json({ success: true, data: all_products });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

module.exports = router; 