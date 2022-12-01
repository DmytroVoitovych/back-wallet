const {User} = require('../../models/user');
const validResponse = require('../../auth/token');
const jwt = require('jsonwebtoken'); 

const funcPostRefresh = async (req, res, next) => {
   
    const { email } = req.user;
               
    const { token, id, refresh } = validResponse(await User.findOne({ email }));
    const {exp, iat} = jwt.decode(token);
     
    await User.findByIdAndUpdate(id, { token }); // сохраняем токен в базу
        
    res.status(200).json({
        status: 'success', code: 200, data: { access_token: token, token_type: "Bearer", refresh_token: refresh },
        timeExp: new Date(Date.now() + (exp - iat) * 1000).toLocaleTimeString('en-GB',{timeZone:'Europe/Kiev'}),
        dateExp: new Date(Date.now() + (exp - iat) * 1000).toLocaleDateString('en-GB',{timeZone:'Europe/Kiev'})
    });
    
};

module.exports = funcPostRefresh;