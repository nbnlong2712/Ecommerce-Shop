const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');
const numeral = require('numeral')
const config = require('../config/default.json');

router.get('/byCat/:CatID', async (req, res) => {

    for (const c of res.locals.lcCategories) {
        if (c.CatID === +req.params.CatID) {
            c.isActive = true;   //tham số isActive cũng sẽ sử dụng được trong view mà router này render đến, dùng handlebars để gọi
        }
    }

    const limit = config.pagination.limit;

    const page = +req.query.page || 1;
    if (page < 0) page = 1;

    const total = await productModel.countByCat(req.params.CatID);
    const nPages = Math.ceil(total / limit);
    const page_items = [];
    for (let i = 1; i <= nPages; i++) {
        const item = {
            value: i,
            isActive: i === page
        }
        page_items.push(item);
    }

    const offset = (page - 1) * limit;
    const rows = await productModel.pageByCat(req.params.CatID, limit, offset);
    rows.map(function (p) {
        p.f_Price = numeral(p.Price).format('0,0') + " đ"
    })

    res.render('vwProducts/byCat', {
        list: rows,
        empty: rows.length === 0,
        page_items,
        prev_value: page - 1,
        next_value: page + 1,
        can_go_prev: page > 1,
        can_go_next: page < nPages
    })
})

router.get('/add', async (req, res) => {
    res.render('vwProducts/add')
})

module.exports = router;