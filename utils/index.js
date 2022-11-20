const check = require("./asyncHandlerCheck");
const checkUnique = require("./funcCheckUnique");
const checkUser = require('./funcCheckUser');
const checkToken = require('./funcCheckToken');
const funcCheckPass = require("./funcCheckUser");



module.exports = {
    check,
    checkUnique,
    checkUser,
    checkToken,
    funcCheckPass
    
};