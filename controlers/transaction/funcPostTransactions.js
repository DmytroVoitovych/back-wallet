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
        
        const curr = await Action.find({ owner: _id }, ''); //дефолтное значение если транзакций не проводилось
        const currAmount =curr.length === 0?25000:Number(...curr.slice(-1).map(e => e.balance));
            
        const dat = new Date(); //формат дата 19.11.2022
        const time = new Intl.DateTimeFormat("en-GB", { timeZone: 'Europe/Kiev', hour: "numeric",  minute: "numeric"}).format(dat); //формат время 23:29
        
      
        const { sum, comment, category, type, date } = req.body;
        const valid = date.split('.');

         if ((+valid[1] > dat.getMonth() + 1 && +valid[2] === dat.getFullYear() )  || +valid[2] > dat.getFullYear() || ((+valid[0] > dat.getDate() && +valid[2] === dat.getFullYear() && +valid[1] === dat.getMonth() + 1) || +valid[0] > 31 )) { // проверка  на то что бы дата не была больше текущей 
        const err = new Error('Error date, invalid date');
        err.status = 400;
        throw err;
        }
        
         else if (date.length < 10) { //контрольная проверка длины даты
        const err = new Error(`Error date, you need this format dd.mm.yyyy !!! You have ${date}`);
        err.status = 400;
        throw err; 
        }

        
        res.status(201).json({
            status: 'success',
            code: 201,
            data: await Action.create({
                sum,
                balance: type === 'income' ? +currAmount  + +sum : +currAmount - +sum
                , comment, category: category?category:"Other", type, owner: _id, date, time
            }) // метод для добавление в колекцию в мангуссе,
             
        });
    }
   
};

module.exports = funcPostTransactions;

//  const dat = (new Date()).toLocaleDateString('en-GB').replace('/','.').replace('/','.'); //формат дата 19.11.2022