const express = require('express')
const router = express.Router();

//vào controller, ko cần viết đầy đủ link, chỉ cần viết phần sau của link, 
//còn phần chung sẽ khai báo ở app.js

router.get('/', (req, res) => {
    const list = [
        { CatID: 1, CatName: 'ha' },
        { CatID: 2, CatName: 'haha' },
        { CatID: 3, CatName: 'hahaha' },
        { CatID: 4, CatName: 'hahaha' },
        { CatID: 5, CatName: 'haha' },
        { CatID: 6, CatName: 'ha' },
    ];
    res.render('vwCategories/list', {
        list: list,
        empty: list.length === 0
    })
});

router.get('/add', (req, res) => {
    res.render('vwCategories/add');
})

module.exports = router;

