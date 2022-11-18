const Joi = require("joi");

const validSub = (data) => {
    const shema = Joi.object({subscription: Joi.string().valid("starter", "pro", "business").required()});

    return shema.validate(data);
};


module.exports = validSub;
