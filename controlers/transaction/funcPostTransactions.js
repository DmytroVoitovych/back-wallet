const {Action} = require('../../models/transaction');
const {validation} = require('../../validation/postActionValidation'); 

const funcPostTransactions = async (req, res) => {
    const { error } = validation(req.body);
    
    if (error) {
        const err = new Error(error.message);
        err.status = 400;
        throw err;
    }
    else {
        const { _id } = req.user; // id авторизованого пользвателя
        
        const date = (new Date()).toLocaleDateString('en-GB').replace('/','.').replace('/','.'); //формат дата 19.11.2022
        const time = (new Date()).toTimeString().slice(0, 5); //формат время 23:29

        const { sum, balance, comment, category, type } = req.body;
        
        res.status(201).json({
            status: 'success',
            code: 201,
            data: await Action.create({
                sum,
                balance: type === 'income' ? balance + sum : balance - sum
                , comment, category, type, owner: _id, date, time
            }) // метод для добавление в колекцию в мангуссе,
             
        });
    }
   
};

module.exports = funcPostTransactions;