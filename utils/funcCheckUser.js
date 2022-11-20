const { User } = require('../models/user');
const bcrypt = require('bcryptjs'); //хеширование

const funcCheckUser = async({ body },_,next) => { 
    
    try {
        const { email, password,} = body;  // проверка на наличие и совпадение
        const user = await User.findOne({ email });
        
         if (!user) {
         const err = new Error(`User ${email} is not registered` );
           err.status = 404;
           throw err;     
        } 

        const pass = await bcrypt.compare(password, user.password);
       

        if (!user || !pass) {
            const err = new Error("Email or password is wrong");
            err.status = 401;
            throw err;
        }
        else if (user.token) {
           const err = new Error("You are already authorized");
           err.status = 400;
           throw err;  
        }
          
        // else if (!user.verify) {// проверка верецирован ли эмейл
        //     const err = new Error("Email not verify");
        //     err.status = 400;
        //     throw err;    
        // }
        else {
         next();   
        }
        
    } catch (err) {
        next(err);
    }
   
};

module.exports = funcCheckUser;