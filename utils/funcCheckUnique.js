const {User} = require('../models/user');

const funcCheckUnique = async({ body },_,next) => {
    
    try {
        const { email } = body;  // проверка на уникальность
        const user = await User.findOne({ email });
        if (user) {
            const err = new Error(`User with ${email} allready exist`);
            err.status = 409;
            throw err;
        }
        next();
    } catch (err) {
        next(err);
    }
   
};

module.exports = funcCheckUnique;