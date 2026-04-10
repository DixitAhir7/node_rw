const User = require("../model/User");

const verifyrole = (role) => async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (user.role !== role) {
        return res.fail(403, 'you are not allowed')
    };

    next();
};

module.exports = verifyrole;