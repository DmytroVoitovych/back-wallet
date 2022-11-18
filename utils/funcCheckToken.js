const { User } = require("../models/user");
const jwt = require('jsonwebtoken'); 

const { SECRET_KEY } = process.env;

const funcCheckToken = async (req, _, next) => {
    const { authorization = '' } = req.headers; // извлекаем заголовок
    const [bearer, token] = authorization.split(' '); //разбиваем строку

    if (bearer !== 'Bearer') {
            
        const err = new Error("Not authorized");
        err.status = 401;
        throw err;
    }

    try {

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

        if (error.message = 'Invalid signature') {
            
            error.status = 401;
        }

        next(error);
        
    }
};
 
module.exports = funcCheckToken;