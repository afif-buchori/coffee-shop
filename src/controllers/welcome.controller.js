const welcomePage = (req, res) => {
    res.json({
        msg: "Welcome Coffee Shop",
    });
};

module.exports = {
    welcomePage,
};