const {Contact} = require('../../models/contact');

const funcGetContactsId = async (req, res, next) => {
    const { id } = req.params;
    // const contactsId = await Contact.findOne({_id: id}); // возможный вариант поиска по id но есть получше// лучше юзать под другие критерии
    const contactsId = await Contact.findById(id); // идеальный вариант поиска по id 

    if (contactsId.length === 0 || !contactsId) {
        const error = new Error(`Contact with id=${id} not found.`);
        error.status = 404;
        throw error;
    }
    else {
        return res.json({ status: 200, data: contactsId });
    }
};


module.exports = funcGetContactsId;