const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');

router.get('/', async (req, res) => {
    const rows = await productModel.all();

    res.render('vwProducts/list', {
        list: rows,
        empty: rows.length === 0
    })
})

router.get('/add', async (req, res) => {
    res.render('vwProducts/add')
})

module.exports = router;