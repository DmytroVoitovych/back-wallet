const {User} = require('../../models/user');
const { validation } = require('../../validation/dataValidationSignUp'); 
const bcrypt = require('bcryptjs'); //хеширование

 
const funcPostSignUp = async (req, res, next) => {
   
    const { email:mail, password, name:userName } = req.body;// тело запроса 
    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));// хеш пароля 
    
   const { error } = await validation(req.body);
    
    if (error) {
        const err = new Error(error.message);
        err.status = 400;
       throw err;
    }
   
    else {
                
        const { email, name } = await User.create({ // метод для добавление в колекцию в мангуссе
            email: mail, password: hashPass, name:userName
        });
        
            res.status(201).json({
            status: 'success', code: 201, data:{user: {email, name } } 
            });
        
      
    }
   
};

module.exports = funcPostSignUp;