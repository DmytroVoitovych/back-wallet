const { User } = require("../models/user");
const jwt = require('jsonwebtoken'); 

const { REFRESH_KEY } = process.env;

const funcCheckRefreshToken = async (req, _, next) => {
    const { authorization = '' } = req.headers; // извлекаем заголовок
    const [bearer, refresh] = authorization.split(' '); //разбиваем строку
     
    try {

        if (bearer !== 'Bearer') {
            
        const err = new Error("Not authorized");
        err.status = 401;
        throw err;
       }
        
        const { id } = jwt.verify(refresh, REFRESH_KEY);
        const user = await User.findById(id);
          console.log(id);
        if (!user || !user.tokenRefresh) {
        
            const err = new Error("Not authorized");
            err.status = 401;
            throw err;
        }

        req.user = user;
        next();

    } catch (error) {
        
       next(error);
        
    }
};
 
module.exports = funcCheckRefreshToken;