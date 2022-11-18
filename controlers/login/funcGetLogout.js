const { User } = require("../../models/user");

const funcGetLogout = async (req, res) => {
    const { _id, name } = req.user;
    console.log(name);
    await User.findByIdAndUpdate(_id, { token: null }); // сохраняем токен в базу
    return  res.status(204).json();
};

module.exports = funcGetLogout; 