// const db = require("../configs/postgre");

const createHistories = async (client, body, userId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "INSERT INTO history (user_id, promo_id, delivery_id, payment_id, notes, pay_status_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id";
        const values = [userId, body.promo_id, body.delivery_id, body.payment_id, body.notes, body.pay_status_id];
        client.query(sqlQuery, values, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

const createDetailTransaction = (client, body, transactionId) => {
    return new Promise((resolve, reject) => {
        const { products } = body;
        let sqlQuery = "INSERT INTO transactions (history_id, product_id, size_id, qty, subtotal) VALUES ";
        let values = [];
        products.forEach((product, idx) => {
            if(values.length) sqlQuery += ", ";
            const { product_id, size_id, qty, subtotal } = product;
            sqlQuery += `($${1 + 5 * idx}, $${2 + 5 * idx}, $${3 + 5 * idx}, $${4 + 5 * idx}, $${5 + 5 * idx})`;
            values.push(transactionId, product_id, size_id, qty, subtotal);
        });
        console.log(sqlQuery);
        client.query(sqlQuery, values, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

const getTransactions = (client, transactionId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT t.history_id, ub.display_name , h.notes, 
        t.product_id, p.prod_name, p.price, ps."size", ps."cost", t.qty, t.subtotal, 
        h.promo_id, pr.coupon_code, pr.discount, d."method" as delivery, d.shipping_price, 
        py."method" as payments, sp.status 
        FROM transactions t 
        JOIN History h ON h.id = t.history_id 
        JOIN products p ON p.id = t.product_id 
        JOIN prod_sizes ps ON ps.id = t.size_id 
        JOIN users u ON u.id = h.user_id 
        JOIN user_bio ub ON ub.user_id = u.id 
        JOIN payments py ON py.id = h.payment_id 
        JOIN promo pr ON pr.id = h.promo_id 
        JOIN deliveries d ON d.id = h.delivery_id  
        JOIN pay_status sp ON h.pay_status_id = sp.id 
        WHERE h.id = $1`;
        client.query(sqlQuery, [transactionId], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

module.exports = {
    createHistories,
    createDetailTransaction,
    getTransactions,
};