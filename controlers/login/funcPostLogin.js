const {User} = require('../../models/user');
const { validation } = require('../../validation/dataValidation'); 
const validResponse = require('../../auth/token');


const funcPostLogin = async (req, res, next) => {
   
   const { email: mail } = req.body; 
   
   const { error } = await validation(req.body);
    
    if (error) {
        const err = new Error(error.message);
        err.status = 400;
        throw err;
    }
    else {
        
        const { token, email, name, id } = validResponse(await User.findOne({ mail }));
        
        await User.findByIdAndUpdate(id, {token}); // сохраняем токен в базу
        


        res.status(200).json({
            status: 'success', code: 200, data: { access_token: token, token_type: "Bearer", user: { email, name, id } },
            options: ["Main", "Food", "Auto", "Reset", "Development", "Children", "House", "Education"]
        });
    }
};

module.exports = funcPostLogin;