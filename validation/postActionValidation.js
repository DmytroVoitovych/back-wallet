const Joi = require("joi");

const pattern ='(0?[1-9]|[12][0-9]|3[01])\\.(0?[1-9]|1[012])\\.((?:19|20)[0-9][0-9])$';



const validation = (data) => {
    const shema = Joi.object({
    type: Joi.string().valid("income", "expense").required(), // или или
    category: Joi.string().valid("Main", "Food", "Auto", "Reset", "Development", "Children", "House", "Education",""), // допустимые категории    
    comment: Joi.string().empty('').default('no comments').max(42), // не обьязательное поле
    sum: Joi.number().min(1).max(1000000).required(), // число сумы транзакции
    date: Joi.string().pattern(new RegExp(pattern)).required() // дата в формате dd.mm.yyyy важно!
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