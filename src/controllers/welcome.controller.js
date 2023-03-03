const welcomePage = (req, res) => {
    res.json({
        msg: "Welcome Coffee Shop by M. Afif Buchori",
    });
};

module.exports = {
    welcomePage,
};