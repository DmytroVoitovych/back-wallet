const {Contact} = require('../../models/contact');
const {validation} = require('../../validation/dataValidation'); 

const funcPutContacts = async (req, res, next) => {
    const { error } = validation(req.body);

    if (error) {
        const err = new Error(error.message);
        err.status = 400;
        throw err;
    }
    else {
        const { id } = req.params;
        const updateId = await Contact.findByIdAndUpdate(id, req.body,{new: true}); // для возврата обновленного обьекта нужно указать 3 аргумент

        if (updateId) {
            return res.status(200).json({ status: 'success', code: 200, data: updateId });
        }
        else {
            const error = new Error(`Contact with id=${id} not found.`);
            error.status = 404;
            throw error;
        }
    }
    
};

module.exports = funcPutContacts;