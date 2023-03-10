const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../configs/postgre");

const authModel = require("../models/auth.model");
const { jwtSecret } = require("../configs/environment");

const register = async (req, res) => {
    const client = await db.connect();
    try {
        const { email, password, phone } = req.body;
        const result = await authModel.userVerification(email);
        if(result.rows.length > 1) {
            res.status(401).json({
                msg: "Email Already Registered..."
            });
            return;
        }
        await client.query("BEGIN");
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = { email, hashedPassword, phone };
        const createAccount = await authModel.createAccount(data);
        const subId = createAccount.rows[0].id;
        console.log(subId);
        await authModel.createSubAccount(subId, email);
        res.status(201).json({
            msg: "Create Account Success...",
            data: createAccount.rows,
        });
    } catch(err) {
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
        if(result.rows.length < 1) {
            res.status(401).json({
                msg: "Email / Password Salah..",
            });
            return;
        }
        const { id, email, password } = result.rows[0];
        const isPassValid = await bcrypt.compare(body.password, password);
        if(result.rows.length < 1 || !isPassValid) {
            res.status(401).json({
                msg: "Email / Password Salah..",
            });
            return;
        }
        const dataUser = { id, email };
        const jwtOptions = { expiresIn: "5m" };
        jwt.sign(dataUser, jwtSecret, jwtOptions, (err, token) => {
            if(err) throw token;
            res.status(200).json({
                msg: "Welcome...",
                token,
            });
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error...",
        });
    }
};

const privateAccess = (req, res) => {
    const { id, email } = req.authInfo;
    res.status(200).json({
        payload: { id, email },
        msg: "OK",
    });
};

const editPassword = async (req, res) => {
    const { authInfo, body } = req;
    console.log(authInfo.id);
    try {
        const result = await authModel.getPassword(authInfo.id);
        const passFromDb = result.rows[0].password;
        if(body.oldPassword !== passFromDb) return res.status(403).json({
            msg: "Old Password Wrong.!",
        });
        const hashedPassword = await bcrypt.hash(body.newPassword, 10);
        await authModel.editPassword(hashedPassword, authInfo.id);
        res.status(200).json({
            msg: "Edit Password Success",
        });
    } catch(err) {
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
        if(checkEmail.rows.length > 1) {
            res.status(401).json({
                msg: "Email Not Register..."
            });
        }
        const userId = checkEmail.rows[0].id;
        const randomChars = "0123456789qwertyuiopASDFGHJKL";
        let otpCode = "";
        for (let i = 0; i < 5; i++) {
            otpCode += randomChars[Math.floor(Math.random() * randomChars.length)];
        }
        const result = await authModel.forgotPass(userId, otpCode);
        res.status(200).json({
            msg: "Created OPT Code...",
            data: result.rows,
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error...",
        })
    }
};

module.exports = {
    register,
    login,
    privateAccess,
    editPassword,
    forgotPass,
};