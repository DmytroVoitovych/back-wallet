const { User } = require("../models/user");
const jwt = require('jsonwebtoken'); 

const { SECRET_KEY } = process.env;

const funcCheckToken = async (req, _, next) => {
    const { authorization = '' } = req.headers; // извлекаем заголовок
    const [bearer, token] = authorization.split(' '); //разбиваем строку
    //  console.log(req);
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
        console.log(error);
        if (error.message === 'jwt expired') {
            const { iat, exp } = jwt.decode(token);
            const y = Math.round(+new Date() / 1000);
            console.log((exp - y) < (exp - iat) * 0.5);
            console.log((exp - iat) * 0.5);
            console.log(exp - iat);
            const expire = await User.find({ token }, '');
            console.log(expire.length);
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