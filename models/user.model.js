const db = require('../utils/db')

const TABLE_USER = 'Users_clc';

module.exports = {
    all() {
        return db.load(`select * from ${TABLE_USER}`);
    },

    single(id) {
        return db.load(`select * from ${TABLE_USER} where id = ${id}`);
    },

    async singleByUserName(username) {
        const rows = await db.load(`select * from ${TABLE_USER} where userName = '${username}'`);
        if (rows.length === 0)
            return null;
        return rows[0];
    },

    add(entity) {
        return db.add(TABLE_USER, entity);
    },

    patch(entity) {
        const condition = {
            id: entity.id
        }

        delete entity.id;
        return db.patch(TABLE_USER, entity, condition);
    },

    delete(id) {
        const condition = { id: id }

        return db.delete(TABLE_USER, condition);
    }
}