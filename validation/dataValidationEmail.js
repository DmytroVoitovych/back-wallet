const Joi = require("joi");

const validEmail = (data) => {
    const shema = Joi.object({email: Joi.string().min(4).max(255).required().email(),});

    return shema.validate(data);
};


module.exports= validEmail;