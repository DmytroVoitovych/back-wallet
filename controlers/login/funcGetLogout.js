const { User } = require("../../models/user");
const { Blist } = require("../../models/blist");

const funcGetLogout = async (req, res) => {
    const { _id} = req.user;
    const { authorization = '' } = req.headers; // извлекаем заголовок
    const [_, token] = authorization.split(' '); //разбиваем строку
   
    await Blist.create({token}); //токен в блеклист
    await User.findByIdAndUpdate(_id, { token: null }); // сохраняем токен в базу
    return  res.status(204).json();
};

module.exports = funcGetLogout; 