const jwt = require('jsonwebtoken');  //создание токена
const { SECRET_KEY } = process.env;

const funcGetToken = (user) => 
   
    ({
        token: jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '30d' }),
        email: user.email,
        name: user.name,
        id: user._id
    })

;


module.exports = funcGetToken;