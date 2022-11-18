const {Contact} = require('../../models/contact');
const {validation} = require('../../validation/dataValidation'); 

const funcPostContacts = async (req, res, next) => {
    const { error } =   validation(req.body);
    
    if (error) {
        const err = new Error(error.message);
        err.status = 400;
       throw err;
    }
    else {
        const {_id} = req.user; // id авторизованого пользвателя
         res.status(201).json({
             status: 'success', code: 201, data: await Contact.create({...req.body, owner: _id }) // метод для добавление в колекцию в мангуссе
        });
    }
   
};

module.exports = funcPostContacts;