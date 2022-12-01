const { Blist } = require("../models/blist");



const funcCheckBlackList = async (req, _, next) => {
    const { authorization = '' } = req.headers; // извлекаем заголовок
    const [bearer, token] = authorization.split(' '); //разбиваем строку
    
    try {
        
        const list = await Blist.findOne({token});
        if (list) {
            const err = new Error("Not authorized, this token is no longer active.");
            err.status = 401;
            throw err;
        }

        next();

    } catch (error) {
        
       next(error);
        
    }
};
 
module.exports = funcCheckBlackList;