const express = require('express')
const router = express.Router();
const categoryModel = require('../models/category.model')
//vào controller, ko cần viết đầy đủ link, chỉ cần viết phần sau của link, 
//còn phần chung sẽ khai báo ở app.js

router.get('/', async (req, res) => {

    const rows = await categoryModel.all();

    res.render('vwCategories/list', {
        list: rows,
        empty: rows.length === 0
    })
});

router.get('/add', (req, res) => {
    res.render('vwCategories/add');
})

module.exports = router;

