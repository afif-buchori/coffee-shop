const { Messaging } = require("firebase-admin/messaging");
const app = require("../configs/firebase");

const Notification = new Messaging(app);

const send = async (token, notification) => {
  try {
    const message = {
      token,
      notification,
    };
    const notif = await Notification.send(message);
    console.log(notif);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  send,
};
