const Joi = require("joi");

const validation = (data) => {
    const shema = Joi.object({
      email: Joi.string().min(4).max(255).required().email(),
      password: Joi.string().min(6).max(12).required(),
      name: Joi.string().min(1).max(12).required()  
      });

    return shema.validate(data);
};


module.exports={
validation,
};