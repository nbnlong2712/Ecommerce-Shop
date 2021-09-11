const express = require('express')
const moment = require('moment')
const bcrypt = require('bcryptjs')
const userModel = require('../models/user.model')
const router = express.Router();


router.get('/login', async function (req, res) {
    res.render('vwAccount/login', {
        layout: false
    })
})

router.post('/login', async function (req, res) {
    const user = await userModel.singleByUserName(req.body.userName);
    if (user === null) {
        return res.render('vwAccount/login', {
            layout: false,
            err: 'Invalid username or password'
        })
    }
    const rs = bcrypt.compareSync(req.body.password, user.password_hash);
    if (rs === false) {
        return res.render('vwAccount/login', {
            layout: false,
            err: 'Invalid username or password'
        })
    }

    delete user.password_hash;  //xóa password trước khi lưu vào authUser vì nếu không, password sẽ bị lộ trên cookie và bị hack rất dễ
    req.session.isAuthenticated = true;
    req.session.authUser = user;

    res.redirect('/account/profile');
})

const restrict = require('../middlewares/auth.mdw')

router.post('/logout', restrict, function (req, res) {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
})

router.get('/register', function (req, res) {
    res.render('vwAccount/register')
})

router.post('/register', async function (req, res) {
    const dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const password_hash = bcrypt.hashSync(req.body.password, 8);
    const entity = {
        username: req.body.userName,
        password_hash,
        name: req.body.name,
        email: req.body.email,
        dob,
        permission: 0,
    }

    await userModel.add(entity);
    res.render('vwAccount/register')
})

//restrict nằm giữa nên restrict là middleware, nếu user chưa đăng nhập mà muốn 
//gõ link tới profile sẽ bị middleware này chặn lại và chuyển hướng tới trang Login
router.get('/profile', restrict, function (req, res) {
    res.render('vwAccount/profile')
})

module.exports = router;