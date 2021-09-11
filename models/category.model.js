const db = require('../utils/db')

const TABLE_CATEGORY = 'category';

module.exports = {
    all() {
        return db.load(`select * from ${TABLE_CATEGORY}`);
    },

    allWithDetails() {
        return db.load(`select c.*, count(p.ProID) as num_of_products
        from ${TABLE_CATEGORY} c left join Product p on c.CatID = p.CatID
        group by c.CatID, c.CatName`);
    },

    single(id) {
        return db.load(`select * from ${TABLE_CATEGORY} where CatID = ${id}`);
    },

    add(entity) {
        return db.add(TABLE_CATEGORY, entity);
    },

    patch(entity) {
        const condition = {
            CatID: entity.CatID
        }

        delete entity.CatID;
        return db.patch(TABLE_CATEGORY, entity, condition);
    },

    delete(id) {
        const condition = {
            CatID: id
        }

        return db.delete(TABLE_CATEGORY, condition);
    }
}