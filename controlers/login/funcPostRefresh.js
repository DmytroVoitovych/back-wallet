const {User} = require('../../models/user');
const validResponse = require('../../auth/token');


const funcPostRefresh = async (req, res, next) => {
   
    const { email } = req.user;
               
    const { token, id, refresh } = validResponse(await User.findOne({ email }));
   
    await User.findByIdAndUpdate(id, { token }); // сохраняем токен в базу
        
    res.status(200).json({
        status: 'success', code: 200, data: { access_token: token, token_type: "Bearer", refresh_token: refresh },
            
    });
    
};

module.exports = funcPostRefresh;