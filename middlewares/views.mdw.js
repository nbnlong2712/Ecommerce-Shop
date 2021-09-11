const exphbs = require('express-handlebars')
const exphbs_sections = require('express-handlebars-sections')

module.exports = function (app) {
    app.engine('hbs', exphbs({
        helpers: {
            section: exphbs_sections()
        }
    }));
    app.set('view engine', 'hbs');
}