const Joi = require("joi");

const validFavorite = (data) => {
    const shema = Joi.object({favorite: Joi.boolean().required()});

    return shema.validate(data);
};


module.exports={
validFavorite,
};