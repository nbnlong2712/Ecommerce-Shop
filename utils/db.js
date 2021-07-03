const mysql = require('mysql');
const config = require('../config/default.json')

const pool = mysql.createPool(config.mysql);

module.exports = {
    load: function (sql) {
        return new Promise(function (resolve, reject) {
            pool.query(sql, function (err, result, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            })
        })
    }
}