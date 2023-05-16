const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../configs/postgre");

const authModel = require("../models/auth.model");
const { jwtSecret } = require("../configs/environment");

const { uploader } = require("../utils/cloudinary");

const register = async (req, res) => {
  const client = await db.connect();
  try {
    const { email, password, phone } = req.body;
    const result = await authModel.userVerification(email);
    console.log(result.rows.length);
    if (result.rows.length == 1) {
      res.status(401).json({
        msg: "Email Already Registered...",
      });
      return;
    }
    await client.query("BEGIN");
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = { email, hashedPassword, phone };
    const createAccount = await authModel.createAccount(client, data);
    const subId = createAccount.rows[0].id;
    await authModel.createSubAccount(client, subId, email);
    await client.query("COMMIT");
    res.status(201).json({
      msg: "Create Account Success...",
      data: createAccount.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  } finally {
    client.release();
  }
};

const login = async (req, res) => {
  try {
    const { body } = req;
    const result = await authModel.userVerification(body.email);
    if (result.rows.length < 1) {
      res.status(401).json({
        msg: "Email / Password Salah..",
      });
      return;
    }
    const {
      id,
      display_name,
      email,
      password,
      role_id,
      profile_picture,
      phone,
      address,
    } = result.rows[0];
    const isPassValid = await bcrypt.compare(body.password, password);
    if (result.rows.length < 1 || !isPassValid) {
      res.status(401).json({
        msg: "Email / Password Salah..",
      });
      return;
    }
    const dataUser = {
      id,
      display_name,
      email,
      role_id,
      profile_picture,
      phone,
      address,
    };
    const expIn = 60;
    const jwtOptions = { expiresIn: `${expIn}m` };
    console.log(jwtOptions);
    jwt.sign(dataUser, jwtSecret, jwtOptions, (err, token) => {
      if (err) throw token;
      // await authModel.createToken(id, expIn, token);
      res.status(200).json({
        msg: "Welcome...",
        token,
        dataUser,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};

const privateAccess = (req, res) => {
  const { id, email, role_id } = req.authInfo;
  console.log(req.authInfo);
  res.status(200).json({
    payload: { id, email, role_id },
    msg: "OK",
  });
};

const editPassword = async (req, res) => {
  try {
    const { authInfo, body } = req;
    console.log(authInfo.id);
    const result = await authModel.getPassword(authInfo.id);
    const passFromDb = result.rows[0].password;
    const isPassValid = await bcrypt.compare(body.oldPassword, passFromDb);
    console.log(isPassValid);
    if (!isPassValid)
      return res.status(403).json({
        msg: "Old Password Wrong.!",
      });
    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    await authModel.editPassword(hashedPassword, authInfo.id);
    res.status(200).json({
      msg: "Edit Password Success...",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};

const forgotPass = async (req, res) => {
  try {
    const { body } = req;
    const checkEmail = await authModel.getAccount(body.email);
    if (checkEmail.rows.length > 1) {
      res.status(401).json({
        msg: "Email Not Register...",
      });
    }
    const userId = checkEmail.rows[0].id;
    const randomChars = "0123456789qwertyuiopASDFGHJKLzXcVbNm";
    let otpCode = "";
    for (let i = 0; i < 5; i++) {
      otpCode += randomChars[Math.floor(Math.random() * randomChars.length)];
    }
    const result = await authModel.forgotPass(userId, otpCode);
    console.log("CODE OTP : ", result.rows[0].code_otp);
    res.status(200).json({
      msg: "Created OTP Code...",
      data: result.rows[0].code_otp,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};

const editPassbyForgot = async (req, res) => {
  try {
    const { body } = req;
    const checkOtp = await authModel.getUserbyForgot(body);
    if (checkOtp.rows.length < 1) {
      res.status(403).json({
        msg: "Kode OTP Wrong.!",
      });
      return;
    }
    const userId = checkOtp.rows[0].id;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    await authModel.editPassword(hashedPassword, userId);
    console.log("OK sekarang sudah selesai");
    res.status(200).json({
      msg: "Password Updated...",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};

const editProfile = async (req, res) => {
  const client = await db.connect();
  try {
    if (req.body.email || req.body.phone) {
      await authModel.editUser(client, req);
    }
    await client.query("BEGIN");
    let fileLink = "";
    console.log(req.file);
    if (req.file) {
      const fileName = req.authInfo.id;
      const upCloud = await uploader(req, "user", fileName);
      fileLink = upCloud.data.secure_url;
    }
    const resultUserBio = await authModel.editUserBio(client, req, fileLink);
    await client.query("COMMIT");
    res.status(200).json({
      msg: "Update Success...",
      data: resultUserBio.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  } finally {
    client.release();
  }
};

const logout = async (req, res) => {
  try {
    console.log(req.authInfo);
    await authModel.logout(req.authInfo.id);
    res.status(200).json({
      msg: "You Have Been Logout...",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};

module.exports = {
  register,
  login,
  privateAccess,
  editPassword,
  forgotPass,
  editPassbyForgot,
  editProfile,
  logout,
};
