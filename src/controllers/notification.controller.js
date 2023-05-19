const notification = require("../utils/notification");

const userModels = require("../models/auth.model");

const notificationOrder = async (req, res) => {
  const { body } = req;
  // notification
  //   .send(body.token, {
  //     title: "Horrai..",
  //     body: "Your order has ben accepted by admin",
  //   })
  //   .then(() =>
  //     res.status(200).json({
  //       msg: "OK",
  //     })
  //   )
  //   .catch((err) => console.log(err));
  try {
    const result = await userModels.getUser(body.user_id);
    await notification.send(result.rows[0].token_fcm, {
      title: "Horrai..",
      body: "Your order has ben accepted by admin",
    });
    res.status(200).json({
      msg: "Send notification success",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};

module.exports = {
  notificationOrder,
};
