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
    },

    add: function (table, entity) {
        return new Promise(function (resolve, reject) {
            const sql = `insert into ${table} set ?`;
            pool.query(sql, entity, function (err, result) {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            })
        })
    },

    patch: function (table, entity, condition) {
        return new Promise(function (resolve, reject) {
            const sql = `update ${table} set ? where ?`;
            pool.query(sql, [entity, condition], function (err, result) {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            })
        })
    },

    delete: function (table, condition) {
        return new Promise(function (resolve, reject) {
            const sql = `delete from ${table} where ?`;
            pool.query(sql, condition, function (err, result) {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            })
        })
    }
}