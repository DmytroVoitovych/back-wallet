const Joi = require("joi");

const validation = (data) => {
    const shema = Joi.object({
    type: Joi.string().valid("income", "expense").required(),
    category: Joi.string().valid("Main", "Food", "Auto", "Reset", "Development", "Children", "House", "Education"),    
    comment: Joi.string().empty('').default('no comments').max(42),
    sum: Joi.number().min(1).max(1000000).required(),
    balance: Joi.number().min(1).max(1000000).required()
      });

    return shema.validate(data);
};


module.exports={
validation,
};




// {
//   "type": "income",
//   "category": "Main",
//   "comment": "Bonus for work",
//   "sum": 3000,
//   "balance": 25000
// }