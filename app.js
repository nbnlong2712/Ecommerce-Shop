const express = require('express');

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use('/public', express.static('public'));  //khai báo thư mục tĩnh

require('./middlewares/sessions.mdw')(app);
require('./middlewares/views.mdw')(app);
require('./middlewares/locals.mdw')(app);

app.get('/', (req, res) => {
    res.render('home');
})
app.use('/account', require('./controllers/account.route'));
app.use('/admin/categories', require('./controllers/category.route'));
app.use('/admin/products', require('./controllers/product.route'))

app.use('/products', require('./controllers/_product.route'));


app.get('/err', (req, res) => {
    throw new Error('beng beng');
})

app.use((req, res) => {
    res.render('404', { layout: false })
})

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).render('500', { layout: false });
})

const PORT = 4000;
app.listen(PORT, function () {
    console.log(`Running on http://localhost:${PORT}`);
})

