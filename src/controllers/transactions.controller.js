const db = require("../configs/postgre");

const transactionsModel = require("../models/transactions.model");

const createTransactions = async (req, res) => {
  const { authInfo, body } = req;
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const result = await transactionsModel.createHistories(
      client,
      body,
      authInfo.id
    );
    const transactionId = result.rows[0].id;
    await transactionsModel.createDetailTransaction(
      client,
      body,
      transactionId
    );
    await client.query("COMMIT");
    const historyWithDetails = await transactionsModel.getTransactions(
      client,
      transactionId
    );
    client.release();
    res.status(201).json({
      msg: "Add Transactions Success...",
      data: historyWithDetails.rows,
    });
  } catch (err) {
    console.log(err);
    await client.query("ROLLBACK");
    client.release();
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const { authInfo } = req;
    const result = await transactionsModel.getHistories(authInfo);
    res.status(200).json({
      data: result.rows,
    });
    // const result = await transactionsModel.getHistory(authInfo);
    // const hasil = result.rows.reduce((acc, current) => {
    //   const item = acc.find((item) => item.history_id === current.history_id);
    //   if (!item) {
    //     acc.push({
    //       history_id: current.history_id,
    //       display_name: current.display_name,
    //       notes: current.notes,
    //       products: [
    //         {
    //           product_id: current.product_id,
    //           prod_name: current.prod_name,
    //           price: current.price,
    //           size: current.size,
    //           cost: current.cost,
    //           qty: current.qty,
    //           subtotal: current.subtotal,
    //           promo_id: current.promo_id,
    //           coupon_code: current.coupon_code,
    //           discount: current.discount,
    //           delivery: current.delivery,
    //           shipping_price: current.shipping_price,
    //           payments: current.payments,
    //           status: current.status,
    //         },
    //       ],
    //     });
    //   } else {
    //     item.products.push({
    //       product_id: current.product_id,
    //       prod_name: current.prod_name,
    //       price: current.price,
    //       size: current.size,
    //       cost: current.cost,
    //       qty: current.qty,
    //       subtotal: current.subtotal,
    //       promo_id: current.promo_id,
    //       coupon_code: current.coupon_code,
    //       discount: current.discount,
    //       delivery: current.delivery,
    //       shipping_price: current.shipping_price,
    //       payments: current.payments,
    //       status: current.status,
    //     });
    //   }
    //   return acc;
    // }, []);

    // res.status(201).json({
    //   data: hasil,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const result = await transactionsModel.getAllOrder();
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};

const getDoneOrders = async (req, res) => {
  try {
    const result = await transactionsModel.getDoneOrder();
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};

const changeStatusOrders = async (req, res) => {
  try {
    const result = await transactionsModel.changeStatusOrder(req.params);
    res.status(200).json({
      msg: "Update Success",
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};

const deleteTransaction = async (req, res) => {
  const client = await db.connect();
  try {
    client.query("BEGIN");
    const result = await transactionsModel.deleteHistory(client, req);
    if (result.rowCount === 0) {
      res.status(404).json({
        msg: "Data Not Found...",
      });
      return;
    }
    client.query("COMMIT");
//     const resultAll = await transactionsModel.deleteTransaction(client, req);
//     if (resultAll.rowCount === 0) {
//       res.status(404).json({
//         msg: "Data Not Found...",
//       });
//       return;
//     }
    client.release();
    res.status(200).json({
      msg: "Delete Success...",
    });
  } catch (err) {
    console.log(err);
    client.query("ROLLBACK");
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};

module.exports = {
  createTransactions,
  getHistory,
  getAllOrders,
  getDoneOrders,
  changeStatusOrders,
  deleteTransaction,
};
