const { isValidObjectId } = require('mongoose');

const funcValidateId = (req, _, next) => {
    const { id } = req.params;
    const isCorrect = isValidObjectId(id);
    
    if (!isCorrect) {
      const err = new Error(`${id} is not correct format`);
        err.status = 400;
        throw err;
    }
    next();
};

module.exports = funcValidateId;

