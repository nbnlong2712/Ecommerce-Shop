const express = require('express');
const exphbs = require('express-handlebars')

const app = express();

app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
})

app.use('/admin/categories', require('./controllers/category.route'));

const PORT = 4000;
app.listen(PORT, (req, res) => {
    console.log(`Running on http://localhost:${PORT}`);
})

