const db = require("../configs/postgre");

const transactionsModel = require("../models/transactions.model");

const createTransactions = async (req, res) => {
    const { authInfo, body } = req;
    // console.log(req);
    // res.status(200).json({
    //     ...body,
    // });
    const client = await db.connect();
    try {
        await client.query("BEGIN");
        const result = await transactionsModel.createHistories(client, body, authInfo.id);
        const transactionId = result.rows[0].id;
        await transactionsModel.createDetailTransaction(client, body, transactionId);
        await client.query("COMMIT");
        const historyWithDetails = await transactionsModel.getTransactions(client, transactionId);
        client.release();
        res.status(201).json({
            msg: "Add Transactions Success...",
            data: historyWithDetails.rows,
        });
    } catch(err) {
        console.log(err);
        await client.query("ROLLBACK");
        client.release();
        res.status(500).json({
            msg: "Internal Server Error...",
        });
    }
};

module.exports = {
    createTransactions,
};