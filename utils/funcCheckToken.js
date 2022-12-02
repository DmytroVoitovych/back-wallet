const { User } = require("../models/user");
const jwt = require('jsonwebtoken'); 

const { SECRET_KEY } = process.env;

const funcCheckToken = async (req, _, next) => {
    const { authorization = '' } = req.headers; // извлекаем заголовок
    const [bearer, token] = authorization.split(' '); //разбиваем строку
    
    try {
        
       
        if (bearer !== 'Bearer') {
            
        const err = new Error("Not authorized");
        err.status = 401;
        throw err;
       }
        
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        
        if (!user || !user.token) {
        
            const err = new Error("Not authorized");
            err.status = 401;
            throw err;
        }

        req.user = user;
        next();

    } catch (error) {
        
        if (error.message === 'jwt expired') {
                        
            const expire = await User.find({ token }, '');
            
            if (expire.length > 0) {
                const [{ _id }] = expire;
                await User.findByIdAndUpdate(_id, { token: null }); // сохраняем токен в базу
                error.status = 498;
            }
            else {
                error.status = 498;
            }
        }
        
            next(error);
        
    }
};
 
module.exports = funcCheckToken;