const express = require('express')
const router = express.Router();
const categoryModel = require('../models/category.model');
const { route } = require('./product.route');
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

router.post('/add', async (req, res) => {
    const entity = {
        CatName: req.body.txtCatName  //txtCatName chính là tên của input trong file add.hbs
    };
    await categoryModel.add(entity);
    res.render('vwCategories/add');
})

router.get('/edit', async (req, res) => {
    // query trên url
    const id = +req.query.id || -1;  //muốn biết tại sao dùng được như này thì tìm hiểu query string và nhìn lại đường link của mỗi edit (...edit?id={{CatID}})
    const rows = await categoryModel.single(id);
    if (rows.length === 0)
        return res.send('Invalid');

    const c = rows[0];
    res.render('vwCategories/edit', {
        category: c
    });
})

router.post('/delete', async (req, res) => {
    await categoryModel.delete(req.body.CatID);
    res.redirect('/admin/categories');
})

router.post('/update', async (req, res) => {
    await categoryModel.patch(req.body);
    res.redirect('/admin/categories')
})

module.exports = router;

