const db = require('../utils/db')

const TABLE_PRODUCT = 'Product';

module.exports = {
    all() {
        return db.load(`select*from ${TABLE_PRODUCT}`)
    },

    allByCat(CatID) {
        return db.load(`select*from ${TABLE_PRODUCT} where CatID = ${CatID}`);
    },

    //Phân trang
    pageByCat(CatID, limit, offset) {
        return db.load(`select * from ${TABLE_PRODUCT} where CatID = ${CatID} limit ${limit} offset ${offset}`);
    },

    async countByCat(CatID) {
        const rows = await db.load(`select count(*) as total from ${TABLE_PRODUCT} where CatID = ${CatID}`);
        return rows[0].total;
    }
}